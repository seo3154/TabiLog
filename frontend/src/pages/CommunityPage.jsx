// 커뮤니티
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommunityBoard.css";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import WriteButton from "../components/Button";
import CommunityBoard from "../components/CommunityBoard";

export default function CommunityPage() {
  const navigate = useNavigate();

  const posts = Array.from({ length: 15 }, (_, i) => {
    const no = 15 - i;
    return {
      id: no,
      mbti: "INFJ",
      title: `${no}번째 글`,
      author: "ㅇㅇㅇ",
      date: "2025.07.19",
    };
  });

  const menuItems = [
    { key: "general", label: "전체 게시판" },
    { key: "review", label: "리뷰 게시판" },
    { key: "qna", label: "Q&A 게시판" },
  ];

  return (
    <div className="community-page">
      <Sidebar menuItems={menuItems} />
      <div className="wrap">
        <WriteButton onClick={() => navigate("/community/write")}>
          글 작성
        </WriteButton>
        <CommunityBoard posts={posts} />
        <div className="bottom">
          <div>
            <select name="select" id="select">
              <option value="제목">제목</option>
              <option value="내용">내용</option>
              <option value="제목과 내용">제목과 내용</option>
            </select>
            <input type="search" placeholder="검색어를 입력해주세요." />
          </div>
        </div>
      </div>
    </div>
  );
}
