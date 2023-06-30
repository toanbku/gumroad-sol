import { v4 as uuidv4 } from "uuid";
import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";
import { corsMiddleware } from "@/lib/cors";

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res);

  if (req.method === "GET") {
    const queryAll = await supabase
      .from("Assets")
      .select("id, title, description, price, owner, image");
    return res.status(200).send(queryAll);
  } else if (req.method === "POST") {
    const decodedToken = await withPrivateRoute(req, res);
    // @ts-ignore
    const { address } = decodedToken;
    const { title, description, price, asset, coverImage } = req.body;
    const date = new Date().getTime();

    try {
      const { data: coverImageRes } = await supabase.storage
        .from("images")
        .upload(`${coverImage.name}-${date}`, coverImage as File);

      const { data: assetRes } = await supabase.storage
        .from("assets")
        .upload(`${asset.name}-${date}`, asset as File);

      const response = await supabase.from("Assets").insert({
        id: uuidv4(),
        title,
        description,
        price,
        cover: coverImageRes?.path,
        file: assetRes?.path,
        owner: address,
        updatedAt: new Date(),
      });

      return res.status(200).send(response);
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ error: "Failed to fetch" });
    }
  }
};

export default handler;
