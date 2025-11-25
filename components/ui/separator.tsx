"use client";

import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-neutral-800"
          : "w-px h-full bg-neutral-800",
        className
      )}
    />
  );
}
