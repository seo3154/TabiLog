// src/components/CommunityBoard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/CommunityBoard.css";
import Search from "../assets/search.png";
import axios from "axios";

export default function CommunityBoard({
  posts = [],
  selectedBoardLabel = "",
  selectedCategoryValue = null,
}) {
  const [boardPosts, setBoardPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchWhat, setSearchWhat] = useState("title");
  const [keyword, setKeyword] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios
      .get(`/api/boards?page=${page}&size=15`)
      .then((res) => {
        setBoardPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const mbtiList = [
    "INFJ",
    "INFP",
    "INTJ",
    "INTP",
    "ENFJ",
    "ENFP",
    "ENTJ",
    "ENTP",
    "ISFJ",
    "ISFP",
    "ISTJ",
    "ISTP",
    "ESFJ",
    "ESFP",
    "ESTJ",
    "ESTP",
  ];

  const [selectedMbti, setSelectedMbti] = useState("");

  const handleChange = (e) => setSelectedMbti(e.target.value);

  // "전체 게시판/全体掲示板/all" 모두 인식
  const allBoardLabel = t("community.board.all");
  const isAllBoard = selectedCategoryValue == null;

  const source = posts && posts.length ? posts : boardPosts; // 부모 우선
  const filteredPosts = source.filter((post) => {
    const cat = (post?.category || "").trim();
    const want =
      selectedCategoryValue == null
        ? null
        : String(selectedCategoryValue).trim();
    const passBoard = isAllBoard || cat === want;
    const passMbti = selectedMbti === "" || post?.mbti === selectedMbti;
    return passBoard && passMbti;
  });

  const handleSearch = () => {
    setPage(0);
    axios
      .get(
        `/api/boards?page=0&size=15&searchWhat=${searchWhat}&keyword=${keyword}`
      )
      .then((res) => {
        setBoardPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="board">
      <div className="right-section">
        <h2>{isAllBoard ? allBoardLabel : selectedBoardLabel}</h2>
        <select
          aria-label={t("community.filter.mbtiAria")}
          value={selectedMbti}
          onChange={handleChange}
        >
          <option value="">{t("community.filter.mbtiPlaceholder")}</option>
          {mbtiList.map((mbti) => (
            <option key={mbti} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
      </div>

      <table className="board_table" aria-label={t("community.board.all")}>
        <thead>
          <tr>
            <th>{t("community.table.no")}</th>
            <th>{t("community.table.mbti")}</th>
            <th>{t("community.table.title")}</th>
            <th>{t("community.table.author")}</th>
            <th>{t("community.table.date")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post.boardid}>
                <td>
                  <Link to={`/community/post/${post.boardid}`}>
                    {post.boardid}
                  </Link>
                </td>
                <td>
                  <Link to={`/community/post/${post.boardid}`}>
                    {post.mbti}
                  </Link>
                </td>
                <td className="title">
                  <Link to={`/community/post/${post.boardid}`}>
                    {post.title}
                  </Link>
                </td>
                <td>
                  <Link to={`/community/post/${post.boardid}`}>
                    {post.nickname}
                  </Link>
                </td>
                <td>
                  <Link to={`/community/post/${post.boardid}`}>
                    {new Date(post.createAt).toLocaleDateString(i18n.language)}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">{t("community.empty")}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        <div className="prev">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            ◀ {t("community.pagination.prev")}{" "}
          </button>
        </div>

        <div className="numbers">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              className={page === idx ? "active" : ""}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="next">
          <button
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages}
          >
            {t("community.pagination.next")} ▶
          </button>
        </div>
      </div>

      {/* 검색기능 */}
      <div className="search-bar">
        <div className="search-wrapper">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={t("community.search.placeholder")}
          />

          <button onClick={handleSearch}>
            <img src={Search} alt="" />
          </button>
        </div>

        <select
          value={searchWhat}
          onChange={(e) => setSearchWhat(e.target.value)}
          className="searchoption"
        >
          <option value="title">{t("community.search.title")}</option>
          <option value="content">{t("community.search.content")}</option>
          <option value="user">{t("community.search.user")}</option>
        </select>
      </div>
    </div>
  );
}
