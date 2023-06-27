import { candypay } from "@/helpers";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

type Item = {
  id: string;
  quantity: number;
};

type Order = {
  data: Item[];
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const { data } = req.body as Order;
    const ids = data.map((item: any) => item.id);
    const found = await supabase.from("Assets").select().eq("id", ids);
    if (!found.data?.length) {
      throw new Error("Can not find this asset");
    }

    // create list items
    const items = found.data.map((item) => ({
      name: item.title,
      price: item.price,
      image: item.image,
      quantity: data.find((d) => d.id === item.id)?.quantity || 1,
    }));

    const response = await candypay.session.create({
      success_url: `${process.env.STATIC_URL}/success`,
      cancel_url: `${process.env.STATIC_URL}/cancel`,
      // additional SPL tokens, SOL and USDC are the supported tokens by default
      tokens: ["dust", "samo"],
      items,
      shipping_fees: 0.04,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creating session",
    });
  }
};

export default handler;
