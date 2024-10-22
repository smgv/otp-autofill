/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { cn } from "../../utils";
import { OtpProps } from "./OtpInput.type";

const OtpInput = React.forwardRef<HTMLDivElement, OtpProps>(
  (
    {
      length,
      resendTimer,
      onComplete,
      onChange,
      error = false,
      success = false,
      disabled = false,
      resendBtnText = "Resend OTP",
      classes,
      helperText = "",
      onResendTimer,
      showCta = true,
      showTimer = true,
    },
    ref
  ) => {
    const [otpArray, setOtpArray] = useState<string[]>(Array(length).fill(""));
    const [timer, setTimer] = useState<number>(resendTimer ?? 0);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const newOtpArray = [...otpArray];
        if (otpArray[index] !== "") {
          newOtpArray[index] = "";
          setOtpArray(newOtpArray);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          newOtpArray[index - 1] = "";
          setOtpArray(newOtpArray);
        }
        if (onChange) {
          onChange(newOtpArray.join(""));
        }
      }
    };

    const handleInputChange = (e: React.ChangeEvent, index: number) => {
      const { value } = e.target as HTMLInputElement;
      if (/^\d$/.test(value)) {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = value;
        setOtpArray(newOtpArray);
        const otp = newOtpArray.join("");

        // Move focus to the next input
        if (index < length - 1 && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
        if (onChange) {
          onChange(newOtpArray.join(""));
        }

        if (onComplete && length === otp.length) onComplete(otp);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      const pastedData = e.clipboardData.getData("text").slice(0, length);

      if (/^\d+$/.test(pastedData) && pastedData.length === length) {
        const newOtpArray = pastedData.split("");
        alert(`Called ${newOtpArray}`);
        setOtpArray(newOtpArray);

        newOtpArray.forEach((digit, index) => {
          if (inputRefs.current[index]) {
            inputRefs.current[index]!.value = digit;
          }
        });

        // Move the focus to the last input after pasting
        inputRefs.current[length - 1]?.focus();
        if (onChange) {
          onChange(newOtpArray.join(""));
        }
        if (onComplete && length === newOtpArray.length)
          onComplete(newOtpArray.join(""));
      }
    };

    const handleResendClick = () => {
      setTimer(resendTimer || 0);
      if (onResendTimer) onResendTimer();
    };

    useEffect(() => {
      let interval: number | null = null;
      // Start the resend timer
      if (showCta && showTimer) {
        interval = window.setInterval(() => {
          if (timer > 0) {
            setTimer((prev) => prev - 1);
          } else {
            clearInterval(interval as number);
          }
        }, 1000);
      }
      return () => {
        clearInterval(interval as number);
      };
    }, [timer]);

    useEffect(() => {
      if ("OTPCredential" in window) {
        const input: any = document.querySelector(
          "input[autocomplete='one-time-code']"
        );
        if (!input) return;
        const ac = new AbortController();
        (navigator.credentials as any)
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
          })
          .then((otp: any) => {
            const newOtpArray = otp.code.split("");
            setOtpArray(newOtpArray);
            if (onComplete && length === otp.code.length) {
              onComplete(otp.code);
            }
            return ac.abort();
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }, []);

    const helperTextClass = cn(
      "text-xs font-normal text-app-gray-500 dark:text-app-white mt-2",
      {
        "text-app-red-500 dark:text-app-red-400": error,
        "text-app-green-500 dark:text-app-green-400": success,
      },
      classes?.helperText
    );

    return (
      <div
        className={cn("flex flex-col items-center", classes?.root)}
        ref={ref}
      >
        <form className={cn("flex space-x-2", classes?.inputContainer)}>
          {otpArray.map((digit, index) => (
            <input
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              autoComplete="one-time-code"
              inputMode="numeric"
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={cn(
                "w-12 h-[42px] rounded-full border text-center text-xl focus:outline-none active:outline-none focus:border-app-primary-600 dark:focus:border-app-primary-500 border-app-gray-300 dark:border-app-gray-500 bg-app-gray-50 dark:bg-app-gray-700 text-app-gray-900 dark:text-app-white",
                success &&
                  (classes?.success ??
                    "border-app-green-400 dark:border-app-green-500 focus:border-app-green-400 dark:focus:border-app-green-500"),
                error &&
                  (classes?.error ??
                    "border-app-red-600 dark:border-app-red-500 focus:border-app-red-600 dark:focus:border-app-red-500"),
                disabled &&
                  (classes?.disabled ??
                    "border-app-gray-200 bg-app-gray-200 dark:border-app-gray-700 focus:border-app-gray-200 dark:focus:border-app-gray-700 cursor-not-allowed"),
                classes?.input
              )}
              ref={(el) => {
                inputRefs.current[index] = el as HTMLInputElement;
              }}
              disabled={disabled}
            />
          ))}
        </form>
        {helperText && <p className={helperTextClass}>{helperText}</p>}
        {showCta && (
          <div className={cn("flex items-center mt-3", classes?.ctaContainer)}>
            {timer > 0 && showTimer && !disabled ? (
              <span
                className={cn(
                  "text-xs text-app-gray-500 dark:text-app-gray-400",
                  classes?.timerText
                )}
              >
                Resend in {timer} seconds
              </span>
            ) : (
              <button
                className={cn("text-sm p-0", classes?.resendBtnText)}
                onClick={handleResendClick}
                disabled={(timer > 0 && showTimer) || disabled}
              >
                {resendBtnText}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";
export default OtpInput;
