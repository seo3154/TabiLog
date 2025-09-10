import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoticeDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = () => {
    // 삭제 처리 로직 (API 호출 등)
    alert(t("notice.delete.deleted", { defaultValue: "삭제되었습니다." }));
    navigate("/notices"); // 목록 페이지로 이동
  };

  return (
    <div className="notice-delete-container">
      <h2>{t("notice.delete.title", { defaultValue: "공지 삭제" })}</h2>
      <p>
        {t("notice.delete.confirm", {
          defaultValue: "정말 이 공지사항을 삭제하시겠습니까?",
        })}
      </p>
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>
          {t("notice.delete.deleteBtn", { defaultValue: "삭제" })}
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          {t("notice.delete.cancelBtn", { defaultValue: "취소" })}
        </button>
      </div>
    </div>
  );
};

export default NoticeDeleteConfirm;
