import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import "../styles/CommunityBoard.css";
import "../styles/CommunityPage.css";
import Sidebar from "../components/SideBar";
import WriteButton from "../components/Button";
import CommunityBoard from "../components/CommunityBoard";
import CommunityWrite from "../components/CommunityWrite";

export default function CommunityPage() {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("전체 게시판");
  const [posts, setPosts] = useState([]);

  // 게시글 가져오기
  useEffect(() => {
    fetchPosts();
  }, [selectedBoard]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/boards", {
        params: {
          searchWhat: "category",
          keyword: selectedBoard === "전체 게시판" ? "" : selectedBoard,
        },
      });
      setPosts(res.data.content);
    } catch (err) {
      console.error("게시글 가져오기 실패", err);
    }
  };

  // 글 등록 함수
  const AddPost = async (newPost) => {
    try {
      // JSON 키 이름을 DTO 필드와 맞춤
      const postData = {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        mbti: newPost.mbti,
        user_id: newPost.userId, // DTO에 맞춰 user_id
        createdAt: newPost.createAt,
      };

      const res = await axios.post("http://localhost:8080/api/boards", postData);
      setPosts([res.data, ...posts]);
      alert("글이 등록되었습니다!");
    } catch (err) {
      console.error("글 등록 실패", err);
      throw err;
    }
  };

  const menuItems = [
    { key: "general", label: "전체 게시판", onClick: () => setSelectedBoard("전체 게시판") },
    { key: "review", label: "리뷰 게시판", onClick: () => setSelectedBoard("리뷰 게시판") },
    { key: "qna", label: "QnA 게시판", onClick: () => setSelectedBoard("QnA 게시판") },
  ];

  return (
    <div className="community-page">
      <Sidebar menuItems={menuItems} />
      <div className="wrap">
        <WriteButton
          variant="black"
          className="WriteButton"
          onClick={() => {
            const user = JSON.parse(localStorage.getItem("tabilog.user"));
            if (!user) {
              alert("로그인이 필요합니다!");
              navigate("/login");
              return;
            }
            localStorage.setItem("userMbti", user.mbtiName || "");
            navigate("/community/write");
          }}
        >
          글 작성
        </WriteButton>

        {/* 게시글 목록 */}
        <CommunityBoard posts={posts} selectedBoard={selectedBoard} />
      </div>
    </div>
  );
}
