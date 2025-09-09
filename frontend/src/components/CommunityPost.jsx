import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import profile from "../assets/logo.png";
import "../styles/CommunityPost.css";

export default function CommunityPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      // 게시글 가져오기
      const res = await axios.get(`http://localhost:8080/api/boards/${id}`);
      setPost(res.data);

      // 댓글 가져오기
      const commentRes = await axios.get(
        `http://localhost:8080/api/boards/${id}/comments`
      );
      setComments(commentRes.data);
    } catch (err) {
      console.error("게시글/댓글 가져오기 실패", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return alert("댓글을 입력해주세요.");
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) return alert("로그인이 필요합니다.");

      const res = await axios.post(
        `http://localhost:8080/api/boards/${id}/comments`,
        {
          userId: userId,
          content: newComment,
        }
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-info">
          <span className="title">{post.title}</span>
          <span className="post-date">
            {new Date(post.createAt).toLocaleString()}
          </span>
        </div>
        <div className="post-writer">
          <img src={profile} alt="profile" />
          <span className="writer">{post.nickname}</span>
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
        <Button onClick={handleCommentSubmit}>작성</Button>
      </div>

      <div className="comments-section">
        {comments.map((c) => (
          <div key={c.commentID} className="comment">
            <div className="comment-author">
              <img src={profile} alt="img" />
              <span className="writer">{c.nickname}</span>
              <span className="comment-date">
                {new Date(c.createAt).toLocaleString()}
              </span>
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
