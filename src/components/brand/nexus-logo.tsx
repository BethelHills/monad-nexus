import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const NEXUS_LOGO_SRC = "/images/monad-nexus-logo.png";

const LOGO_WIDTH = 1536;
const LOGO_HEIGHT = 1024;

const sizeClasses = {
  sm: "h-14 sm:h-16",
  md: "h-20 sm:h-24",
  lg: "h-24 sm:h-28",
  xl: "h-28 sm:h-32",
  "2xl": "h-32 sm:h-36 md:h-40",
  "3xl": "h-36 sm:h-40 md:h-44",
} as const;

type NexusLogoProps = {
  href?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
  priority?: boolean;
};

export function NexusLogo({
  href,
  size = "md",
  className,
  priority = false,
}: NexusLogoProps) {
  const image = (
    <Image
      src={NEXUS_LOGO_SRC}
      alt="Monad Nexus — The Intelligence Layer for Monad"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn("w-auto object-contain object-left", sizeClasses[size], className)}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {image}
      </Link>
    );
  }

  return image;
}
