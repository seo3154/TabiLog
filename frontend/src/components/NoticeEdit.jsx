// src/pages/NoticeEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NoticeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 예시용 더미 데이터 불러오기
  useEffect(() => {
    // 실제 API 또는 상태에서 가져오세요
    const fetchedData = {
      title: "예시 제목입니다",
      content: "예시 내용입니다",
    };

    setTitle(fetchedData.title);
    setContent(fetchedData.content);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정 저장 처리 로직 추가 (API 호출 등)
    alert("수정이 완료되었습니다.");
    navigate(`/notice/${id}`);
  };

  return (
    <div className="notice-edit-container">
      <h2>공지사항 수정</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          내용
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button type="submit" className="edit-button">
            저장
          </button>
          <button type="button" className="back-button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeEdit;