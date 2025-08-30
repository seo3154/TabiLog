import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; // 추가!
import "../styles/Header.css";
import "../styles/Button.css";
import logo from "../assets/logo.png";
import Button from "../components/Button.jsx";

function readMe() {
  try {
    const raw = window.localStorage.getItem("tabilog.user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const Header = () => {
  const navigate = useNavigate(); // ✅ 훅은 컴포넌트 내부에서!
  const [me, setMe] = useState(() => readMe());

  useEffect(() => {
    const onUpdate = (e) => {
      // 커스텀 이벤트로 들어온 필드 반영 + localStorage 최신본 보정
      const latest = readMe();
      setMe(latest ? { ...latest, ...(e.detail || {}) } : e.detail || null);
    };
    const onStorage = (e) => {
      if (e.key === "tabilog.user") setMe(readMe());
    };
    window.addEventListener("tabilog:user-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("tabilog:user-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const avatar = useMemo(() => {
    const mbti = me?.mbtiName ? String(me.mbtiName).toUpperCase() : null;
    return mbti ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${mbti}.png` : logo;
  }, [me?.mbtiName]);

  const goToMyPage = () => {
    navigate("/mypage"); // ✅ 라우트 경로 소문자로 일치
  };

  const loginpage = () => {
    navigate("/login");
  };

  const regpage = () => {
    navigate("/regpage");
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={avatar} alt="프로필/로고" />
          <h2>TABILOG</h2>
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
          <Link to="/contact">고객센터</Link>
        </li>
        <li>
          <button
            onClick={goToMyPage}
            style={{ padding: "12px 32px", fontSize: 18, cursor: "pointer" }}
          >
            임시 MYPAGE
          </button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="white" onClick={loginpage}>
            로그인
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="black" onClick={regpage}>
            회원가입
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
