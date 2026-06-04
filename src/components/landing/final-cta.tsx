import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Turn Monad into an intelligent experience.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
          Discover, analyze, and navigate the Monad ecosystem from one AI command
          center.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#14F195] px-6 py-3.5 text-sm font-semibold text-[#050505] sm:w-auto"
        >
          Enter Monad Nexus
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
