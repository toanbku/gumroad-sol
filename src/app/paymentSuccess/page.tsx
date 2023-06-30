"use client";

export default function PaymentSuccess() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-2/3 flex flex-col gap-5 justify-center items-center">
        <div className="text-lg">Thank you for purchase</div>
        <button
          onClick={() => {
            window.location.replace(`${process.env.STATIC_URL}/history`);
          }}
          className="border border-black px-3 py-1 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
