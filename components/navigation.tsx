"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Binary } from 'lucide-react';
import ThemeSwitchCircular from "./ui/theme-switch-circular";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = useMemo(() => {
    const query = searchParams.toString();
    return `${pathname}${query ? `?${query}` : ""}`;
  }, [pathname, searchParams]);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <Link
            href="/"
            rel="noopener noreferrer"
            className="flex items-center text-xl font-bold gap-2 hover:text-primary transition-all duration-200"
          >
            <div className="p-1.5 rounded-lg bg-primary/10 transition-colors duration-200">
              <Binary className="w-5 h-5 transition-transform duration-200" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              app0
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <div className="ml-1">
              <ThemeSwitchCircular />
            </div>

            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <SignInButton
                  mode="modal"
                  forceRedirectUrl={currentPath}
                  fallbackRedirectUrl={currentPath}
                >
                  <Button size="sm" variant="outline">Sign in</Button>
                </SignInButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </div>
    </nav>
  );
}
