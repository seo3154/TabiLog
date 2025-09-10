import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoticeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 예시용 더미 데이터 불러오기
  useEffect(() => {
    // 실제 API 또는 상태에서 가져오세요
    const fetchedData = {
      title: t("notice.edit.sampleTitle", { defaultValue: "예시 제목입니다" }),
      content: t("notice.edit.sampleContent", {
        defaultValue: "예시 내용입니다",
      }),
    };

    setTitle(fetchedData.title);
    setContent(fetchedData.content);
  }, [id, t]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정 저장 처리 로직 추가 (API 호출 등)
    alert(t("notice.edit.success", { defaultValue: "수정이 완료되었습니다." }));
    navigate(`/notice/${id}`);
  };

  return (
    <div className="notice-edit-container">
      <h2>{t("notice.edit.title", { defaultValue: "공지사항 수정" })}</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          {t("notice.edit.fieldTitle", { defaultValue: "제목" })}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          {t("notice.edit.fieldContent", { defaultValue: "내용" })}
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button type="submit" className="edit-button">
            {t("notice.edit.saveBtn", { defaultValue: "저장" })}
          </button>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            {t("notice.edit.cancelBtn", { defaultValue: "취소" })}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeEdit;
