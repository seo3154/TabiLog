import React from "react";
import "../../styles/Notice.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NoticeDetail({ notices, onDelete, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notice = notices.find((n) => n.id === Number(id));

  if (!notice)
    return (
      <p className="notice-not-found">
        {t("notice.detail.notFound", { defaultValue: "공지사항이 없습니다." })}
      </p>
    );

  const handleDelete = () => {
    if (
      window.confirm(
        t("notice.detail.confirmDelete", {
          defaultValue: "정말로 삭제하시겠습니까?",
        })
      )
    ) {
      onDelete(notice.id);
      navigate("/notices");
    }
  };

  const handleEdit = () => {
    onEdit(notice.id);
  };

  return (
    <div className="notice-detail-container">
      <div className="notice-card">
        <h2 className="notice-title">{notice.title}</h2>
        <div className="notice-meta">
          <span className="notice-writer">
            {t("notice.detail.writer", { defaultValue: "작성자" })}{" "}
            {notice.writer}
          </span>
          <span className="notice-date">
            {t("notice.detail.date", { defaultValue: "작성일" })} {notice.date}
          </span>
        </div>
        <div className="notice-content">
          {notice.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="button-container">
          <button className="edit-button" onClick={handleEdit}>
            {t("notice.detail.editBtn", { defaultValue: "수정" })}
          </button>
          <button className="delete-button" onClick={handleDelete}>
            {t("notice.detail.deleteBtn", { defaultValue: "삭제" })}
          </button>
          <button className="back-button" onClick={() => navigate(-1)}>
            {t("notice.detail.backBtn", { defaultValue: "목록" })}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeDetail;
