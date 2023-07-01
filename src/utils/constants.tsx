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
