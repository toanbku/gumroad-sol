import { corsMiddleware } from "@/lib/cors";
import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res);
  const decodedToken = await withPrivateRoute(req, res);
  // @ts-ignore
  const { address } = decodedToken;

  try {
    const data = await supabase
      .from("Assets")
      .select("id, title, description, price, image")
      .eq("owner", address);

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Can not get my asset" });
  }
};

export default handler;
