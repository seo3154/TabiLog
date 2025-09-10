import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Notice.css";
import { useTranslation } from "react-i18next";

function NoticeWrite({ addNotice }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) 가드: 함수인지 확인
    if (typeof addNotice !== "function") {
      console.error("addNotice is not a function:", addNotice);
      alert(
        t("notice.write.missingAddNotice", {
          defaultValue:
            "공지 등록 함수를 찾을 수 없어요. 라우팅/props 전달을 확인해 주세요.",
        })
      );
      return;
    }

    // 2) 비동기 저장
    try {
      await addNotice(title, writer, content);
      navigate("/notice"); // 성공 시 목록으로
    } catch (err) {
      console.error("Failed to add notice:", err);
      alert(
        t("notice.write.error", {
          defaultValue: "등록 중 오류가 발생했어요. 콘솔을 확인해 주세요.",
        })
      );
    }
  };

  return (
    <div className="notice-write-container">
      <h2 className="notice-write-title">
        {t("notice.write.title", { defaultValue: "공지사항 글쓰기" })}
      </h2>

      <form className="notice-write-form" onSubmit={handleSubmit}>
        <label>
          {t("notice.write.fieldTitle", { defaultValue: "제목" })}:
          <input
            type="text"
            placeholder={t("notice.write.phTitle", { defaultValue: "제목" })}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label={t("notice.write.fieldTitle", { defaultValue: "제목" })}
          />
        </label>

        <label>
          {t("notice.write.fieldWriter", { defaultValue: "작성자" })}:
          <input
            type="text"
            placeholder={t("notice.write.phWriter", {
              defaultValue: "작성자",
            })}
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
            aria-label={t("notice.write.fieldWriter", {
              defaultValue: "작성자",
            })}
          />
        </label>

        <label>
          {t("notice.write.fieldContent", { defaultValue: "내용" })}:
          <textarea
            placeholder={t("notice.write.phContent", {
              defaultValue: "내용",
            })}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            aria-label={t("notice.write.fieldContent", {
              defaultValue: "내용",
            })}
          />
        </label>

        <div className="button-group">
          <button type="submit" className="submit-button">
            {t("notice.write.saveBtn", { defaultValue: "저장" })}
          </button>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            {t("notice.write.backBtn", { defaultValue: "목록" })}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeWrite;
