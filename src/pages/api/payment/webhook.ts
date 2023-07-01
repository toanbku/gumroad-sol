import { transferSolToken } from "@/lib/transfer";
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

      // TODO: send money out to owner asset

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

      // 18.4 is rate SOL/USD
      // 96% because 1% for Candypay + 3% for Gumstreet
      // this is temporary solution, because Candypay will update their webhook soon
      const amount = Number(((assetRes.price / 18.4) * 0.96).toFixed(4));

      const txnHash = await transferSolToken({
        toAddress: assetRes.owner,
        amount,
      });

      const { data } = await supabase
        .from("PaymentSessions")
        .update({
          txnHash,
          updatedAt: new Date(),
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
