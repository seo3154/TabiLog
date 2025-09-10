import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || "ja";

  const switchTo = (lng) => () => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng; // <html lang="...">
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={switchTo("ja")} disabled={current === "ja"}>
        日本語
      </button>
      <button onClick={switchTo("ko")} disabled={current === "ko"}>
        한국어
      </button>
    </div>
  );
}
