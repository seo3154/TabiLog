import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 로그인 POST 요청 (axios/fetch)
  };

  return (
    <div className="login-container">
      <br/><br/>
      <h1 className="login-title">로그인</h1>
      <br/><br/>

      <form onSubmit={handleSubmit}>
        <fieldset className="login-fieldset">
          <legend className="login-legend"></legend>

          <table className="login-table">
            <tbody>
              <tr>
                <td className="login-label"><label htmlFor="userid">아이디</label></td>
                <td className="login-field">
                  <input id="userid" type="text" name="userid" required className="login-input" />
                </td>
              </tr>

              <br/>

              <tr>
                <td className="login-label"><label htmlFor="password">비밀번호</label></td>
                <td className="login-field">
                  <input id="password" type="password" name="password" required className="login-input" />
                </td>
              </tr>

              <br/>

              <tr>
                
                <td className="login-actions">
                  <button type="submit" className="login-button">로그인</button>
            
                  <button type="button" className="signin-button" onClick={() => navigate("/regpage")}>
                    회원가입
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}
