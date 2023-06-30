import supabase from "@/services/supabase";
import { NextApiHandler } from "next";
import { corsMiddleware } from "@/lib/cors";

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res);
  const { id } = req.query;

  if (req.method === "GET") {
    const queryAsset = await supabase
      .from("Assets")
      .select("id, title, description, price, owner, image")
      .limit(1)
      .eq("id", id)
      .single();

    return res.status(200).send(queryAsset);
  }
};

export default handler;
