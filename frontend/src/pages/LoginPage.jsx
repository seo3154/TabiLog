import React, { useState } from "react";
import axios from "axios";
import "../style/LoginPage.css";

export default function Login({ navigate }) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 form 제출 막기
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        userid,
        password,
      });

      if (res.data && res.data.userid) {
        localStorage.setItem("userid", res.data.userid); // ✅ 로그인 성공 시 저장
        alert("로그인 성공!");
        window.location.href = "/community"; // 로그인 후 이동
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("로그인 실패", err);
      alert("로그인 실패. 서버 확인 필요!");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>로그인</h1>
      <form onSubmit={handleLogin}>
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
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
