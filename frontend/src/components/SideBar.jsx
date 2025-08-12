// src/components/SideBar.jsx
import React from "react";
import "../styles/SideBar.css";

const SideBar = ({ menuItems = [] }) => {
  return (
    <nav className="side_bar">
      <ul>
        {menuItems.map((item, idx) => (
          <li key={idx}>
            {item.onClick ? (
              <button onClick={item.onClick} className="side_bar_button">
                {item.label}
              </button>
            ) : (
              <a href={item.href || "#"}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
