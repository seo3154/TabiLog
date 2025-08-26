// CommunityWrite.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function WritePage({ onAddPost }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("default");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // 새 게시글 객체 생성
    const newPost = {
      id: Date.now(),
      mbti: "INFJ",  // 여기서 나중에 백에서 가져온 유저 정보로 수정할 것
      category,
      title,
      content,
      date: new Date().toISOString().split("T")[0],
    };

    // 부모 컴포넌트의 onAddPost 함수 호출하여 게시글 추가
    if (onAddPost) {
      onAddPost(newPost);
      alert("글이 등록되었습니다!");
    } else {
      console.error("onAddPost 함수가 전달되지 않았습니다.");
    }

    // 글 작성 후 CommunityPage로 돌아가기
    navigate("/community"); // 글 작성 후 CommunityPage로 돌아감
  };

  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) {
      setTitle("");
      setContent("");
    }
  };

  const handleBoard = () => {
    if (window.confirm("목록으로 돌아가시겠습니까?")) {
      navigate("/community")
    };
  };

  return (
    <div className="wrap">
      <div className="write_section">
        <div className="selection">
          <div className="title">
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="filter">
            <select
              name="mbti_select"
              id="mbti_select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default">게시판 선택 ▼</option>
              <option value="전체게시판">전체 게시판</option>
              <option value="리뷰게시판">리뷰 게시판</option>
              <option value="질문게시판">Q&A 게시판</option>
            </select>
          </div>
        </div>

        <div className="writebox">
          <textarea
            name="write"
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>

        <div className="button">
          <input
            className="submit"
            type="button"
            value="등록"
            onClick={handleSubmit}
          />
          <Button variant="white" className="delete_button" onClick={handleCancel}>
            삭제
          </Button>

          <Button variant="white" onClick={handleBoard}>
            목록
          </Button>
        </div>
      </div>
    </div>
  );
}
