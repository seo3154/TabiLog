import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import profile from "../assets/logo.png";
import views from "../assets/views.png"
import "../styles/CommunityPost.css";

export default function CommunityPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null); // 로그인 유저 ID

  // localStorage에서 로그인 유저 가져오기
  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("tabilog.user") || "null");
    setUserId(me?.id || null);
  }, []);

  const avatar = useMemo(() => {
    const me = JSON.parse(localStorage.getItem("tabilog.user") || "null");
    const mbti = me?.mbtiName ? String(me.mbtiName).toUpperCase() : null;
    return mbti ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${mbti}.png` : profile;
  }, []);

  useEffect(() => {
    fetchPost();
  }, [id, userId]); // userId가 설정된 후 fetch

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/boards/${id}?userId=${userId}`);
      setPost(res.data);

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
    if (!userId) return alert("로그인이 필요합니다.");

    try {
      const res = await axios.post(
        `http://localhost:8080/api/boards/${id}/comments`,
        { userId, content: newComment }
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  const handleDelete = async () => {
    if(!window.confirm("정말 이 글을 삭제하시겠습니까?")) return;
    if (!userId) return alert("로그인이 필요합니다.");

    try {
      await axios.delete(`http://localhost:8080/api/boards/${id}?userId=${userId}`);
      alert("게시글이 삭제되었습니다.");
      navigate("/community");
    } catch (err) {
      console.error("게시글 삭제 실패", err.response?.data || err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCommentDelete = async (commentID) => {
    if(!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    if(!userId) return alert("로그인이 필요합니다.");

    try {
      await axios.delete(`http://localhost:8080/api/boards/comments/${commentID}?userId=${userId}`);
      setComments(comments.filter(c => c.commentID !== commentID));
    } catch(err) {
      console.error("댓글 삭제 실패", err.response?.data, err.response?.status);
      alert("삭제 중 오류가 발생했습니다.");
    }
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-info">
          <span className="title">{post.title}</span>
          <span className="post-date">
            {new Date(post.createAt).toLocaleString()}
          </span>
          
          <span className="post-views"><img src={views} alt="" />{post.views}</span>
        </div>

        <div className="post-writer">
          <img
            src={
              post.mbti
                ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${post.mbti.toUpperCase()}.png` 
                : profile
            }
            alt="profile"
          />
          <span className="writer">{post.nickname}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>

        {userId && post?.userId && String(userId) === String(post.userId) && (
          <div className="post-delete">
            <Button onClick={handleDelete} variant="black" className="post-delete-btn">
              삭제
            </Button>
          </div>
        )}
      </div>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />
        <Button onClick={handleCommentSubmit} className="comment-submit-btn">
          작성
        </Button>
      </div>

      <div className="comments-section">
        {comments.map((c) => (
          <div key={c.commentID} className="comment">
            <div className="comment-author">
              <div className="author">
                <img
                  src={c.mbtiUrl ? `${process.env.PUBLIC_URL}${c.mbtiUrl}` : profile}
                  alt="img"
                />
                <span className="writer">{c.nickname}</span>
                <span className="comment-date">
                  {new Date(c.createAt).toLocaleString()}
                </span>
              </div>

              {String(c.userId) === String(userId) && (
                <button 
                onClick={() => handleCommentDelete(c.commentID)} 
                className="delete_btn">
                  삭제
                </button>
              )}
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
