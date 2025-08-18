import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function WritePage() {
    const navigate = useNavigate();
  const [mbti, setMbti] = useState("INFJ"); 
  const [category, setCategory] = useState("전체게시판"); 
  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    console.log({
      mbti,
      category,
      title,
      content,
    });
    alert("글이 등록되었습니다!");
  };

  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="wrap">
      <div className="write_section">
        <div className="mbti">
          <p>{mbti}</p>
        </div>

        <div className="selection">
          <div className="filter">
            <select
              name="mbti_select"
              id="mbti_select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="전체게시판">전체 게시판</option>
              <option value="리뷰게시판">리뷰 게시판</option>
              <option value="질문게시판">Q&A 게시판</option>
            </select>
          </div>

          <div className="title">
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
        <Button variant="white" className="delete_button" 
        onClick={() => navigate("/community")}>
          삭제
        </Button>
        </div>
      </div>
    </div>
  );
}
