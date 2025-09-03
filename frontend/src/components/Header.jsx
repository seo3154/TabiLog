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

  const loginpage = () => navigate("/login");
  const regpage = () => navigate("/regpage");

  // 추가: 마이페이지/로그아웃 핸들러
  const mypage = () => navigate("/mypage"); // 라우트에 맞춰 경로 조정
  const logout = () => {
    try {
      // 필요하면 백엔드 로그아웃 API 호출도 여기서
      window.localStorage.removeItem("tabilog.user");
      // 전역에 상태 변경 알림
      window.dispatchEvent(
        new CustomEvent("tabilog:user-updated", { detail: null })
      );
      navigate("/"); // 로그아웃 후 홈으로
    } catch (e) {
      console.error(e);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
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
          {/* me 없으면: 로그인/회원가입 */}
          {!me ? (
            <>
              <Button variant="white" onClick={loginpage}>
                로그인
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="black" onClick={regpage}>
                회원가입
              </Button>
            </>
          ) : (
            // me 있으면: 마이페이지/로그아웃
            <>
              <Button variant="white" onClick={mypage}>
                마이페이지
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="black" onClick={logout}>
                로그아웃
              </Button>
            </>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
