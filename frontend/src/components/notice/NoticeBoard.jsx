import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NoticeBoard() {
  const { t } = useTranslation();
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: t("notice.seed.maintenanceTitle", {
        defaultValue: "서버 점검 안내",
      }),
      content: t("notice.seed.maintenanceContent", {
        defaultValue: "8월 8일 새벽 2시부터 서버 점검이 진행됩니다.",
      }),
      date: "2025-08-07",
    },
    {
      id: 2,
      title: t("notice.seed.newFeatureTitle", {
        defaultValue: "신규 기능 출시",
      }),
      content: t("notice.seed.newFeatureContent", {
        defaultValue: "회원 통계 기능이 추가되었습니다.",
      }),
      date: "2025-08-06",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const topRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTitle.trim() === "" || newContent.trim() === "") {
      alert(
        t("notice.alert.fillAll", {
          defaultValue: "제목과 내용을 모두 입력해주세요.",
        })
      );
      return;
    }

    const newNotice = {
      id: notices.length + 1,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split("T")[0],
    };

    setNotices([newNotice, ...notices]);
    setNewTitle("");
    setNewContent("");

    // 입력 후 맨 위로 스크롤 이동
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 ref={topRef}>{t("notice.title", { defaultValue: "공지사항" })}</h2>

      {/* 글쓰기 폼 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder={t("notice.form.titlePH", { defaultValue: "제목" })}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ padding: "8px", width: "300px" }}
            aria-label={t("notice.form.titleLabel", { defaultValue: "제목" })}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder={t("notice.form.contentPH", { defaultValue: "내용" })}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ padding: "8px", width: "300px", height: "100px" }}
            aria-label={t("notice.form.contentLabel", { defaultValue: "내용" })}
          />
        </div>
        <button type="submit">
          {t("notice.form.submit", { defaultValue: "등록" })}
        </button>
      </form>

      {/* 공지 목록 */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        aria-label={t("notice.table.label", { defaultValue: "공지 목록" })}
      >
        <thead>
          <tr>
            <th>{t("notice.table.no", { defaultValue: "번호" })}</th>
            <th>{t("notice.table.title", { defaultValue: "제목" })}</th>
            <th>{t("notice.table.content", { defaultValue: "내용" })}</th>
            <th>{t("notice.table.date", { defaultValue: "날짜" })}</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.id}</td>
              <td>
                {/* 제목 클릭 시 상세 페이지 이동 */}
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() =>
                    navigate(`/notice/${notice.id}`, { state: notice })
                  }
                >
                  {notice.title}
                </span>
              </td>
              <td>{notice.content}</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
