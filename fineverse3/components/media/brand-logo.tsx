import Image from "next/image";
import { getBrandLogo } from "@/lib/images";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Rendered size in px. The source file is 160px, so stay at 80px or below for sharp results. */
  size?: number;
  priority?: boolean;
  /** true when the brand name is already written next to the logo */
  decorative?: boolean;
  className?: string;
}

export function BrandLogo({
  size = 40,
  priority = false,
  decorative = true,
  className,
}: BrandLogoProps) {
  const logo = getBrandLogo();

  return (
    <Image
      src={logo.src}
      alt={decorative ? "" : logo.alt}
      width={logo.width}
      height={logo.height}
      sizes={`${size}px`}
      priority={priority}
      style={{ width: size, height: size }}
      className={cn("rounded-lg", className)}
    />
  );
}