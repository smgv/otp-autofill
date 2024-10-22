"use client";

import { OtpInput } from "@/components/OtpInput";
import { useState } from "react";

export default function Home() {
  const [otp, setOtp] = useState("");

  const handleOtpComplete = (val: string) => {
    setOtp(val);
  };

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-full w-full">
      <code>
        <p>Message Format:</p>
        <br />
        <p>Your verification code is 123456.</p>
        <p>@otp-autofill-pi.vercel.app #123456</p>
      </code>
      <br />
      <p>Enter OTP</p>
      <OtpInput
        length={6}
        onComplete={handleOtpComplete}
        // placeholder={["d", "d", "m", "m", "y", "y"]}
        // type="password"
      />
      <p>OTP: {otp || "- - - - - -"}</p>
    </div>
  );
}
