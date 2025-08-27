import React from "react";
import "../style/LoginPage.css";

export default function Login() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>로그인</h1>
      <form action="Login" method="get">
        <fieldset
          style={{
            width: "300px",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <legend style={{ textAlign: "center" }}>로그인</legend>
          <table style={{ margin: "0 auto", width: "100%" }}>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>
                  <input
                    type="text"
                    name="userid"
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <input
                    type="button"
                    value="회원가입"
                    onClick={() => (window.location.href = "/signup")}
                    style={buttonStyle}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input type="submit" value="로그인" style={buttonStyle} />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}

const inputStyle = {
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "5px",
  width: "95%",
};

const buttonStyle = {
  borderRadius: "5px",
  padding: "5px 10px",
  border: "1px solid #888",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
};