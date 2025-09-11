import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/CommunityBoard.css";

export default function CommunityBoard({
  posts = [],
  selectedBoardKey = "ALL",
}) {
  const { t, i18n } = useTranslation();

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

  const filteredPosts = posts.filter(
    (post) =>
      (isAllBoard || post.category === boardValueMap[selectedBoardKey]) &&
      (selectedMbti === "" || post.mbti === selectedMbti)
  );

  return (
    <div className="board">
      <div>
        <h2>{heading}</h2>

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
    </div>
  );
}
