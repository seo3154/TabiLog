import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function NoticeBoard() {
  const [notices, setNotices] = useState([
    { id: 1, title: '서버 점검 안내', content: '8월 8일 새벽 2시부터 서버 점검이 진행됩니다.', date: '2025-08-07' },
    { id: 2, title: '신규 기능 출시', content: '회원 통계 기능이 추가되었습니다.', date: '2025-08-06' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const topRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTitle.trim() === '' || newContent.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newNotice = {
      id: notices.length + 1,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
    };

    setNotices([newNotice, ...notices]);
    setNewTitle('');
    setNewContent('');

    // 💥 입력 후 맨 위로 스크롤 이동
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 ref={topRef}>📢 공지사항</h2>

      {/* 글쓰기 폼 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="제목"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ padding: '8px', width: '300px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="내용"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ padding: '8px', width: '300px', height: '100px' }}
          />
        </div>
        <button type="submit">등록</button>
      </form>

      {/* 공지 목록 */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.id}</td>
              <td>
                {/* 제목 클릭 시 상세 페이지 이동 */}
                <span
                  style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate(`/notice/${notice.id}`, { state: notice })}
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

export default NoticeBoard;