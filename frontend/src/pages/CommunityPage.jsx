import React from "react";
import "../styles/CommunityPage.css";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

export default function Community() {
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
        <div className="board">
          <h2>INFJ</h2>
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

        <div className="bottom">
          <div>
            <select name="select" id="select">
              <option value="제목">제목</option>
              <option value="내용">내용</option>
              <option value="제목과 내용">제목과 내용</option>
            </select>

            <input
              type="search"
              placeholder="검색어를 입력해주세요."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
