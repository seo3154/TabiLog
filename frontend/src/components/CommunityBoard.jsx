
import React, { useState, useMemo } from "react";

// src/components/CommunityBoard.jsx

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/CommunityBoard.css";
import Search from "../assets/search.png";
import axios from "axios";


export default function CommunityBoard({ posts = [], selectedBoard = "" }) {
  const [boardPosts, setBoardPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchWhat, setSearchWhat] = useState("title");
  const [keyword, setKeyword] = useState("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios.get(`/api/boards?page=${page}&size=15`)
    .then(res => {
      setBoardPosts(res.data.content);
      setTotalPages(res.data.totalPages);
    })
    .catch(err => console.error(err));
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

  // 키→표시 라벨(번역)
  const boardLabelMap = useMemo(
    () => ({
      ALL: t("community.board.all"),
      REVIEW: t("community.board.review"),
      QNA: t("community.board.qna"),
    }),
    [t]
  );

  // 키→백엔드 실제 카테고리 값(한글)
  const boardValueMap = useMemo(
    () => ({
      REVIEW: "리뷰 게시판",
      QNA: "QnA 게시판",
    }),
    []
  );

  const isAllBoard = selectedBoardKey === "ALL";
  const heading = boardLabelMap[selectedBoardKey] || boardLabelMap.ALL;

  const filteredPosts = boardPosts.filter(
    (post) =>
      (isAllBoard || post.category === boardValueMap[selectedBoardKey]) &&
      (selectedMbti === "" || post.mbti === selectedMbti)
  );

  const handleSearch = () => {
    setPage(0);
    axios
      .get(`/api/boards?page=0&size=15&searchWhat=${searchWhat}&keyword=${keyword}`)
      .then(res => {
        setBoardPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="board">

      <div className="right-section">
        <h2>{isAllBoard ? allBoardLabel : selectedBoard}</h2>

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

      <table className="board_table" aria-label={heading}>
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
            ◀ 이전
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
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
            다음 ▶
          </button>
        </div>
      </div>

      {/* 검색기능 */}
      <div className="search-bar">
        <div className="search-wrapper">
          <input 
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요." 
          />

          <button onClick={handleSearch}>
            <img src={Search} alt="" />
          </button>
        </div>

        <select value={searchWhat} onChange={e => setSearchWhat(e.target.value)} className="searchoption">
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="user">작성자</option>
        </select>
      </div>
    </div>
  );
}
