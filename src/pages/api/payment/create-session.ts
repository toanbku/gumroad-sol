import { candypay } from "@/helpers";
import { corsMiddleware } from "@/lib/cors";
import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";
import { v4 as uuidv4 } from "uuid";

type Item = {
  id: string;
  quantity: number;
};

type Order = {
  data: Item[];
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await corsMiddleware(req, res);
    const decodedToken = await withPrivateRoute(req, res);
    // @ts-ignore
    const { address } = decodedToken;
    const { data } = req.body as Order;
    const ids = data.map((item: any) => item.id);
    const found = await supabase.from("Assets").select().in("id", ids);
    if (!found.data?.length) {
      throw new Error("Can not find this asset");
    }

    // create list items
    const items = found.data.map((item) => ({
      name: item.title,
      price: item.price,
      image:
        process.env.NEXT_PUBLIC_SUPABASE_URL! +
        "/storage/v1/object/public/images/" +
        +item.image,
      quantity: data.find((d) => d.id === item.id)?.quantity || 1,
    }));

    const response = await candypay.session.create({
      success_url: `${process.env.STATIC_URL}/payment/success`,
      cancel_url: `${process.env.STATIC_URL}/payment/cancel`,
      // additional SPL tokens, SOL and USDC are the supported tokens by default
      tokens: ["dust", "samo"],
      items,
    });

    // add this session to database
    await supabase.from("PaymentSessions").insert({
      id: uuidv4(),
      sessionId: response.session_id,
      orderId: response.order_id,
      status: "Pending",
      owner: address,
      updatedAt: new Date(),
    });

    await supabase.from("Transaction").insert(
      found.data.map((item) => ({
        id: uuidv4(),
        assetId: item.id,
        quantity: data.find((d) => d.id === item.id)?.quantity || 1,
        orderId: response.order_id,
        updatedAt: new Date(),
      }))
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creating session",
    });
  }
};

export default handler;
