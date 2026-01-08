"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/theme";

export default function ThemeApply() {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return null;
}


