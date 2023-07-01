import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const decodedToken = await withPrivateRoute(req, res);
  // @ts-ignore
  const { address } = decodedToken;
  const { assetId } = req.body;

  const isOwnAsset = await supabase
    .from("Assets")
    .select("*")
    .match({
      owner: address,
    })
    .eq("id", assetId)
    .limit(1)
    .single();

  const orderIdsData = await supabase
    .from("PaymentSessions")
    .select("orderId")
    .match({
      owner: address,
      status: "Successful",
    });

  if (!orderIdsData.data) {
    return;
  }

  const assetData = await supabase
    .from("Transaction")
    .select("assetId")
    .in("orderId", orderIdsData.data)
    .eq("assetId", assetId);

  if (!isOwnAsset && !assetData.data) {
    return res.status(403).json({ error: "forbidden" });
  }

  const asset = await supabase
    .from("Assets")
    .select("file")
    .eq("id", assetId)
    .single();
  const assetFile = asset.data?.file;

  const data = await supabase.storage
    .from("assets")
    .createSignedUrl(assetFile, 60);

  return res.status(200).json(data);
};

export default handler;
