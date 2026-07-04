import Image from "next/image";
import { cn } from "@/lib/utils";

interface SoftwareLogoProps {
  src: string | null;
  name: string;
  size: number;
  className?: string;
}

export function SoftwareLogo({ src, name, size, className }: SoftwareLogoProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg border bg-brand-light font-bold text-brand",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-hidden
      >
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cn("shrink-0 rounded-[20%] object-contain", className)}
    />
  );
}
