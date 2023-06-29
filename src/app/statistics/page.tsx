import { ScrollArea } from "@/components/ui/scroll-area";

export default function Statistics() {
  return (
    <ScrollArea>
      <h1 className="text-3xl mb-6">Statistics</h1>
      <div className="flex justify-between gap-6">
        <div className="flex-1 h-32 border-black border rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Total revenue
          <div>0$</div>
        </div>
        <div className="flex-1 h-32 border-black border rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Week revenue
          <div>0$</div>
        </div>
        <div className="flex-1 h-32 border-black border rounded-md flex flex-col justify-center p-5 text-xl font-medium">
          Day revenue
          <div>0$</div>
        </div>
      </div>
    </ScrollArea>
  );
}
