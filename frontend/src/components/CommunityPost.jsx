// src/pages/CommunityPost.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import profile from "../assets/logo.png";
import views from "../assets/views.png";
import "../styles/CommunityPost.css";

export default function CommunityPost() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);

  const lang = useMemo(
    () => i18n.language || navigator.language || "ko-KR",
    [i18n.language]
  );

  // 로그인 유저
  useEffect(() => {
    try {
      const me = JSON.parse(localStorage.getItem("tabilog.user") || "null");
      const uid = me?.id ?? me?.userId ?? me?.loginId ?? null;
      setUserId(uid ? String(uid) : null);
    } catch {
      setUserId(null);
    }
  }, []);

  // 아바타(내 MBTI 이미지 우선)
  const avatar = useMemo(() => {
    try {
      const me = JSON.parse(localStorage.getItem("tabilog.user") || "null");
      const mbti = me?.mbtiName ? String(me.mbtiName).toUpperCase() : null;
      return mbti
        ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${mbti}.png`
        : profile;
    } catch {
      return profile;
    }
  }, []);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userId]);

  const fetchPost = async () => {
    try {
      const userParam = userId ? `?userId=${encodeURIComponent(userId)}` : "";
      const res = await axios.get(
        `http://localhost:8080/api/boards/${id}${userParam}`
      );
      setPost(res.data);

      const commentRes = await axios.get(
        `http://localhost:8080/api/boards/${id}/comments`
      );
      setComments(Array.isArray(commentRes.data) ? commentRes.data : []);
    } catch (err) {
      console.error("게시글/댓글 가져오기 실패", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim())
      return alert(t("community.post.commentPlaceholder"));
    if (!userId) return alert(t("community.post.loginRequired"));

    try {
      const res = await axios.post(
        `http://localhost:8080/api/boards/${id}/comments`,
        { userId, content: newComment.trim() }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert(t("community.post.deleteError"));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t("community.post.deleteConfirm"))) return;
    if (!userId) return alert(t("community.post.loginRequired"));

    try {
      await axios.delete(
        `http://localhost:8080/api/boards/${id}?userId=${encodeURIComponent(
          userId
        )}`
      );
      alert(t("community.post.deleted"));
      navigate("/community");
    } catch (err) {
      console.error("게시글 삭제 실패", err?.response?.data || err);
      alert(t("community.post.deleteError"));
    }
  };

  const handleCommentDelete = async (commentID) => {
    if (!window.confirm(t("community.post.commentDeleteConfirm"))) return;
    if (!userId) return alert(t("community.post.loginRequired"));

    try {
      await axios.delete(
        `http://localhost:8080/api/boards/comments/${commentID}?userId=${encodeURIComponent(
          userId
        )}`
      );
      setComments((prev) => prev.filter((c) => c.commentID !== commentID));
    } catch (err) {
      console.error(
        "댓글 삭제 실패",
        err?.response?.data,
        err?.response?.status
      );
      alert(t("community.post.commentDeleteError"));
    }
  };

  if (!post) return <div>{t("community.post.loading")}</div>;

  const isOwner = (() => {
    const owner = post?.userId ?? post?.loginId ?? null;
    return owner && userId && String(owner) === String(userId);
  })();

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-info">
          <span className="title">{post.title}</span>
          <span className="post-date">
            {post.createAt ? new Date(post.createAt).toLocaleString(lang) : ""}
          </span>

          <span className="post-views">
            <img src={views} alt="" />
            {post.views}
          </span>
        </div>

        <div className="post-writer">
          <img
            src={
              post.mbti
                ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${String(
                    post.mbti
                  ).toUpperCase()}.png`
                : profile
            }
            alt="profile"
          />
          <span className="writer">{post.nickname}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>

        {isOwner && (
          <div className="post-delete">
            <Button
              onClick={handleDelete}
              variant="black"
              className="post-delete-btn"
            >
              {t("community.post.delete")}
            </Button>
          </div>
        )}
      </div>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t("community.post.commentPlaceholder")}
        />
        <Button onClick={handleCommentSubmit} className="comment-submit-btn">
          {t("community.post.submit")}
        </Button>
      </div>

      <div className="comments-section">
        {comments.map((c) => (
          <div key={c.commentID} className="comment">
            <div className="comment-author">
              <div className="author">
                <img
                  src={
                    c.mbtiUrl
                      ? `${process.env.PUBLIC_URL}${c.mbtiUrl}`
                      : profile
                  }
                  alt="img"
                />
                <span className="writer">{c.nickname}</span>
                <span className="comment-date">
                  {c.createAt ? new Date(c.createAt).toLocaleString(lang) : ""}
                </span>
              </div>

              {userId && String(c.userId) === String(userId) && (
                <button
                  onClick={() => handleCommentDelete(c.commentID)}
                  className="delete_btn"
                >
                  {t("community.post.delete")}
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
