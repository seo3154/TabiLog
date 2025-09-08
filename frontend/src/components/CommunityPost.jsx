import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBoard, fetchComments, createComment } from "../apis/boards";
import profile from "../assets/logo.png";

export default function CommunityPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: b } = await fetchBoard(id, { increaseView: true });
      setPost(b);
      const { data: cs } = await fetchComments(id);
      setComments(cs);
    };
    load();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("댓글을 입력해주세요.");
    const userId = Number(localStorage.getItem("userid")) || 0;
    const userName = localStorage.getItem("username") || "anon";
    const { data } = await createComment({
      boardId: Number(id),
      userId,
      userName,
      content: newComment,
    });
    setComments((prev) => [data, ...prev]);
    setNewComment("");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-info">
          <span className="title">{post.title}</span>
          <span className="post-date">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="post-writer">
          <img src={profile} alt="profile" />
          <span className="writer">{post.userName}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>작성</button>
      </div>

      <div className="comments-section">
        {comments.map((c) => (
          <div key={c.commentId} className="comment">
            <div className="comment-author">
              <img src={profile} alt="img" />
              <span className="writer">{c.userName}</span>
              <span className="comment-date">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
