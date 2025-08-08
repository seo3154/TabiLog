import React from "react";
import { Link } from "react-router-dom"; // 추가!
import "../styles/Header.css";
import logo from "../assets/logo.png";

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
      </ul>
    </header>
  );
};

export default Header;
