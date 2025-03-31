import { setActivePinia, createPinia } from "pinia";
import { useI18nStore } from "@/stores/i18nStore";
import { describe, beforeEach, it, expect } from "vitest";

describe("I18n Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("initializes with default locale", () => {
    const store = useI18nStore();
    expect(store.locale).toBe("en");
  });

  it("changes locale", () => {
    const store = useI18nStore();
    store.setLocale("fr");

    expect(store.locale).toBe("fr");
  });

  it("provides available languages", () => {
    const store = useI18nStore();
    expect(store.availableLanguages).toEqual([
      { locale: "en", name: "English" },
      { locale: "fr", name: "Français" },
    ]);
  });

  it("persists locale preference", () => {
    const store = useI18nStore();
    store.setLocale("en");

    const newStore = useI18nStore();
    expect(newStore.locale).toBe("en");
  });
});
