// src/pages/CommunityPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "../styles/CommunityBoard.css";
import "../styles/CommunityPage.css";

import Sidebar from "../components/SideBar";
import Button from "../components/Button";
import CommunityBoard from "../components/CommunityBoard";

export default function CommunityPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 카테고리(보이는 라벨은 i18n, 실제 필터 값은 한글 그대로 유지)
  const CATEGORIES = useMemo(
    () => ({
      ALL: "전체 게시판",
      REVIEW: "리뷰 게시판",
      QNA: "QnA 게시판",
    }),
    []
  );

  const [selectedBoard, setSelectedBoard] = useState(CATEGORIES.ALL);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 게시글 가져오기
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setLoading(true);

        const params =
          selectedBoard === CATEGORIES.ALL
            ? {} // 전체 게시판이면 필터 없이
            : { searchWhat: "category", keyword: selectedBoard };

        const res = await axios.get("http://localhost:8080/api/boards", {
          params,
          signal: controller.signal,
        });

        // 백엔드가 배열/페이지 둘 다 가능할 때 안전 처리
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];

        setPosts(data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("게시글 가져오기 실패", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, [selectedBoard, CATEGORIES.ALL]);

  // 사이드바 메뉴
  const menuItems = [
    {
      key: "general",
      label: t("community.board.all"), // "전체 게시판"
      onClick: () => setSelectedBoard(CATEGORIES.ALL),
    },
    {
      key: "review",
      label: t("community.board.review"), // "리뷰 게시판"
      onClick: () => setSelectedBoard(CATEGORIES.REVIEW),
    },
    {
      key: "qna",
      label: t("community.board.qna"), // "Q&A게시판"
      onClick: () => setSelectedBoard(CATEGORIES.QNA),
    },
  ];

  const goWrite = () => {
    const userRaw = localStorage.getItem("tabilog.user");
    let user = null;
    try {
      user = userRaw ? JSON.parse(userRaw) : null;
    } catch {
      user = null;
    }

    if (!user) {
      alert(t("auth.login.title") + " " + t("auth.error.invalidCredentials"));
      navigate("/login");
      return;
    }
    localStorage.setItem("userMbti", user.mbtiName || "");
    navigate("/community/write");
  };

  return (
    <div className="community-page">
      <Sidebar menuItems={menuItems} />

      <div className="wrap">
        <Button
          variant="black"
          className="WriteButton"
          onClick={goWrite}
          aria-label={t("community.board.all")}
        >
          {t("notice.list.writeBtn") /* "글쓰기" */}
        </Button>

        {loading ? (
          <div className="board_loading">Loading…</div>
        ) : (
          <CommunityBoard posts={posts} selectedBoard={selectedBoard} />
        )}
      </div>
    </div>
  );
}
