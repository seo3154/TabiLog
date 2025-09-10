// src/components/ProfileModify.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/MyPage.css"; // 모달/폼 공통 스타일 재사용

export default function ProfileModify({ user, onClose, onSave }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    nickname: user?.nickname || "",
    email: user?.email || "",
    tel: user?.tel || "",
    introText: user?.introText || "",
    mbtiUrl: user?.mbtiUrl || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nickname?.trim())
      return alert(
        t("profile.alert.nickname", { defaultValue: "닉네임을 입력하세요." })
      );
    if (!form.email?.includes("@"))
      return alert(
        t("profile.alert.email", {
          defaultValue: "이메일 형식이 올바르지 않습니다.",
        })
      );
    try {
      setSaving(true);
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="profile-modal-title">
            {t("profile.title", { defaultValue: "프로필 수정" })}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={t("common.close", { defaultValue: "닫기" })}
          >
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="modal-body">
            <label className="field">
              <span className="field-label">
                {t("profile.field.nickname", { defaultValue: "닉네임" })}
              </span>
              <input
                className="input"
                name="nickname"
                value={form.nickname}
                onChange={onChange}
                maxLength={20}
                placeholder={t("profile.placeholder.nickname", {
                  defaultValue: "닉네임을 입력",
                })}
              />
            </label>

            <label className="field">
              <span className="field-label">
                {t("profile.field.email", { defaultValue: "이메일" })}
              </span>
              <input
                className="input"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder={t("profile.placeholder.email", {
                  defaultValue: "you@example.com",
                })}
              />
            </label>

            <label className="field">
              <span className="field-label">
                {t("profile.field.tel", { defaultValue: "전화" })}
              </span>
              <input
                className="input"
                name="tel"
                value={form.tel}
                onChange={onChange}
                placeholder={t("profile.placeholder.tel", {
                  defaultValue: "010-1234-5678",
                })}
              />
            </label>

            <label className="field">
              <span className="field-label">
                {t("profile.field.intro", { defaultValue: "소개" })}
              </span>
              <textarea
                className="textarea"
                name="introText"
                rows={4}
                value={form.introText}
                onChange={onChange}
                placeholder={t("profile.placeholder.intro", {
                  defaultValue: "자기소개를 입력하세요.",
                })}
              />
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="edit-btn" onClick={onClose}>
              {t("common.cancel", { defaultValue: "취소" })}
            </button>
            <button type="submit" className="edit-btn" disabled={saving}>
              {saving
                ? t("common.saving", { defaultValue: "저장 중..." })
                : t("common.save", { defaultValue: "저장" })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
