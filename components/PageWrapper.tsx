"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={cn(
      "flex-grow transition-all duration-300",
      !isHome && "pt-0" // Add top padding for fixed navbar on non-home pages
    )}>
      {children}
    </main>
  );
}
