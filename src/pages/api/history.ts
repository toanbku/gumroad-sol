import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const decodedToken = await withPrivateRoute(req, res);
  // @ts-ignore
  const { address } = decodedToken;

  try {
    const data = await supabase
      .from("PaymentSessions")
      .select("orderId, status, Transaction ( assetId, quantity )")
      .match({
        owner: address,
      });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Can not get history",
    });
  }
};

export default handler;
