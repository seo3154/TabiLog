import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function WritePage({ AddPost }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("전체게시판");
  const [content, setContent] = useState("");
  const [selectedMbti, setSelectedMbti] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // 새 게시글 객체 생성
  const newPost = {
    id: Date.now(),
    mbti: selectedMbti,  // 예시로 현재 선택된 MBTI를 추가
    category,
    title,
    content,
    author: "작성자 이름",  // 작성자 정보도 추가
    date: new Date().toISOString().split("T")[0],
  };

    if (AddPost) {
      AddPost(newPost); 
      alert("글이 등록되었습니다!");
    } else {
      console.error("AddPost 함수가 전달되지 않았습니다.");
    }

    navigate("/community");
  };

  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) {
      navigate(-1);
    }
  };

  return (
    <div className="wrap">
      <div className="mbti">
        <p></p>
      </div>
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
              name="category"
              id="category"
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
            name="content"
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

          <Button variant="white" onClick={() => navigate(-1)}>
            목록
          </Button>
        </div>
      </div>
    </div>
  );
}