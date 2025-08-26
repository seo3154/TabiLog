import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams로 URL에서 파라미터 받기
import Button from "../components/Button";
import "../styles/CommunityPost.css";

export default function CommunityPost() {
  const { id } = useParams();  // URL에서 게시글 id를 받아옴

  // 예시 게시글 데이터 (이 부분을 실제 API나 데이터를 통해 가져오게 변경 가능)
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // id에 맞는 게시글을 찾는 로직 (예시)
    const fetchPost = () => {
      // 실제 데이터에서 해당 id에 맞는 게시글을 찾는 코드
      const postData = {
        id: id,
        mbti: "ENTP",
        title: "테스트용 게시물입니다.",
        writer: "대이건",
        content: "대 이 건의 은총이 함께하는 즐거운 사다수",
        date: "2025-08-26",
      };
      setPost(postData);

      // 댓글 예시 데이터
      const postComments = [
        {
          id: 1,
          writer: "땃 쥐",
          content: "숭배를 시작하면 잠이 확 깨 버릴 걸 알면서도, 나는 숭배해야만 해. 그것이 대이건을 목도한 자의 사명이다.",
          date: "2025-08-26",
        },
      ];
      setComments(postComments);
    };

    fetchPost();
  }, [id]); // id가 변경될 때마다 새로운 게시글 데이터를 가져옴

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!newComment) {
      alert("댓글을 입력해주세요.");
      return;
    }
    const newCommentObj = {
      id: comments.length + 1,
      writer: "영지", // 실제 사용자 정보로 수정
      content: newComment,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  if (!post) return <div>Loading...</div>; // 게시글이 로딩 중일 경우

  return (
    <div className="post-container">
      {/* 게시글 상단 */}
      <div className="post-header">
        <div className="post-info">
          <span className="mbti">{post.mbti}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <div className="post-writer">
          <span className="writer">{post.writer}</span>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* 추천 및 신고 버튼 */}
      <div className="post-actions">
        <button className="like-btn">추천</button>
        <button className="report-btn">신고</button>
      </div>

      {/* 댓글 영역 */}
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-author">
              <span className="writer">{comment.writer}</span>
              <span className="comment-date">{comment.date}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      {/* 댓글 작성 */}
      <div className="comment-form">
        <textarea
          placeholder="댓글을 입력하세요."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button className="comment-submit-btn" onClick={handleCommentSubmit}>
          댓글 작성
        </button>
      </div>
    </div>
  );
}
