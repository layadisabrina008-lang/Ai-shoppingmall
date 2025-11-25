"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
};

/**
 * Simple slider replacement for the shadcn/Radix slider.
 * API: value/defaultValue as [number], onValueChange(value: number[])
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState<number>(
      (defaultValue && defaultValue[0]) ?? Number(min)
    );

    const current = value && value.length ? value[0] : internal;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setInternal(v);
      onValueChange?.([v]);
    };

    return (
      <input
        ref={ref}
        type="range"
        className={cn("w-full cursor-pointer", className)}
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

