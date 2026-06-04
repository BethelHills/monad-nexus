"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { NexusAmbient } from "@/components/ui/motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <NexusAmbient />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 nexus-grid opacity-[0.25]"
      />

      <AppSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex min-h-screen flex-col lg:pl-60">
        <AppHeader onMenuOpen={() => setDrawerOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
