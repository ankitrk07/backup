import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  aspectRatio,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-space-850/80 border border-white/5",
        className
      )}
      style={{
        aspectRatio,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};
