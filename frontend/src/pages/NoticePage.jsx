import React, { useState } from "react";
import NoticeList from "../components/NoticeList";
import NoticeDetail from "../components/NoticeDetail";
import NoticeWrite from "../components/NoticeWrite";
import { Routes, Route } from "react-router-dom";

function NoticePage() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "서버 점검 안내",
      writer: "관리자",
      content: "8월 8일 새벽 2시부터 서버 점검이 진행됩니다.",
      date: "2025-08-07",
    },
    {
      id: 2,
      title: "신규 기능 출시",
      writer: "개발팀",
      content: "회원 통계 기능이 추가되었습니다.",
      date: "2025-08-06",
    },
  ]);

  // 공지 추가 함수
  const addNotice = (title, writer, content) => {
    const newNotice = {
      id: notices.length + 1,
      title,
      writer,
      content,
      date: new Date().toISOString().split("T")[0],
    };
    setNotices([newNotice, ...notices]);
  };

  return (
    <Routes>
      {/* /notice */}
      <Route path="/" element={<NoticeList notices={notices} />} />
      {/* /notice/:id */}
      <Route path=":id" element={<NoticeDetail notices={notices} />} />
      {/* /notice/write */}
      <Route path="write" element={<NoticeWrite addNotice={addNotice} />} />
    </Routes>
  );
}

export default NoticePage;
