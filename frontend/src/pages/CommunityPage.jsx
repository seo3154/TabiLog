import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommunityBoard.css";
import "../styles/CommunityPage.css";
import Sidebar from "../components/SideBar";
import WriteButton from "../components/Button";
import CommunityBoard from "../components/CommunityBoard";
import CommunityWrite from "../components/CommunityWrite"; // 라우팅은 App에서
import { fetchBoards } from "../apis/boards";

export default function CommunityPage() {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("전체 게시판");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const categoryParam =
        selectedBoard === "전체 게시판" ? "" : selectedBoard;
      const { data } = await fetchBoards({
        category: categoryParam,
        page: 0,
        size: 200,
      });
      setPosts(data.content || data); // Page 지원/미지원 모두 대응
    };
    load();
  }, [selectedBoard]);

  const menuItems = [
    {
      key: "general",
      label: "전체 게시판",
      onClick: () => setSelectedBoard("전체 게시판"),
    },
    {
      key: "review",
      label: "리뷰 게시판",
      onClick: () => setSelectedBoard("리뷰 게시판"),
    },
    {
      key: "qna",
      label: "Q&A 게시판",
      onClick: () => setSelectedBoard("Q&A 게시판"),
    },
  ];
  return (
    <div className="community-page">
      <Sidebar menuItems={menuItems} />
      <div className="wrap">
        <WriteButton
          variant="black"
          className="WriteButton"
          onClick={() => {
            const userid = localStorage.getItem("userid");
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

        <CommunityBoard posts={posts} selectedBoard={selectedBoard} />
      </div>
    </div>
  );
}
