import supabase from "@/services/supabase";
import { NextApiHandler } from "next";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { generateAccessToken } from "@/lib/utils";
import { corsMiddleware } from "@/lib/cors";


const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res);
  const { signature, address } = req.body;
  const newNonce = Math.floor(Math.random() * 1000000);


  const found = await supabase
    .from("Users")
    .select("*")
    .eq("address", address)
    .limit(1);

  if (!found?.data?.[0]?.auth) {
    return;
  }

  // @ts-ignore
  const signedNonce = found.data[0].auth.genNonce;
  const message = `Nonce: ${signedNonce}`;
  // const message = "Hello, world!";

  try {
    const verified = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      bs58.decode(signature),
      bs58.decode(address)
    );

    if (!verified) {
      return res.status(400).send({ error: "Signature is not match" });
    }
  } catch (e: any) {
    return res.status(400).send({ error: "Cannot verify signature" });
  }

  await supabase
    .from("Users")
    .update({
      auth: {
        genNonce: newNonce, // update the nonce, so it can't be reused
        lastAuth: new Date().toISOString(),
        lastAuthStatus: "success",
      },
    })
    .eq("address", address); // primary key

  const token = generateAccessToken(address);

  res.status(200).send({
    token,
  });
};

export default handler;
