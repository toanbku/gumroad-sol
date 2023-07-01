import { LucideStore, LucidePlus, BarChart, LucideHistory } from "lucide-react";

export const DATE_TIME_FORMAT = "MMMM-dd-yyyy HH:mm";
export const ROUTES = [
  {
    pathName: "/",
    label: "Markets",
    icon: <LucideStore />,
  },
  {
    pathName: "/new-asset",
    label: "New Asset",
    icon: <LucidePlus />,
  },
  {
    pathName: "/statistics",
    label: "Statistics",
    icon: <BarChart />,
  },
  {
    pathName: "/history",
    label: "History",
    icon: <LucideHistory />,
  },
];

export const TOKEN_INFO = [
  {
    name: "USDC",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimal: 6,
  },
  {
    name: "Test",
    address: "98qNgzzR47dqA8QZEhSJwNKkKBpod6m39zHpmjE3rdF7",
    decimal: 9,
  },
];
