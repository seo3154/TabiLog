import React from 'react';
import '../styles/Button.css'; // css는 variant에 이름을 적고 css에 작성하면 됨(기본으로 black/white부분은 있음!)

const Button = ({
  children,
  onClick,
  variant = 'default',
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
