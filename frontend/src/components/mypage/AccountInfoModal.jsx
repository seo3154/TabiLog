import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AccountInfoModal({ user, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const row = (labelKey, value, fallback = "-") => (
    <div className="modal-row">
      <span className="modal-key">{t(labelKey)}</span>
      <span className="modal-val">{value || fallback}</span>
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="account-modal-title">{t("account.title")}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={t("common.close")}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {row("account.field.loginId", user.loginId)}
          {row("account.field.nickname", user.nickname)}
          {row("account.field.email", user.email)}
          {row("account.field.tel", user.tel)}
          {row("account.field.mbti", user.mbtiName)}
          {row("account.field.role", user.role || "USER")}
          {row("account.field.createdAt", user.createdAt)}
          {row("account.field.lastLoginAt", user.lastLoginAt)}
        </div>

        <div className="modal-footer">
          <button className="edit-btn" onClick={onClose}>
            {t("common.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
