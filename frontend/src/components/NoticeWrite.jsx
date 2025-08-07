import React, { useState } from 'react';
import '../styles/NoticeDetail.css';
import { useNavigate } from 'react-router-dom';

function NoticeWrite({ addNotice }) {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotice(title, writer, content);
    navigate('/');
  };

  return (
    <div>
      <h2>공지사항 글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <p>제목 : <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /></p>
        <p>작성자 : <input
          type="text"
          placeholder="작성자"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          required
        /></p>
        <p>내용<br/><textarea
          placeholder="내용"s
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        /></p>
        <button type="submit">저장</button>
        <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>
      </form>
    </div>  
  );
}

export default NoticeWrite;