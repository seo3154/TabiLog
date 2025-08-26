// CommunityBoard.jsx
import React, { useState } from "react";
import "../styles/CommunityBoard.css";

export default function CommunityBoard({ posts, selectedBoard }) {
  const mbtiList = [
    "INFJ", "INFP", "INTJ", "INTP",
    "ENFJ", "ENFP", "ENTJ", "ENTP",
    "ISFJ", "ISFP", "ISTJ", "ISTP",
    "ESFJ", "ESFP", "ESTJ", "ESTP"
  ];

  const [selectedMbti, setSelectedMbti] = useState('');

  const handleChange = (e) => {
    setSelectedMbti(e.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      (selectedBoard === "전체 게시판" || post.category === selectedBoard) && // 전체 게시판일 경우 모든 글을 출력
      (selectedMbti === '' || post.mbti === selectedMbti) // MBTI 필터
  );

  return (
    <div className="board">
      <div>
        <h2>{selectedBoard}</h2>

        <select name="select" id="select" value={selectedMbti} onChange={handleChange}>
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
              <tr key={post.id}>
                <td><a href="#">{post.id}</a></td>
                <td><a href="#">{post.mbti}</a></td>
                <td className="title"><a href="#">{post.title}</a></td>
                <td><a href="#">{post.author}</a></td>
                <td><a href="#">{post.date}</a></td>
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
