import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAccessToken(address: string) {
  return jwt.sign(
    { address: address },
    process.env.NEXT_PUBLIC_JWT_SECRET || "jwt5ecr3t",
    { expiresIn: "7d" }
  );
}

export async function withPrivateRoute(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw "";
    }

    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || "jwt5ecr3t"
    );
    return decoded;
  } catch (err) {
    return res.status(405).send({ error: "unauthorized" });
  }
}
