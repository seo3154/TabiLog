import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  register,
} from "../apis/users";
import { useNavigate } from "react-router-dom";

import MbtiModify from "../components/MbtiModify";
import "../styles/RegPage.css";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t("auth.signup.title");
    document.documentElement.lang = i18n.resolvedLanguage || "ja";
  }, [t, i18n.resolvedLanguage]);

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    name: "",
    nickname: "",
    gender: "",
    email: "",
    tel: "",
    birth: "",
    introText: "",
    agree: false,
    mbtiName: "",
  });

  const [showEditMbti, setShowEditMbti] = useState(false);

  // 중복 체크 결과
  const [availableId, setAvailableId] = useState(null); // true | false | null
  const [availableNick, setAvailableNick] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "loginId") setAvailableId(null);
    if (name === "nickname") setAvailableNick(null);
  };

  // MBTI 저장
  const handleSaveMbti = (newMbti) => {
    const upper = (newMbti || "").toUpperCase();
    setFormData((prev) => ({ ...prev, mbtiName: upper }));
    setShowEditMbti(false);
  };

  // 필드별 중복 체크
  const checkDuplicate = async (field) => {
    try {
      if (field === "loginId") {
        if (!formData.loginId.trim()) return alert(t("auth.signup.needId"));
        const available = await checkIdDuplicate(formData.loginId.trim());
        setAvailableId(available);
      } else if (field === "nickname") {
        if (!formData.nickname.trim()) return alert(t("auth.signup.needNick"));
        const available = await checkNicknameDuplicate(
          formData.nickname.trim()
        );
        setAvailableNick(available);
      }
    } catch (err) {
      console.error(err);
      alert(t("auth.signup.serverDupFail"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) return alert(t("auth.signup.needAgree"));
    if (availableId === false) return alert(t("auth.signup.idInUse"));
    if (availableNick === false) return alert(t("auth.signup.nickInUse"));

    const payload = {
      loginId: formData.loginId.trim(),
      password: formData.password,
      name: formData.name.trim(),
      nickname: formData.nickname.trim(),
      gender: Number(formData.gender),
      email: formData.email.trim(),
      tel: formData.tel.trim(),
      birth: formData.birth?.trim() || "",
      introText: formData.introText?.trim() || "",
      mbtiName: formData.mbtiName || null,
    };

    try {
      await register(payload);
      alert(t("auth.signup.success"));
      navigate("/mainpage");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message;
      alert(t("auth.error.signup", { msg }));
    }
  };

  return (
    <div className="signup-container">
      <br />
      <br />
      <h1>{t("auth.signup.title")}</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <fieldset className="signup-fieldset">
          <legend className="signup-legend"></legend>
          <table className="signup-table">
            <tbody>
              <tr>
                <td>{t("auth.fields.id")}</td>
                <td>
                  <input
                    type="text"
                    name="loginId"
                    required
                    value={formData.loginId}
                    onChange={handleChange}
                    className="signup-input"
                    aria-label={t("auth.fields.id")}
                  />
                  <button
                    type="button"
                    className="signup-duplicate-btn"
                    onClick={() => checkDuplicate("loginId")}
                  >
                    {t("auth.signup.dupCheck")}
                  </button>
                  {availableId === true && (
                    <span style={{ color: "green", marginLeft: 8 }}>
                      {t("auth.signup.available")}
                    </span>
                  )}
                  {availableId === false && (
                    <span style={{ color: "red", marginLeft: 8 }}>
                      {t("auth.signup.idInUse")}
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
                    aria-label={t("auth.fields.password")}
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
                    aria-label={t("auth.fields.name")}
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
                    aria-label={t("auth.fields.nickname")}
                  />
                  <button
                    type="button"
                    className="signup-duplicate-btn"
                    onClick={() => checkDuplicate("nickname")}
                  >
                    {t("auth.signup.dupCheck")}
                  </button>
                  {availableNick === true && (
                    <span style={{ color: "green", marginLeft: 8 }}>
                      {t("auth.signup.available")}
                    </span>
                  )}
                  {availableNick === false && (
                    <span style={{ color: "red", marginLeft: 8 }}>
                      {t("auth.signup.nickInUse")}
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
                    value={formData.birth || ""}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder={t("auth.placeholder.birth")}
                    aria-label={t("auth.fields.birth")}
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
                    placeholder={t("auth.placeholder.phone")}
                    aria-label={t("auth.fields.phone")}
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
                    placeholder={t("auth.placeholder.email")}
                    aria-label={t("auth.fields.email")}
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
                    {t("auth.fields.male")}
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
                    {t("auth.fields.female")}
                  </label>
                </td>
              </tr>

              <br />

              {/* MBTI 선택 섹션 */}
              <tr>
                <td>{t("auth.fields.mbti")}</td>
                <td style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => setShowEditMbti(true)}
                  >
                    {t("auth.fields.mbtiEdit")}
                  </button>
                  <span>
                    {formData.mbtiName
                      ? formData.mbtiName
                      : t("common.notSelected")}
                  </span>
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
                    {t("auth.signup.agree")}
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
                    value={t("auth.signup.submit")}
                    className="signup-submit"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>

      {/* MBTI 선택 모달 */}
      {showEditMbti && (
        <MbtiModify
          current={formData.mbtiName || ""}
          onClose={() => setShowEditMbti(false)}
          onSave={handleSaveMbti}
        />
      )}
    </div>
  );
}
