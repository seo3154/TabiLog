// 게시판 글 목록
import React, {useState} from "react";
import "../styles/CommunityBoard.css";

export default function PostList({ posts }) {
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

  return (
    <div className="board">
      <div>
        <h2>INFJ</h2>

        <div>
          <select name="select" id="select" value={selectedMbti} onChange={handleChange}>
            <option value="">MBTI ▼</option>
            {mbtiList.map((mbti) => (
              <option key={mbti} value={mbti}>
                {mbti}
              </option>
            ))}
          </select>
        </div>
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
          {posts.map((post) => (
            <tr key={post.id}>
              <td><a href="#">{post.id}</a></td>
              <td><a href="#">{post.mbti}</a></td>
              <td className="title"><a href="#">{post.title}</a></td>
              <td><a href="#">{post.author}</a></td>
              <td><a href="#">{post.date}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
