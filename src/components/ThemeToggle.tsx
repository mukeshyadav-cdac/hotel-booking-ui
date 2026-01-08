"use client";

import { useThemeStore } from "../store/theme";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const isNight = theme === "night";
  const label = isNight ? "Switch to day theme" : "Switch to night theme";

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="rounded-full p-2 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      {isNight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4V2M12 22v-2M4.93 4.93 3.52 3.52M20.48 20.48l-1.41-1.41M4 12H2M22 12h-2M4.93 19.07 3.52 20.48M20.48 3.52 19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


