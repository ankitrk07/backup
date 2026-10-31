import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "header" | "footer" | "nav" | "main";

interface ContainerProps {
  as?: ContainerTag;
  className?: string;
  children: ReactNode;
}

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}