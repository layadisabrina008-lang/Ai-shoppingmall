// components/ui/radio-group.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const RadioGroup = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
};

export const RadioGroupItem = ({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked?: boolean;
  onChange?: () => void;
  label: string;
}) => {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-yellow-400"
      />
      <span>{label}</span>
    </label>
  );
};
