import en from "./en.json";
import fr from "./fr.json";

export const defaultLocale = "en";

export const languages = {
  en: {
    name: "English",
    translation: en,
  },
  fr: {
    name: "Français",
    translation: fr,
  },
};

export type Locale = keyof typeof languages;
