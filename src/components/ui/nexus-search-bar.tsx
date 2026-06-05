"use client";

import { useCallback, useState } from "react";
import { Search, Send, X } from "lucide-react";
import { AnimatedSearchFrame, MotionButton } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

type NexusSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  submitLabel?: string;
  ariaLabel?: string;
  className?: string;
  emptyHint?: string;
};

export function NexusSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search…",
  submitLabel = "Search",
  ariaLabel = "Search input",
  className,
  emptyHint = "Enter a query to continue.",
}: NexusSearchBarProps) {
  const [hint, setHint] = useState<string | null>(null);

  const runSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      setHint(emptyHint);
      return;
    }
    setHint(null);
    onSubmit(trimmed);
  }, [emptyHint, onSubmit, value]);

  const clear = useCallback(() => {
    onChange("");
    setHint(null);
  }, [onChange]);

  return (
    <div className={cn("min-w-0", className)}>
      <AnimatedSearchFrame>
        <form
          className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:gap-3 sm:px-4"
          onSubmit={(e) => {
            e.preventDefault();
            runSubmit();
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <Search className="shrink-0 text-[#A3A3A3]" size={18} aria-hidden />
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (hint) setHint(null);
              }}
              placeholder={placeholder}
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3] sm:text-base"
              aria-label={ariaLabel}
            />
            {value.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="shrink-0 rounded-md p-1 text-[#A3A3A3] transition-colors hover:bg-[#141414] hover:text-white"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <MotionButton
            type="submit"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#14F195] px-4 py-2.5 text-sm font-semibold text-[#050505] sm:w-auto"
          >
            <Send size={14} />
            {submitLabel}
          </MotionButton>
        </form>
      </AnimatedSearchFrame>
      {hint && (
        <p className="mt-2 px-1 text-xs text-amber-400/90" role="status">
          {hint}
        </p>
      )}
    </div>
  );
}
