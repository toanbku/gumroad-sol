import { corsMiddleware } from "@/lib/cors";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res);
  const { address } = req.query;
  if (!address) {
    return res.status(405).json({ error: "address is not null" });
  }

  const nonce = Math.floor(Math.random() * 1000000);
  const found = await supabase.from("Users").select("*").eq("address", address);
  const auth = {
    genNonce: nonce,
    lastAuth: new Date().toISOString(),
    lastAuthStatus: "pending",
  };

  if (!found.data?.length) {
    await supabase.from("Users").insert({
      auth,
      address: String(address),
      updatedAt: new Date(),
    });
  } else {
    await supabase
      .from("Users")
      .update({
        auth,
        updatedAt: new Date(),
      })
      .eq("address", address);
  }

  return res.status(200).json({ nonce, address });
};

export default handler;
