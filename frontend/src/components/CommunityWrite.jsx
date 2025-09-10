import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function CommunityWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("전체 게시판");
  const [content, setContent] = useState("");

  // 로그인 정보 가져오기
  const user = JSON.parse(localStorage.getItem("tabilog.user"));
  const selectedMbti = localStorage.getItem("userMbti") || "";
  const writerId = user?.id;

  const handleSubmit = async () => {
    // 입력값 체크
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // writerId 체크
    if (!writerId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const postData = {
      title,
      content,
      category,
      userId: writerId,
    };

    try {
      const res = await axios.post("http://localhost:8080/api/boards", postData);
      alert("글이 등록되었습니다!");
      navigate("/community");
    } catch (err) {
      console.error("게시글 등록 실패", err);
      // 서버가 400/500 오류를 반환하면 err.response.data에 메시지가 있을 수 있음
      const errorMessage =
        err.response?.data?.message || "게시글 등록에 실패했습니다.";
      alert(errorMessage);
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="전체 게시판">전체 게시판</option>
              <option value="리뷰 게시판">리뷰 게시판</option>
              <option value="QnA 게시판">QnA 게시판</option>
            </select>
          </div>
        </div>

        <div className="writebox">
          <textarea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>

        <div className="button">
          <Button variant="black" onClick={handleSubmit}>
            등록
          </Button>
          <Button variant="white" onClick={handleCancel}>
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
