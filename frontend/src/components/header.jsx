import React from 'react';
import '../styles/header.css'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
      <div className="logo">
        <a href="index.html">
          <img src={logo} alt="로고" />
          <h2>旅ログ</h2>
        </a>
      </div>
      
      <ul className="menu">
        <li>
          <a href="#">
            공지사항
          </a>
        </li>

        <li>
          <a href="#">
            추천게시판
          </a>
        </li>    

        <li>
          <a href="#">
            커뮤니티
          </a>
        </li>

        <li>
          <a href="#">
            문의하기
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
