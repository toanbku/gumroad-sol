import { NextApiHandler } from "next";
import { transferSolToken } from "@/lib/transfer";

const handler: NextApiHandler = async (req, res) => {
  const data = await transferSolToken({
    amount: 0.002,
    toAddress: "672jswj1J8p213bx1H7CXt87xh5Ln29oq13XBfaZeZ6B",
  });

  console.log("data", data);

  return res.status(200).json({ status: "ok" });
};

export default handler;
