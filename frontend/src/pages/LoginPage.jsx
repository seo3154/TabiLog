import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/users";
import "../styles/LoginPage.css";
import { useTranslation } from "react-i18next";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("auth.login.title");
    document.documentElement.lang = i18n.resolvedLanguage || "ja";
  }, [t, i18n.resolvedLanguage]);

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

      // ✅ 로그인 성공 처리: 저장 + 전역 알림 + 이동
      localStorage.setItem("tabilog.user", JSON.stringify(me));
      window.dispatchEvent(
        new CustomEvent("tabilog:user-updated", { detail: me })
      );
      navigate("/mainpage");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || t("auth.error.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <br />
      <br />
      <h1 className="login-title">{t("auth.login.title")}</h1>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <fieldset className="login-fieldset">
          <legend className="login-legend"></legend>

          <table className="login-table">
            <tbody>
              <tr>
                <td className="login-label">
                  <label htmlFor="loginId">{t("auth.id")}</label>
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
                    placeholder={t("auth.id")}
                    aria-label={t("auth.id")}
                  />
                </td>
              </tr>

              <br />

              <tr>
                <td className="login-label">
                  <label htmlFor="password">{t("auth.password")}</label>
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
                    placeholder={t("auth.password")}
                    aria-label={t("auth.password")}
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
                    {loading ? t("auth.login.loading") : t("auth.login.submit")}
                  </button>

                  <button
                    type="button"
                    className="signin-button"
                    onClick={() => navigate("/regpage")}
                  >
                    {t("auth.signup.submit")}
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
