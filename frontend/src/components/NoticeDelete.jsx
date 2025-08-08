// src/pages/NoticeDeleteConfirm.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const NoticeDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    // 삭제 처리 로직 (API 호출 등)
    alert("삭제되었습니다.");
    navigate("/notices"); // 목록 페이지로 이동
  };

  return (
    <div className="notice-delete-container">
      <h2>공지 삭제</h2>
      <p>정말 이 공지사항을 삭제하시겠습니까?</p>
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>
          삭제
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
};

export default NoticeDeleteConfirm;