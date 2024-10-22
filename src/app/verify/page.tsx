"use client";

import { OtpInput } from "@/components/OtpInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleOtpComplete = (val: string) => {
    setOtp(val);
  };

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-screen">
      <p>Version 2:</p>
      <br />
      <code>
        <p>Message Format:</p>
        <br />
        <p>Your verification code is 123456.</p>
        <p>@www.example.com #123456</p>
      </code>
      <br />
      <p>Enter OTP</p>
      <OtpInput length={6} onComplete={handleOtpComplete} />
      <p>OTP: {otp || "- - - - - -"}</p>

      <button
        onClick={() => router.push("/")}
        className="text-blue-500 hover:underline"
      >
        Back to home page
      </button>
    </div>
  );
}
