"use client";

import { useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";

export default function PaymentFail() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-2/3 flex flex-col gap-4 justify-center items-center">
        <div className="flex items-center gap-1 text-xl font-medium">
          <AiFillCloseCircle />
          <div>There are some problem. Please try again!</div>
        </div>
        <button
          onClick={() => {
            router.push("/history");
          }}
          className="border border-black px-3 py-1 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
