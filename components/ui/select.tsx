"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  setValue: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextType | null>(null);

function useSelectContext() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used inside <Select>");
  return ctx;
}

export const Select = ({
  children,
  value,
  defaultValue,
  onValueChange,
}: {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const currentValue = value ?? internalValue;

  const setValue = (v: string) => {
    setInternalValue(v);
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ open, setOpen, value: currentValue, setValue }}>
      <div className="relative inline-block">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen } = useSelectContext();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm",
        className
      )}
    >
      {children}
      {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
  );
};

export const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { value } = useSelectContext();
  return <span>{value ?? placeholder ?? "Select"}</span>;
};

export const SelectContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { open } = useSelectContext();
  if (!open) return null;

  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 shadow-lg">
      <ul className="max-h-48 overflow-auto">{children}</ul>
    </div>
  );
};

export const SelectItem = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  const { value: selected, setValue } = useSelectContext();
  const isSelected = selected === value;

  return (
    <li
      onClick={() => setValue(value)}
      className="flex cursor-pointer justify-between px-3 py-2 hover:bg-neutral-800"
    >
      {children}
      {isSelected && <Check className="h-4 w-4" />}
    </li>
  );
};
