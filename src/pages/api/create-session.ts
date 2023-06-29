import { candypay } from "@/helpers";
import { corsMiddleware } from "@/lib/cors";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res);
  try {
    const response = await candypay.session.create({
      success_url: `${process.env.STATIC_URL}/success`,
      cancel_url: `${process.env.STATIC_URL}/cancel`,
      // additional SPL tokens, SOL and USDC are the supported tokens by default
      tokens: ["dust", "samo"],
      items: [
        {
          name: "Solana Shades",
          // price in USD
          price: 0.1,
          image: "https://imgur.com/M0l5SDh.png",
          quantity: 1,
          // optional product size parameter
          size: "9",
        },
      ],
      shipping_fees: 0.5,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creating session",
    });
  }
};

export default handler;
