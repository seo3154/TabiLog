// src/components/MbtiModify.jsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/MyPage.css";

// 타입만 정의, 별명(sub)은 번역에서 뽑는다
const MBTI_TYPES = [
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
  "ENTJ",
  "ENTP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISTP",
  "ISFJ",
  "ISFP",
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
];

const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

export default function MbtiModify({
  current = "",
  onClose,
  onSave,
  mbtiList, // 옵션: 특정 타입만 허용 시
}) {
  const { t } = useTranslation();

  const allow = useMemo(
    () =>
      new Set((mbtiList && mbtiList.map((v) => v.toUpperCase())) || MBTI_TYPES),
    [mbtiList]
  );

  const initial = (current || "").toUpperCase();
  const [value, setValue] = useState(allow.has(initial) ? initial : "");
  const [saving, setSaving] = useState(false);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value)
      return alert(
        t("mbti.alert.select", { defaultValue: "MBTI를 선택하세요." })
      );
    try {
      setSaving(true);
      await onSave(value);
    } finally {
      setSaving(false);
    }
  };

  const items = MBTI_TYPES.filter((tpe) => allow.has(tpe)).map((tpe) => ({
    t: tpe,
    sub: t(`mbti.meta.${tpe}.sub`, { defaultValue: tpe }), // 별명 번역
  }));

  // 이미지 경로: /public/MbtiProfileImg/TYPE.png
  const imgSrc = (tpe) => pub(`/MbtiProfileImg/${tpe}.png`);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal modal--xl mbti-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mbti-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="mbti-modal-title">
            {t("mbti.modal.title", {
              defaultValue: "당신의 MBTI는 무엇인가요?",
            })}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={t("mbti.modal.close", { defaultValue: "닫기" })}
          >
            X
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="modal-body">
            <div
              className="mbti-grid"
              role="radiogroup"
              aria-label={t("mbti.modal.ariaGroup", {
                defaultValue: "MBTI 선택",
              })}
            >
              {items.map(({ t: tp, sub }) => {
                const selected = value === tp;
                return (
                  <button
                    key={tp}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setValue(tp)}
                    className={
                      "mbti-card" + (selected ? " mbti-card--selected" : "")
                    }
                    title={`${tp} - ${sub}`}
                  >
                    <img
                      className="mbti-img"
                      src={imgSrc(tp)}
                      alt={`${tp} ${t("mbti.modal.profileAlt", {
                        defaultValue: "프로필",
                      })}`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/120x120?text=MBTI";
                      }}
                    />
                    <div className="mbti-type">{tp}</div>
                    <div className="mbti-sub">{sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="edit-btn" onClick={onClose}>
              {t("mbti.action.cancel", { defaultValue: "취소" })}
            </button>
            <button
              type="submit"
              className="edit-btn"
              disabled={!value || saving}
            >
              {saving
                ? t("mbti.action.saving", { defaultValue: "저장 중..." })
                : t("mbti.action.save", { defaultValue: "저장" })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
