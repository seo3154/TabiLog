import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import jaPlaces from "./locales/ja/places.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ja: {
        translation: ja,
        places: jaPlaces,
      },
      ko: { translation: ko },
    },
    fallbackLng: "ja",
    supportedLngs: ["ja", "ko"],
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
