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

      return;
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
    return res.status(400).json({
      message: "Invalid webhook signature",
    });
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;