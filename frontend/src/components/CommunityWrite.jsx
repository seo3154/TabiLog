import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../apis/boards";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function CommunityWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ALL");
  const [selectedMbti, setSelectedMbti] = useState("");
  const [writer, setWriter] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const navigate = useNavigate();

  // const payload = {
  //   title: String,
  //   content: String,
  //   category: String,
  //   selectedMbti: String,
  //   writer: String,
  //   createdAt: String,
  // };

  useEffect(() => {
    // 로그인된 유저 정보 가정: localStorage에 userid/username/mbti 저장되어 있음
    const mbti = localStorage.getItem("mbti") || "";
    setSelectedMbti(mbti);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!title.trim() || !content.trim())
    //   return alert("제목과 내용을 입력해주세요.");

    const payload = {
      title,
      content,
      category, // "ALL" | "REVIEW" | "QNA"
      mbti: selectedMbti, // DTO 필드명에 맞게
    };

    const status = await createBoard(payload);

    if (status?.success) {
      alert("글이 등록되었습니다!");
      navigate("/community");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) navigate(-1);
  };

  return (
    <div className="wrap">
      <div className="mbti">
        <input type="text" value={selectedMbti} disabled />
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
              <option value="ALL">전체 게시판</option>
              <option value="REVIEW">리뷰 게시판</option>
              <option value="QUESTION">Q&A 게시판</option>
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
          <Button
            variant="white"
            className="delete_button"
            onClick={handleCancel}
          >
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
