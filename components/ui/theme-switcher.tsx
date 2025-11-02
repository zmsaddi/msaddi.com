"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeSwitcher({ className, showLabel = false }: ThemeSwitcherProps) {
  const t = useTranslations("common.theme");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md transition-colors",
        "hover:bg-light-neutral dark:hover:bg-metal-gray/20",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      aria-label={`${t("switchTo")} ${theme === "dark" ? t("lightMode") : t("darkMode")}`}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-5 w-5" />
          {showLabel && <span className="text-sm">{t("lightMode")}</span>}
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          {showLabel && <span className="text-sm">{t("darkMode")}</span>}
        </>
      )}
    </button>
  );
}