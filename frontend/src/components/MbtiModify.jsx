// src/components/MbtiModify.jsx
import { useEffect, useMemo, useState } from "react";
import "../styles/MyPage.css";

const MBTI_META = [
  { t: "ESTJ", sub: "엄격한 경영자" },
  { t: "ESTP", sub: "관대한 사업가" },
  { t: "ESFJ", sub: "사교적인 외교관" },
  { t: "ESFP", sub: "자유로운 연예인" },
  { t: "ENTJ", sub: "대담한 통솔자" },
  { t: "ENTP", sub: "별난 발명가" },
  { t: "ENFJ", sub: "이타적인 교사" },
  { t: "ENFP", sub: "발랄한 활동가" },
  { t: "ISTJ", sub: "청렴결백한 논리주의자" },
  { t: "ISTP", sub: "묵묵한 장인" },
  { t: "ISFJ", sub: "용감한 수호자" },
  { t: "ISFP", sub: "세심한 성인군자" },
  { t: "INTJ", sub: "용의주도한 과학자" },
  { t: "INTP", sub: "객관적인 분석가" },
  { t: "INFJ", sub: "통찰력 있는 예언가" },
  { t: "INFP", sub: "상상이 많은 예술가" },
];

const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

export default function MbtiModify({
  current = "",
  onClose,
  onSave,
  mbtiList, // 옵션: 특정 타입만 허용 시
}) {
  const allow = useMemo(
    () =>
      new Set(
        (mbtiList && mbtiList.map((v) => v.toUpperCase())) ||
          MBTI_META.map((m) => m.t)
      ),
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
    if (!value) return alert("MBTI를 선택하세요.");
    try {
      setSaving(true);
      await onSave(value);
    } finally {
      setSaving(false);
    }
  };

  const items = MBTI_META.filter((m) => allow.has(m.t));

  // 이미지 경로: /public/MbtiProfileImg/TYPE.png
  const imgSrc = (t) => pub(`/MbtiProfileImg/${t}.png`);

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
          <h2 id="mbti-modal-title">당신의 MBTI는 무엇인가요?</h2>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            X
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mbti-grid" role="radiogroup" aria-label="MBTI 선택">
              {items.map(({ t, sub }) => {
                const selected = value === t;
                return (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setValue(t)}
                    className={
                      "mbti-card" + (selected ? " mbti-card--selected" : "")
                    }
                    title={`${t} - ${sub}`}
                  >
                    <img
                      className="mbti-img"
                      src={imgSrc(t)}
                      alt={`${t} 프로필`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/120x120?text=MBTI";
                      }}
                    />
                    <div className="mbti-type">{t}</div>
                    <div className="mbti-sub">{sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="edit-btn" onClick={onClose}>
              취소
            </button>
            <button
              type="submit"
              className="edit-btn"
              disabled={!value || saving}
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
