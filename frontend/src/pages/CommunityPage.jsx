import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "../styles/CommunityBoard.css";
import "../styles/CommunityPage.css";
import Sidebar from "../components/SideBar";
import WriteButton from "../components/Button";
import CommunityBoard from "../components/CommunityBoard";
import CommunityWrite from "../components/CommunityWrite";
import CommunityPost from "../components/CommunityPost";

export default function CommunityPage() {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("전체 게시판");
  const [posts, setPosts] = useState([
    {
      id : 1,
      mbti : "ENTP",
      title : "테스트용 게시물입니다.",
      writer : "대이건",
      content : "대 이 건의 은총이 함께하는 즐거운 사다수",
      date : "2025-08-26"
    }
  ]);

  const AddPost = (newPost) => {
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
        <WriteButton
          variant="black"
          className="WriteButton"
          onClick={() => navigate("/community/write")}
        >
          글 작성
        </WriteButton>

        {/* Routes로 CommunityWrite 컴포넌트를 라우팅 */}
        <Routes>
          <Route
            path="/community/write"
            element={<CommunityWrite AddPost={AddPost} />} // AddPost 함수 전달
          />
        </Routes>

        {/* 게시글 목록 출력 */}
        <CommunityBoard posts={posts} selectedBoard={selectedBoard} />
      </div>
    </div>
  );
}