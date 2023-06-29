import { ScrollArea } from "@/components/ui/scroll-area";

export default function Statistics() {
  return (
    <ScrollArea>
      <h1 className="text-3xl mb-6">Statistics</h1>
      <div className="flex justify-between gap-6">
        <div className="flex-1 h-32 border-black border rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Total revenue <p>0$</p>
        </div>
        <div className="flex-1 h-32 border-black border rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Revenue for the week <p>0$</p>
        </div>
        <div className="flex-1 h-32 border-black border rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Revenue of the day <p>0$</p>
        </div>
      </div>
    </ScrollArea>
  );
}
