"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./style.css";

const data = {
  img: "",
  name: "",
  prices: 0,
  sales: 0,
  Revenue: 0,
};

export default function History() {
  return (
    <main>
      <h1 className="text-3xl m-10">History</h1>

      <div className="flex flex-row justify-center">
        <div className="m-10 w-64 h-32 border-black border border-2 rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Total revenue <p>0$</p>
        </div>
        <div className="m-10 w-64 h-32 border-black border border-2 rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Revenue for the week <p>0$</p>
        </div>
        <div className="m-10 w-64 h-32 border-black border border-2 rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Revenue of the day <p>0$</p>
        </div>
      </div>
      <div>
        <h1 className="text-3xl m-10">Product has not been purchased</h1>
      </div>
      <div>
        <h1 className="text-3xl m-10">Products sold</h1>
      </div>
    </main>
  );
}
