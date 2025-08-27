import React,{useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_w.png";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <div className="wrap">
            <footer>
                <div className="footertop">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="로고" />
                            <h3>TABILOG</h3>
                        </Link>
                    </div>

                    <ul>
                        <li><a href="#">REVIEW</a></li>
                        <li><a href="#">ABOUT</a></li>
                        <li><a href="#">COMMUNITY</a></li>
                    </ul>
                </div>

                <div className="footerbottom">
                    2025 TABILOG Copyright. All rights reserved.
                </div>
            </footer>
        </div>
    )
};

export default Footer;