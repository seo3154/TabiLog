import React, { useState } from "react";
import axios from "axios";

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
    if (!formData.userid) return alert("IDを入力してください");
    try {
      const res = await axios.post("http://localhost:3001/check-id", { userid: formData.userid });
      setAvailable(res.data.available);
    } catch (err) {
      alert("サーバー誤謬");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) return alert("会員登録の約款に同意します。");
    console.log("会員登録データ:", formData);
    alert("会員登録データがコンソールに出力します!");
    // Axios로 서버 전송 가능
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>会員登録</h1>
      <form onSubmit={handleSubmit}>
        <fieldset style={fieldsetStyle}>
          <legend style={{ textAlign: "center" }}>会員登録</legend>
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
                  <button type="button" onClick={checkDuplicate}>重複</button>
                  {available === true && <span style={{color:'green'}}>使用可能</span>}
                  {available === false && <span style={{color:'red'}}>もう採用中</span>}
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
                      value="男"
                      required
                      checked={formData.gender === "男"}
                      onChange={handleChange}
                      style={radioStyle}
                    /> MAN
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="女"
                      required
                      checked={formData.gender === "女"}
                      onChange={handleChange}
                      style={radioStyle}
                    /> WOMAN
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
                    会員登録の約款に同意します。
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", paddingTop: "10px" }}>
                  <input type="submit" value="会員登録" style={submitStyle} />
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
const radioStyle = { appearance: "none", WebkitAppearance: "none", width: "18px", height: "18px", border: "2px solid #888", borderRadius: "50%", outline: "none", cursor: "pointer", position: "relative" };
const submitStyle = { borderRadius: "5px", padding: "5px 10px", border: "1px solid #888", backgroundColor: "#f5f5f5", cursor: "pointer" };
