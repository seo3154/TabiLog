import { useTranslation } from "react-i18next";

export default function SettingMenu({ onOpenAccount = () => {} }) {
  const { t } = useTranslation();

  return (
    <section className="setting-menu">
      <button
        type="button"
        className="setting-card setting-card--button"
        onClick={onOpenAccount}
      >
        {t("setting.accountInfo")}
      </button>
      <div className="setting-card">{t("setting.report")}</div>
      <div className="setting-card">{t("setting.support")}</div>
    </section>
  );
}
