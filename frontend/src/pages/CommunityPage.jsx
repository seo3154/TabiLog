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

  // 상태에는 논리 키만 저장
  const CATEGORIES = useMemo(
    () => ({
      ALL: null, // 전체면 필터 없이
      REVIEW: "리뷰 게시판", // 백엔드 필터용 실제 값(한글)
      QNA: "QnA 게시판",
    }),
    []
  );

  const [selectedBoard, setSelectedBoard] = useState("ALL"); // 논리 키
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 게시글 가져오기
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setLoading(true);

        const categoryValue = CATEGORIES[selectedBoard]; // null | "리뷰 게시판" | "QnA 게시판"
        const params = categoryValue
          ? { searchWhat: "category", keyword: categoryValue }
          : {};

        const res = await axios.get("http://localhost:8080/api/boards", {
          params,
          signal: controller.signal,
        });

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
  }, [selectedBoard, CATEGORIES]);

  // 사이드바 메뉴 (라벨은 번역, 값은 키)
  const menuItems = [
    {
      key: "general",
      label: t("community.board.all"),
      onClick: () => setSelectedBoard("ALL"),
    },
    {
      key: "review",
      label: t("community.board.review"),
      onClick: () => setSelectedBoard("REVIEW"),
    },
    {
      key: "qna",
      label: t("community.board.qna"),
      onClick: () => setSelectedBoard("QNA"),
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
          {t("notice.list.writeBtn")}
        </Button>

        {loading ? (
          <div className="board_loading">Loading…</div>
        ) : (
          <CommunityBoard
            posts={posts}
            selectedBoardLabel={
              selectedBoard === "ALL"
                ? t("community.board.all")
                : selectedBoard === "REVIEW"
                ? t("community.board.review")
                : selectedBoard === "QNA"
                ? t("community.board.qna")
                : t("community.board.all")
            }
            selectedCategoryValue={CATEGORIES[selectedBoard]} // null | "리뷰 게시판" | "QnA 게시판"
          />
        )}
      </div>
    </div>
  );
}
