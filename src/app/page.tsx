"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-full w-full">
      <p>Example 1</p>
      <form className="flex flex-col gap-y-1 my-4">
        <label>Enter OTP:</label>
        <input
          type="text"
          id="otp"
          aria-label="otp"
          name="otp"
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={6}
          pattern="\d{6}"
          className="border border-gray-500 px-4 py-2 rounded-md"
          placeholder="Enter OTP"
        />
      </form>

      <button
        onClick={() => router.push("/verify")}
        className="text-blue-500 hover:underline"
      >
        Go to WebOTP API Example
      </button>
    </div>
  );
}
