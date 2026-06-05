"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NexusLogo } from "@/components/brand/nexus-logo";
import { WalletStatusButton } from "@/components/wallet/wallet-status-button";
import { appNavItems } from "@/lib/app-nav";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {appNavItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-[#14F195]/10 text-[#14F195] ring-1 ring-[#14F195]/25"
                : "text-[#A3A3A3] hover:bg-[#141414] hover:text-white",
            )}
          >
            <Icon size={18} className="shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[min(280px,88vw)] flex-col border-r border-[#242424] bg-[#0E0E0E] transition-transform duration-300 lg:z-30 lg:w-60 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#242424] px-4 py-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="inline-flex min-w-0 flex-1 pr-2"
          >
            <NexusLogo size="lg" className="w-full max-w-[240px]" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#A3A3A3] hover:bg-[#141414] hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <p className="px-4 pt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          Intelligence
        </p>

        {nav}

        <div className="mt-auto space-y-3 border-t border-[#242424] p-4">
          <div className="hidden lg:block">
            <WalletStatusButton className="w-full" />
          </div>
          <Link
            href="/"
            onClick={onClose}
            className="block text-xs text-[#A3A3A3] transition-colors hover:text-[#14F195]"
          >
            ← Back to landing
          </Link>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Close overlay"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
