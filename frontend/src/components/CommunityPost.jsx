import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import profile from "../assets/logo.png";

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
      const res = await axios.get(`http://localhost:8080/api/boards/${id}`);
      setPost(res.data);

      // 댓글 가져오기
      const commentRes = await axios.get(`http://localhost:8080/api/boards/${id}/comments`);
      setComments(commentRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return alert("댓글을 입력해주세요.");
    try {
      const res = await axios.post("http://localhost:8080/api/comments", {
        boardId: id,
        content: newComment
      });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-info">
          <span className="title">{post.title}</span>
          <span className="post-date">{post.createAt}</span>
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
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button onClick={handleCommentSubmit}>작성</button>
      </div>

      <div className="comments-section">
        {comments.map(c => (
          <div key={c.commentID} className="comment">
            <div className="comment-author">
              <img src={profile} alt="img" />
              <span className="writer">{c.userName}</span>
              <span className="comment-date">{c.createAt}</span>
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
