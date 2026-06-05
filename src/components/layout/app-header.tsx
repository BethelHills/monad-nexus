"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NexusLogo } from "@/components/brand/nexus-logo";
import { WalletStatusButton } from "@/components/wallet/wallet-status-button";
import { appNavItems } from "@/lib/app-nav";

type AppHeaderProps = {
  onMenuOpen: () => void;
};

export function AppHeader({ onMenuOpen }: AppHeaderProps) {
  const pathname = usePathname();
  const current = appNavItems.find(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#242424] bg-[#050505]/95 px-4 py-4 backdrop-blur-md lg:hidden">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          className="rounded-lg border border-[#242424] bg-[#0E0E0E] p-2 text-white"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <Link href="/dashboard" className="inline-flex min-w-0 flex-1">
          <NexusLogo size="md" className="max-w-[min(62vw,260px)]" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {current && (
          <span className="hidden text-xs text-[#A3A3A3] sm:inline">
            {current.label}
          </span>
        )}
        <WalletStatusButton compact className="max-w-[140px]" />
      </div>
    </header>
  );
}
