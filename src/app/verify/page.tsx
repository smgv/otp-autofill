"use client";

import { OtpInput } from "@/components/OtpInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [hiddenOtp, setHiddenOtp] = useState("");

  const handleOtpComplete = (val: string) => {
    setOtp(val);
  };

  useEffect(() => {
    if (hiddenOtp) {
      alert(hiddenOtp);
    }
  }, [hiddenOtp]);

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-full w-full">
      <p>Example 2</p>
      <br />
      <code>
        <p>Message Format:</p>
        <br />
        <p>Your verification code is 123456.</p>
        <p>@otp-autofill-pi.vercel.app #123456</p>
      </code>
      <br />
      <p>Enter OTP</p>
      <OtpInput length={6} onComplete={handleOtpComplete} />
      <p>OTP: {otp || "- - - - - -"}</p>

      <form className="flex flex-col gap-y-1 my-4" hidden>
        <input
          value={hiddenOtp}
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={6}
          pattern="\d{6}"
          onChange={(e) => setHiddenOtp(e.target.value)}
          onPaste={(e) => console.log(e)}
        />
      </form>

      <br />
      <p>Hidden OTP: {hiddenOtp || "- - - - - -"}</p>

      <button
        onClick={() => router.push("/")}
        className="text-blue-500 hover:underline"
      >
        Back to home page
      </button>
    </div>
  );
}
