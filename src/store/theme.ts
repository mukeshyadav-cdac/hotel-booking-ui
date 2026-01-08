import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "day" | "night";

interface ThemeState {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "day",
      setTheme: (t) => set({ theme: t }),
      toggle: () => set({ theme: get().theme === "day" ? "night" : "day" }),
    }),
    { name: "ui-theme" }
  )
);


