import React, { useState } from "react";
// import axios from "axios";
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  register,
} from "../apis/users";
import { useNavigate } from "react-router-dom";

import "../styles/RegPage.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    name: "",
    nickname: "",
    gender: "",
    email: "",
    tel: "",
    introText: "",
    agree: false,
  });

  // 중복 체크 결과를 ID/닉네임 각각 보관
  const [availableId, setAvailableId] = useState(null); // true | false | null
  const [availableNick, setAvailableNick] = useState(null); // true | false | null
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // 필드를 수정하면 해당 중복 결과 초기화
    if (name === "loginId") setAvailableId(null);
    if (name === "nickname") setAvailableNick(null);
  };

  // 필드별 중복 체크
  const checkDuplicate = async (field) => {
    try {
      if (field === "loginId") {
        if (!formData.loginId.trim()) return alert("ID를 입력하세요.");
        // 🔧 백엔드 엔드포인트에 맞춰 조정하세요 (예시)
        const available = await checkIdDuplicate(formData.loginId.trim());
        setAvailableId(available); // exists=true면 이미 존재 → 사용 불가
      } else if (field === "nickname") {
        if (!formData.nickname.trim()) return alert("닉네임을 입력하세요.");
        // 🔧 백엔드 엔드포인트에 맞춰 조정하세요 (예시)
        const available = await checkNicknameDuplicate(
          formData.nickname.trim()
        );
        setAvailableNick(available);
      }
    } catch (err) {
      console.error(err);
      alert("중복 확인 중 서버 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) return alert("회원가입 개인정보에 동의해 주세요.");
    if (availableId === false) return alert("이미 사용 중인 ID입니다.");
    if (availableNick === false) return alert("이미 사용 중인 닉네임입니다.");

    const payload = {
      loginId: formData.loginId.trim(),
      password: formData.password,
      name: formData.name.trim(),
      nickname: formData.nickname.trim(),
      gender: Number(formData.gender),
      email: formData.email.trim(),
      tel: formData.tel.trim(),
      introText: formData.introText?.trim() || "",
    };

    // TODO: 실제 회원가입 API 연동
    try {
      await register(payload);
      alert("회원가입 성공!");
      navigate("/mainpage");
    } catch (err) {
      console.error(err);
      alert(
        `회원가입 중 오류 발생: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="signup-container">
      <br />
      <br />
      <h1>회원가입</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <fieldset className="signup-fieldset">
          <legend className="signup-legend"></legend>
          <table className="signup-table">
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    name="loginId"
                    required
                    value={formData.loginId}
                    onChange={handleChange}
                    className="signup-input"
                  />
                  <button
                    type="button"
                    className="signup-duplicate-btn"
                    onClick={() => checkDuplicate("loginId")}
                  >
                    중복
                  </button>
                  {availableId === true && (
                    <span style={{ color: "green", marginLeft: 8 }}>
                      사용가능
                    </span>
                  )}
                  {availableId === false && (
                    <span style={{ color: "red", marginLeft: 8 }}>
                      사용 중인 아이디입니다.
                    </span>
                  )}
                </td>
              </tr>

              <br />

              <tr>
                <td>PASSWORD</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="signup-input"
                  />
                </td>
              </tr>

              <br />

              <tr>
                <td>NAME</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="signup-input"
                  />
                </td>
              </tr>

              <br />

              <tr>
                <td>NICKNAME</td>
                <td>
                  <input
                    type="text"
                    name="nickname"
                    required
                    value={formData.nickname}
                    onChange={handleChange}
                    className="signup-input"
                  />
                  <button
                    type="button"
                    className="signup-duplicate-btn"
                    onClick={() => checkDuplicate("nickname")}
                  >
                    중복
                  </button>
                  {availableNick === true && (
                    <span style={{ color: "green", marginLeft: 8 }}>
                      사용가능
                    </span>
                  )}
                  {availableNick === false && (
                    <span style={{ color: "red", marginLeft: 8 }}>
                      사용 중인 닉네임입니다.
                    </span>
                  )}
                </td>
              </tr>

              <br />

              <tr>
                <td>BIRTH</td>
                <td>
                  <input
                    type="text"
                    name="birth"
                    required
                    value={formData.birth}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="YYYY-MM-DD"
                  />
                </td>
              </tr>

              <br />

              <tr>
                <td>PHONE</td>
                <td>
                  <input
                    type="text"
                    name="tel"
                    required
                    value={formData.tel}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="010-1234-5678"
                  />
                </td>
              </tr>

              <br />

              <tr>
                <td>EMAIL</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="you@example.com"
                  />
                </td>
              </tr>

              <br />

              <tr>
                <td>GENDER</td>
                <td>
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="1"
                      required
                      checked={formData.gender === "1"}
                      onChange={handleChange}
                      className="signup-radio"
                    />{" "}
                    남자
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="2"
                      required
                      checked={formData.gender === "2"}
                      onChange={handleChange}
                      className="signup-radio"
                    />{" "}
                    여자
                  </label>
                </td>
              </tr>

              <br />

              <tr>
                <td colSpan="2">
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
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

              <br />

              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center", paddingTop: "10px" }}
                >
                  <input
                    type="submit"
                    value="회원 가입"
                    className="signup-submit"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}
