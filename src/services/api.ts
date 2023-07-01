import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
const BASE_URL = "http://localhost:3000/api";

export const getMyAsset = async () => {
  const res = await axios.get(`${BASE_URL}/my-assets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getHistory = async () => {
  const res = await axios.get(`${BASE_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
