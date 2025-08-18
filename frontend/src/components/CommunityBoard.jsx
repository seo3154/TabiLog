// 게시판 글 목록
import React from "react";
import "../styles/CommunityBoard.css";

export default function PostList({ posts }) {
  return (
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
  );
}
