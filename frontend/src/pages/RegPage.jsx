import React, { useState } from "react";
import axios from "axios";
import "../style/RegPage.css"

export default function Signup() {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    nickname: "",
    birth: "",
    phone: "",
    email: "",
    gender: "",
    agree: false,
  });
  const [available, setAvailable] = useState(null); // 아이디 중복 확인 결과

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const checkDuplicate = async () => {
    if (!formData.userid) return alert("ID를 입력하세요");
    try {
      const res = await axios.post("http://localhost:3001/check-id", { userid: formData.userid });
      setAvailable(res.data.available);
    } catch (err) {
      alert("서버 오류");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) return alert("회원가입 개인정보에 동의합니다.");
    console.log("회원가입 데이터:", formData);
    alert("회원가입 데이터가 콘솔에 출력합니다.");
    // Axios로 서버 전송 가능
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
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    name="userid"
                    required
                    value={formData.userid}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <button type="button" onClick={checkDuplicate}>중복</button>
                  {available === true && <span style={{color:'green'}}>사용가능</span>}
                  {available === false && <span style={{color:'red'}}>사용 중인 아이디입니다.</span>}
                </td>
              </tr>
              <tr>
                <td>PASSWORD</td>
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
                <td>NICKNAME</td>
                <td>
                  <input
                    type="text"
                    name="nickname"
                    required
                    value={formData.nickname}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <button type="button" onClick={checkDuplicate}>중복</button>
                  {available === true && <span style={{color:'green'}}>사용가능</span>}
                  {available === false && <span style={{color:'red'}}>사용 중인 닉네임입니다.</span>}
                </td>
              </tr>
              <tr>
                <td>BIRTH</td>
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
                <td>PHONE</td>
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
                <td>EMAIL</td>
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
                <td>GENDER</td>
                <td>
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="남자"
                      required
                      checked={formData.gender === "남자"}
                      onChange={handleChange}
                      style={radioStyle}
                    /> 남자
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="여자"
                      required
                      checked={formData.gender === "여자"}
                      onChange={handleChange}
                      style={radioStyle}
                    /> 여자
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                    />
                    회원가입 개인 정보에 동의합니다.
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", paddingTop: "10px" }}>
                  <input type="submit" value="회원 가입" style={submitStyle} />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}

// 스타일 그대로 유지
const fieldsetStyle = { width: "300px", margin: "auto", borderRadius: "10px", padding: "20px" };
const inputStyle = { borderRadius: "5px", border: "1px solid #ccc", padding: "5px", width: "95%" };
const radioStyle = { width: "18px", height: "18px", border: "2px solid #888", borderRadius: "50%", outline: "none", cursor: "pointer", position: "relative" };
const submitStyle = { borderRadius: "5px", padding: "5px 10px", border: "1px solid #888", backgroundColor: "#f5f5f5", cursor: "pointer" };
