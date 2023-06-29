import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../components/sideBar";
import StatisticsTable from "../components/dataTable/statisticTable";
import MobileSheet from "../components/mobileSheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Statistics() {
  return (
    <main className="sm:flex h-screen w-full">
      <SideBar />
      <MobileSheet />
      <ScrollArea className="sm:w-5/6 float-right h-full w-full">
        <h1 className="text-3xl m-10">Statistics</h1>
        <h1 className="text-2xl m-10 -mb-8">Overview</h1>
        <div className="flex flex-wrap justify-center">
          <div className="m-10 w-5/6 sm:w-64 h-32 border-black border-2 rounded-md flex flex-col justify-center p-5 text-xl font-medium">
            Total revenue <p>0$</p>
          </div>
          <div className="m-10 w-5/6 sm:w-64 h-32 border-black border-2 rounded-md flex flex-col justify-center p-5 text-xl font-medium">
            Revenue for the week <p>0$</p>
          </div>
          <div className="m-10 w-5/6 sm:w-64 h-32 border-black border-2 rounded-md flex flex-col justify-center p-5 text-xl font-medium">
            Revenue of the day <p>0$</p>
          </div>
        </div>

        <StatisticsTable />
      </ScrollArea>
    </main>
  );
}
