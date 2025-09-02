import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios"; // API 호출용
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

  // 서버에서 게시글 가져오기
  useEffect(() => {
    fetchPosts();
  }, [selectedBoard]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/boards", {
        params: { category: selectedBoard === "전체 게시판" ? "" : selectedBoard }
      });
      setPosts(res.data);
    } catch (err) {
      console.error("게시글 가져오기 실패", err);
    }
  };

  const AddPost = async (newPost) => {
    try {
      const res = await axios.post("http://localhost:8080/api/boards", newPost);
      setPosts([res.data, ...posts]);
      alert("글이 등록되었습니다!");
    } catch (err) {
      console.error("글 등록 실패", err);
    }
  };

  const menuItems = [
    { key: "general", label: "전체 게시판", onClick: () => setSelectedBoard("전체 게시판") },
    { key: "review", label: "리뷰 게시판", onClick: () => setSelectedBoard("리뷰 게시판") },
    { key: "qna", label: "Q&A 게시판", onClick: () => setSelectedBoard("Q&A 게시판") },
  ];

  return (
    <div className="community-page">
      <Sidebar menuItems={menuItems} />
      <div className="wrap">
        <WriteButton
          variant="black"
          className="WriteButton"
          onClick={() => {
          const userid = localStorage.getItem("userid"); // 로그인 여부 체크
          if (!userid) {
          alert("로그인이 필요합니다!");
          navigate("/login");
          } else {
          navigate("/community/write");
          }
        }}
        >
          글 작성
        </WriteButton>

        {/* Routes로 CommunityWrite 컴포넌트를 라우팅 */}
        <Routes>
          <Route
            path="/community/write"
            element={<CommunityWrite AddPost={AddPost} />}
          />
        </Routes>

        {/* 게시글 목록 출력 */}
        <CommunityBoard posts={posts} selectedBoard={selectedBoard} />
      </div>
    </div>
  );
}
