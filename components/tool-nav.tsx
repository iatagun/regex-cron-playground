"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/lib/tools";

export function ToolNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap border-b border-border">
      {TOOLS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`border-b-2 px-3 py-2 text-sm transition-colors ${
              active ? "border-amber text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
