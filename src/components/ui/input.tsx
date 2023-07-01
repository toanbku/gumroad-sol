import * as React from "react";

import { cn } from "@/lib/utils";
import { NumericFormat, NumericFormatProps } from "react-number-format";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputClassName =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputClassName, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const CurrencyInput = React.forwardRef<HTMLInputElement, NumericFormatProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <NumericFormat
        className={cn(inputClassName, className)}
        thousandSeparator=","
        decimalSeparator="."
        prefix="$ "
        decimalScale={2}
        getInputRef={ref}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { Input, CurrencyInput };
