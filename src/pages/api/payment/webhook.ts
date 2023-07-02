import { transferCustomToken, transferSolToken } from "@/lib/transfer";
import supabase from "@/services/supabase";
import { verifyWebhookSignature } from "@candypay/checkout-sdk";
import { NextApiHandler } from "next";

type Payload = {
  customer: string;
  customer_email: string;
  event: string;
  items: Item[];
  metadata?: any;
  network: string;
  order_id: string;
  payment_amount: number;
  payment_currency: string;
  session_id: string;
  signature: string;
  timestamp: string;
  token: string;
  token_amount: number;
};

type Item = {
  image: string;
  name: string;
  price: number;
  quantity: number;
};

const handler: NextApiHandler = async (req, res) => {
  const headers = req.headers;
  const payload = req.body as Payload;

  console.log("-----------");
  console.log(payload);

  try {
    await verifyWebhookSignature({
      payload: JSON.stringify(payload),
      headers: headers as Record<string, string>,
      webhook_secret: process.env.CANDYPAY_WEBHOOK_SECRET!,
    });

    // handle payload
    if (payload.event === "transaction.successful") {
      await supabase
        .from("PaymentSessions")
        .update({
          status: "Successful",
          customerEmail: payload.customer_email,
          paymentAmount: payload.payment_amount,
          paymentCurrency: payload.payment_currency,
          updatedAt: new Date(),
        })
        .eq("orderId", payload.order_id);

      const { data: assetIdRes } = await supabase
        .from("Transaction")
        .select("assetId")
        .eq("orderId", payload.order_id)
        .single();
      if (!assetIdRes?.assetId) {
        return;
      }

      const { data: assetRes } = await supabase
        .from("Assets")
        .select("*")
        .eq("id", assetIdRes.assetId)
        .single();

      if (!assetRes) {
        return;
      }

      let txnHash;
      const amountOut = Number((payload.token_amount * 0.96).toFixed(4));

      if (payload.token.toUpperCase() === "SOL") {
        txnHash = await transferSolToken({
          toAddress: assetRes.owner,
          amount: amountOut,
        });
      } else {
        txnHash = await transferCustomToken({
          token: payload.token.toUpperCase(),
          toAddress: assetRes.owner,
          amount: amountOut,
        });
      }

      const { data } = await supabase
        .from("PaymentSessions")
        .update({
          txnHash,
          token: payload.token.toUpperCase(),
          amountOut,
          updatedAt: new Date(),
          paymentOut: payload.payment_amount * 0.96,
        })
        .eq("orderId", payload.order_id);

      return res.status(200).json({ data });
    }

    if (payload.event === "transaction.failed") {
      await supabase
        .from("PaymentSessions")
        .update({
          status: "Failed",
          customerEmail: payload.customer_email,
          paymentAmount: payload.payment_amount,
          paymentOut: payload.payment_amount * 0.96,
          paymentCurrency: payload.payment_currency,
          updatedAt: new Date(),
        })
        .eq("orderId", payload.order_id);

      return;
    }
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({
      message: "Invalid webhook signature",
    });
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
