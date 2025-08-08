import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NoticeDetail.css';

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
    <div className="notice-write-container">
      <h2 className="notice-write-title">공지사항 글쓰기</h2>
      <form className="notice-write-form" onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          작성자:
          <input
            type="text"
            placeholder="작성자"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
          />
        </label>

        <label>
          내용:
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit" className="submit-button">저장</button>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            목록
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeWrite;