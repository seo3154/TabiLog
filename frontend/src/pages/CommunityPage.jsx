// CommunityPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommunityBoard.css";
import "../styles/CommunityPage.css";
import Sidebar from "../components/SideBar";
import WriteButton from "../components/Button";
import CommunityBoard from "../components/CommunityBoard";
import { Route, Routes } from "react-router-dom";
import CommunityWrite from "../components/CommunityWrite";

export default function CommunityPage() {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("전체 게시판");
  const [posts, setPosts] = useState([]); // 게시글 상태 관리

  // 게시글 추가 함수
  const onAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // 새 게시글을 기존 목록에 추가
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
        {/* 글 작성 버튼 */}
        <WriteButton
          variant="black"
          className="WriteButton"
          onClick={() => navigate("/community/write")} // WriteButton 클릭 시 글 작성 페이지로 이동
        >
          글 작성
        </WriteButton>

        {/* Routes로 CommunityWrite 컴포넌트를 라우팅 */}
        <Routes>
          <Route
            path="/community/write"
            element={<CommunityWrite onAddPost={onAddPost} />} // 글 작성 후 onAddPost로 게시글 추가
          />
        </Routes>

        {/* 게시글 목록 출력 */}
        <CommunityBoard posts={posts} selectedBoard={selectedBoard} />
      </div>
    </div>
  );
}