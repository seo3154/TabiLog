import React from 'react';
import '../styles/NoticeDetail.css';

import { useParams, useNavigate } from 'react-router-dom';

function NoticeDetail({ notices }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const notice = notices.find((n) => n.id === Number(id));

  if (!notice) return <p className="notice-not-found">공지사항이 없습니다.</p>;

  return (
    <div className="notice-detail-container">
      <div className="notice-card">
        <h2 className="notice-title">{notice.title}</h2>
        <div className="notice-meta">
          <span className="notice-writer">작성자: {notice.writer}&nbsp;&nbsp;&nbsp;</span>
          <span className="notice-date">작성일: {notice.date}</span>
        </div>
        <div className="notice-content">
          {notice.content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>
      </div>
    </div>
  );
}

export default NoticeDetail;