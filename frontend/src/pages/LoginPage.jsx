import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/users";
import "../styles/LoginPage.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.loginId.trim() || !form.password) return;

    try {
      setLoading(true);
      const me = await login(form.loginId.trim(), form.password);

      // ✅ 반드시 서버에서 id 포함
      // { id: 1, loginId: 'asdf', nickname: '땃쥐', mbtiName: 'ISFP', mbtiUrl: '/MbtiProfileImg/ISFP.png' }
      localStorage.setItem("tabilog.user", JSON.stringify(me));
      console.log("로그인 저장:", localStorage.getItem("tabilog.user"));

      // 전역 이벤트 발송 (선택)
      window.dispatchEvent(
        new CustomEvent("tabilog:user-updated", { detail: me })
      );

      navigate("/mainpage");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "아이디/비밀번호를 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <br />
      <br />
      <h1 className="login-title">로그인</h1>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <fieldset className="login-fieldset">
          <legend className="login-legend"></legend>
          <table className="login-table">
            <tbody>
              <tr>
                <td className="login-label">
                  <label htmlFor="loginId">아이디</label>
                </td>
                <td className="login-field">
                  <input
                    id="loginId"
                    type="text"
                    name="loginId"
                    required
                    className="login-input"
                    value={form.loginId}
                    onChange={onChange}
                    autoComplete="username"
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="login-label">
                  <label htmlFor="password">비밀번호</label>
                </td>
                <td className="login-field">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    className="login-input"
                    value={form.password}
                    onChange={onChange}
                    autoComplete="current-password"
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="login-actions" colSpan={2}>
                  <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                  >
                    {loading ? "로그인 중..." : "로그인"}
                  </button>
                  <button
                    type="button"
                    className="signin-button"
                    onClick={() => navigate("/regpage")}
                  >
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
