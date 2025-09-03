import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("전체게시판");
  const [content, setContent] = useState("");
  const [selectedMbti, setSelectedMbti] = useState(""); // 유저의 MBTI 값을 상태로 관리
  const navigate = useNavigate();

  // 유저의 정보를 받아오는 useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (userId) {
          const response = await axios.get(
            `http://localhost:8080/api/user/${userId}`
          );
          setSelectedMbti(response.data.mbti); // 유저의 MBTI 설정
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newPost = {
      title,
      content,
      category,
      mbti: selectedMbti, // 선택된 MBTI
      writer: localStorage.getItem("userid"),
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/board/write",
        newPost
      );

      if (response.status === 200) {
        alert("글이 등록되었습니다!");
        navigate("/community"); // 등록 후 목록 페이지로 이동
      }
    } catch (error) {
      console.error("게시글 등록 중 오류:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) {
      navigate(-1);
    }
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
