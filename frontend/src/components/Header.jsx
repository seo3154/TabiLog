import React from "react";
import { Link } from "react-router-dom"; // 추가!
import "../styles/Header.css";
import "../styles/Button.css";
import logo from "../assets/logo.png";
import Button from "../components/Button.jsx";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="로고" />
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
          <Button variant="white">로그인</Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="black">회원가입</Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
