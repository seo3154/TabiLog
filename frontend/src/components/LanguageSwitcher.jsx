import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSwitcher.css";
import Korea from "../assets/korea_flag.png"
import Japan from "../assets/japan_flag.png"


export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || "ja";

  const switchTo = (lng) => () => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng; // <html lang="...">
  };

  return (
    <div className="switch_btn">
      <button onClick={switchTo("ja")} disabled={current === "ja"}>
        <img src={Japan} />日本語
      </button>
      <button onClick={switchTo("ko")} disabled={current === "ko"}>
        <img src={Korea} />한국어
      </button>
    </div>
  );
}
