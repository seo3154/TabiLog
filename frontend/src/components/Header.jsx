import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 추가!
import "../styles/Header.css";
import "../styles/Button.css";
import logo from "../assets/logo.png";
import Button from "../components/Button.jsx";

const Header = () => {
  const navigate = useNavigate(); // ✅ 훅은 컴포넌트 내부에서!

  const goToMyPage = () => {
    navigate("/mypage"); // ✅ 라우트 경로 소문자로 일치
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          {(() => {
            const raw = window.localStorage.getItem("tabilog.user");
            const me = raw ? JSON.parse(raw) : null;
            const mbti = me?.mbtiName ? me.mbtiName.toUpperCase() : null;
            const avatar = mbti
              ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${mbti}.png`
              : logo; // 기본 로고
            return <img src={avatar} alt="프로필/로고" />;
          })()}
          <h2>旅ログ</h2>
        </Link>
      </div>

      <ul className="menu">
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
        <li>
          <Link to="/recommend">추천게시판</Link>
        </li>
        <li>
          <Link to="/community">커뮤니티</Link>
        </li>
        <li>
          <Link to="/contact">문의하기</Link>
        </li>
        <li>
          <button
            onClick={goToMyPage}
            style={{ padding: "12px 32px", fontSize: 18, cursor: "pointer" }}
          >
            임시 MYPAGE
          </button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="white">로그인</Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="black">회원가입</Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
