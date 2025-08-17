// src/components/ProfileModify.jsx
import { useEffect, useState } from "react";
import "../styles/MyPage.css"; // 모달/폼 공통 스타일 재사용

export default function ProfileModify({ user, onClose, onSave }) {
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
    if (!form.nickname?.trim()) return alert("닉네임을 입력하세요.");
    if (!form.email?.includes("@"))
      return alert("이메일 형식이 올바르지 않습니다.");
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>프로필 수정</h2>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="modal-body">
            <label className="field">
              <span className="field-label">닉네임</span>
              <input
                className="input"
                name="nickname"
                value={form.nickname}
                onChange={onChange}
                maxLength={20}
              />
            </label>

            <label className="field">
              <span className="field-label">이메일</span>
              <input
                className="input"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
              />
            </label>

            <label className="field">
              <span className="field-label">전화</span>
              <input
                className="input"
                name="tel"
                value={form.tel}
                onChange={onChange}
              />
            </label>

            <label className="field">
              <span className="field-label">소개</span>
              <textarea
                className="textarea"
                name="introText"
                rows={4}
                value={form.introText}
                onChange={onChange}
              />
            </label>

            {/* <label className="field">
              <span className="field-label">프로필 이미지 URL</span>
              <input
                className="input"
                name="mbtiUrl"
                value={form.mbtiUrl}
                onChange={onChange}
                placeholder="https://..."
              />
            </label> */}

            {/* {form.mbtiUrl ? (
              <div className="preview">
                <img
                  src={form.mbtiUrl}
                  alt="미리보기"
                  className="preview-img"
                />
              </div>
            ) : null} */}
          </div>

          <div className="modal-footer">
            <button type="button" className="edit-btn" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="edit-btn" disabled={saving}>
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
