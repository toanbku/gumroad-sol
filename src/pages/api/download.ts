import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const decodedToken = await withPrivateRoute(req, res);
  // @ts-ignore
  const { address } = decodedToken;
  const { assetId } = req.body;

  const assetData = await supabase.from("Assets").select("*").match({
    owner: address,
  });

  const transactionData = await supabase
    .from("Transaction")
    .select("*, PaymentSessions (*)")
    .match({
      owner: address,
    })
    .match({});

  const data = await supabase.storage
    .from("assets")
    .createSignedUrls(["qa.json"], 60);

  return res.status(200).json(data);
};

export default handler;
