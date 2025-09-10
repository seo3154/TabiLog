// src/pages/CommunityWrite.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/CommunityWrite.css";
import Button from "../components/Button";

export default function CommunityWrite() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const me = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("tabilog.user") || "null");
    } catch {
      return null;
    }
  }, []);

  // 표시용 MBTI: 유저 정보 우선, 없으면 로컬 백업 키
  const selectedMbti =
    (me?.mbtiName && String(me.mbtiName).toUpperCase()) ||
    localStorage.getItem("userMbti") ||
    "";

  // ⚠️ 서버가 기대하는 사용자 식별자 키가 환경마다 다를 수 있어 안전하게 병합
  const writerId = me?.id ?? me?.userId ?? me?.loginId ?? null;

  const [title, setTitle] = useState("");
  // 백엔드가 기대하는 한글 카테고리 값 유지
  const [category, setCategory] = useState("전체 게시판");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert(t("community.write.alert.needTitleContent"));
      return;
    }
    if (!writerId) {
      alert(t("community.write.alert.loginRequired"));
      return;
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      category, // 한글 값 그대로
      userId: writerId,
    };

    try {
      await axios.post("http://localhost:8080/api/boards", postData);
      alert(t("community.write.alert.success"));
      navigate("/community");
    } catch (err) {
      console.error("게시글 등록 실패", err);
      const serverMsg =
        err?.response?.data?.message || t("community.write.alert.fail");
      alert(serverMsg);
    }
  };

  const handleCancel = () => {
    if (window.confirm(t("community.write.alert.cancelConfirm"))) {
      navigate(-1);
    }
  };

  return (
    <div className="wrap">
      <div className="mbti">
        <input type="text" value={selectedMbti} disabled aria-label="MBTI" />
      </div>

      <div className="write_section">
        <div className="selection">
          <div className="title">
            <input
              type="text"
              placeholder={t("community.write.placeholder.title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="filter">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="category"
            >
              {/* 보이는 라벨은 다국어, 실제 값은 한글 유지 */}
              <option value="전체 게시판">
                {t("community.write.category.all")}
              </option>
              <option value="리뷰 게시판">
                {t("community.write.category.review")}
              </option>
              <option value="QnA 게시판">
                {t("community.write.category.qna")}
              </option>
            </select>
          </div>
        </div>

        <div className="writebox">
          <textarea
            placeholder={t("community.write.placeholder.content")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>

        <div className="button">
          <Button variant="black" onClick={handleSubmit}>
            {t("community.write.button.submit")}
          </Button>
          <Button variant="white" onClick={handleCancel}>
            {t("community.write.button.cancel")}
          </Button>
          <Button variant="white" onClick={() => navigate(-1)}>
            {t("community.write.button.list")}
          </Button>
        </div>
      </div>
    </div>
  );
}
