import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    nickname: "",
    birth: "",
    phone: "",
    email: "",
    gender: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    console.log("회원가입 데이터:", formData);
    alert("회원가입 데이터가 콘솔에 출력됩니다!");
    // 여기서 Axios로 서버 전송 가능
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <fieldset style={fieldsetStyle}>
          <legend style={{ textAlign: "center" }}>회원가입</legend>
          <table style={{ margin: "0 auto", width: "100%" }}>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>
                  <input
                    type="text"
                    name="userid"
                    required
                    value={formData.userid}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>
                  <input
                    type="text"
                    name="nickname"
                    required
                    value={formData.nickname}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>생년월일</td>
                <td>
                  <input
                    type="text"
                    name="birth"
                    required
                    value={formData.birth}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>성별</td>
                <td>
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="여자"
                      required
                      checked={formData.gender === "여자"}
                      onChange={handleChange}
                      style={radioStyle}
                    />{" "}
                    여자
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="남자"
                      required
                      checked={formData.gender === "남자"}
                      onChange={handleChange}
                      style={radioStyle}
                    />{" "}
                    남자
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", paddingTop: "10px" }}>
                  <input type="submit" value="회원가입" style={submitStyle} />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}

// 스타일
const fieldsetStyle = {
  width: "300px",
  margin: "auto",
  borderRadius: "10px",
  padding: "20px",
};

const inputStyle = {
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "5px",
  width: "95%",
};

const radioStyle = {
  appearance: "none",
  WebkitAppearance: "none",
  width: "18px",
  height: "18px",
  border: "2px solid #888",
  borderRadius: "50%",
  outline: "none",
  cursor: "pointer",
  position: "relative",
};

const submitStyle = {
  borderRadius: "5px",
  padding: "5px 10px",
  border: "1px solid #888",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
};
