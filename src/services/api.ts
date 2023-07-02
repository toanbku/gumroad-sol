import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const getMyAsset = async () => {
  return axios.get(`${BASE_URL}/my-assets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getHistory = async () => {
  const res = await axios.get(`${BASE_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const downloadAsset = async (assetId: string) => {
  const res = await axios.post(
    `${BASE_URL}/assets/download`,
    {
      assetId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
