import React from "react";
import '../styles/SideBar.css'

const SideBar = () => {
    return(
        <nav className="side_bar">
            <ul>
                <li>
                    <a href="#">회원 정보</a>
                </li>

                <li>
                    <a href="#">신고 접수</a>
                </li>

                <li>
                    <a href="#">회원 통계</a>
                </li>
            </ul>
        </nav>
    )
}

export default SideBar;