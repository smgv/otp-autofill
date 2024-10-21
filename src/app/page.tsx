"use client";

// import { Badge, Checkbox } from "@toruslabs/react-components";
// import { Toggle } from "@toruslabs/react-components";
// import { cn } from "@toruslabs/react-components";
import { OtpInput } from "@toruslabs/react-components";
import { useState } from "react";

export default function Home() {
  // const classVal = "text-teal-800";

  const [otp, setOtp] = useState("");
  // const [otpStatus, setOtpStatus] = useState("INITIALIZED");

  const handleOtpComplete = (val: string) => {
    setOtp(val);
  };

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-screen">
      {/* <p>Hello World</p>
      <Button variant="primary">Click Me</Button>
      <Button variant="secondary">Click Me</Button>
      <Button variant="tertiary">Click Me</Button>
      <Button variant="text">Click Me</Button>
      <Button variant="primary" loading>
        Click Me
      </Button>
      <Button variant="primary" disabled>
        Click Me
      </Button>
      <Toggle initialState={true} />
      <p className={cn("text-purple-400", classVal)}>hello</p>
      <Tooltip
        text="Hello, Hi"
        placement="left"
        classes={{ tooltipContainer: "bg-teal-400 p-4 rounded-md" }}
      >
        Hi Tooltip
      </Tooltip> */}
      <p>Your verification code is 123456.</p>
      <p>@www.example.com #123456</p>
      <br />
      <p>Enter OTP</p>
      <OtpInput
        length={6}
        onComplete={handleOtpComplete}
        // getOtpAPIStatus={(val) => setOtpStatus(val)}
      />
      <p>OTP: {otp || "- - - - - -"}</p>
      <p>V1 Changes</p>
      {/* <p>WEB OTP API Status: {otpStatus}</p> */}
      {/* <Checkbox id="1" />
      <Badge pill>Hello</Badge> */}
    </div>
  );
}
