import { useEffect } from "react";

export default function AccountInfoModal({ user, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
          <h2 id="account-modal-title">계정 정보</h2>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <span className="modal-key">로그인ID</span>
            <span className="modal-val">{user.loginId || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">닉네임</span>
            <span className="modal-val">{user.nickname || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">이메일</span>
            <span className="modal-val">{user.email || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">전화</span>
            <span className="modal-val">{user.tel || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">MBTI</span>
            <span className="modal-val">{user.mbtiName || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">권한</span>
            <span className="modal-val">{user.role || "USER"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">가입일</span>
            <span className="modal-val">{user.createdAt || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">최근 로그인</span>
            <span className="modal-val">{user.lastLoginAt || "-"}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="edit-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
