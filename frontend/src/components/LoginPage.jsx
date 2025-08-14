import React from "react";
import "./Login.css"; // CSS 따로 분리 가능

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
                  <input type="text" name="userid" />
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input type="password" name="password" />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <input
                    type="button"
                    value="회원가입"
                    onClick={() => (window.location.href = "signup.html")}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input type="submit" value="로그인" />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}
