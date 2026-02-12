"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSwitchCircular({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setChecked(resolvedTheme === "dark"), [resolvedTheme]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(checked ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200",
        className
      )}
      {...props}
    >
      <motion.div
        key={checked ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {checked ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
      </motion.div>
    </button>
  );
}
