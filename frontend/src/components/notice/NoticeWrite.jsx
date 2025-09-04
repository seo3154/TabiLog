import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Notice.css";

function NoticeWrite({ addNotice }) {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 1) 가드: 함수인지 확인
    if (typeof addNotice !== "function") {
      console.error("addNotice is not a function:", addNotice);
      alert(
        "공지 등록 함수를 찾을 수 없어요. 라우팅/props 전달을 확인해 주세요."
      );
      return;
    }

    // ✅ 2) 비동기 대비 (실패 대비 try/catch 포함)
    try {
      await addNotice(title, writer, content);
      navigate("/notice"); // 성공 시 이동
    } catch (err) {
      console.error("Failed to add notice:", err);
      alert("등록 중 오류가 발생했어요. 콘솔을 확인해 주세요.");
    }
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
          <button type="submit" className="submit-button">
            저장
          </button>
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
