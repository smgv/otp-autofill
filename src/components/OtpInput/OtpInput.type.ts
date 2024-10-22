import React from "react";

export type OtpInputClassesType =
  | "root"
  | "inputContainer"
  | "ctaContainer"
  | "resendBtnText"
  | "timerText"
  | "input"
  | "success"
  | "error"
  | "disabled"
  | "helperText";

export interface OtpProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  length: number;
  resendTimer?: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  onResendTimer?: () => void;
  resendBtnText?: string;
  classes?: Partial<Record<OtpInputClassesType, string>>;
  helperText?: string;
  showCta?: boolean;
  showTimer?: boolean;
}
