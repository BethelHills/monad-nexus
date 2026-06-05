import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const NEXUS_LOGO_SRC = "/images/monad-nexus-logo.png";

const LOGO_WIDTH = 1536;
const LOGO_HEIGHT = 1024;

const sizeClasses = {
  sm: "h-10 sm:h-11",
  md: "h-12 sm:h-14",
  lg: "h-14 sm:h-16",
  xl: "h-16 sm:h-20",
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
