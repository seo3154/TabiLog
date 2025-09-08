import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CommunityBoard.css";

export default function CommunityBoard({ posts, selectedBoard }) {
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

  const filteredPosts = posts.filter(
    (post) =>
      (selectedBoard === "전체 게시판" || post.category === selectedBoard) &&
      (selectedMbti === "" || (post.mbti || "") === selectedMbti)
  );

  return (
    <div className="board">
      <div>
        <h2>{selectedBoard}</h2>
        <select value={selectedMbti} onChange={handleChange}>
          <option value="">MBTI ▼</option>
          {mbtiList.map((mbti) => (
            <option key={mbti} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
      </div>
      <table className="board_table">
        <thead>
          <tr>
            <th>NO</th>
            <th>MBTI</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post.boardId}>
                <td>
                  <Link to={`/community/post/${post.boardId}`}>
                    {post.boardId}
                  </Link>
                </td>
                <td>
                  <Link to={`/community/post/${post.boardId}`}>
                    {post.mbti}
                  </Link>
                </td>
                <td className="title">
                  <Link to={`/community/post/${post.boardId}`}>
                    {post.title}
                  </Link>
                </td>
                <td>
                  <Link to={`/community/post/${post.boardId}`}>
                    {post.userName}
                  </Link>
                </td>
                <td>
                  <Link to={`/community/post/${post.boardId}`}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
