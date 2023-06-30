import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    await withPrivateRoute(req, res);
    const { file } = req.body;
    const date = new Date().getTime();

    try {
      const data = await supabase.storage
        .from("assets")
        .upload(`${file.name}-${date}`, file as File);

      return res.status(200).send(data);
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ error: "failed to upload asset" });
    }
  }
};

export default handler;
