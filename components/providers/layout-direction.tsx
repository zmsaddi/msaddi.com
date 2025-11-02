"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export function LayoutDirection() {
  const params = useParams();
  const locale = params?.locale as string || "en";

  useEffect(() => {
    const direction = locale === "ar" ? "rtl" : "ltr";

    // Set HTML attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;

    // Add/remove RTL class
    if (direction === "rtl") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [locale]);

  return null;
}