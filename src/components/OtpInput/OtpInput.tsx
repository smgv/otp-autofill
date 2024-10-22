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
      autoFocus = false,
      placeholder = "",
      autoComplete = "one-time-code",
      type = "text",
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

    const isInputValueValid = (value: string) => {
      return /^\d$/.test(value) && value.trim().length === 1;
    };

    const handleInputChange = (e: React.FormEvent, index: number) => {
      e.preventDefault();

      const { value } = e.target as HTMLInputElement;
      if (value && value.length > 1 && value.length === length) {
        const newOtpArray = value.split("");
        setOtpArray(newOtpArray);
        inputRefs.current[length - 1]?.focus();
        if (onComplete && length === newOtpArray.length)
          onComplete(newOtpArray.join(""));
      } else if (isInputValueValid(value)) {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = value;
        setOtpArray(newOtpArray);
        const otp = newOtpArray.join("");
        // Move focus to the next input
        if (index < length - 1 && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
        if (onChange) {
          onChange(value);
        }
        if (onComplete && length === otp.length) onComplete(otp);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").slice(0, length);
      if (/^\d+$/.test(pastedData)) {
        if (/^\d+$/.test(pastedData) && pastedData.length === length) {
          const newOtpArray = pastedData.split("");
          setOtpArray(newOtpArray);
          // Move the focus to the last input after pasting
          inputRefs.current[length - 1]?.focus();
          if (onComplete && length === newOtpArray.length)
            onComplete(newOtpArray.join(""));
        }
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
      if (inputRefs && autoFocus) {
        inputRefs.current?.[0].focus();
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
              key={index}
              type={type}
              value={digit}
              autoComplete={autoComplete}
              placeholder={
                Array.isArray(placeholder) ? placeholder[index] : placeholder
              }
              inputMode="numeric"
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
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
