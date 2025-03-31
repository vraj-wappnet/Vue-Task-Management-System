import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "@/stores/themeStore";
import { describe, beforeEach, it, expect } from "vitest";

describe("Theme Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("initializes with light theme by default", () => {
    const store = useThemeStore();
    expect(store.theme).toBe("light");
  });

  it("toggles theme", () => {
    const store = useThemeStore();
    const initialTheme = store.theme === "dark";

    store.toggleTheme();

    expect(store.theme).toBe(initialTheme ? "light" : "dark");
  });

  it("persists theme preference", () => {
    const store = useThemeStore();
    store.toggleTheme();

    const newStore = useThemeStore();
    expect(newStore.theme).toBe("dark");
  });
});
