import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import "../styles/Button.css";
import logo from "../assets/logo.png";
import Button from "../components/Button.jsx";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next"; // ✅ 추가

function readMe() {
  try {
    const raw = window.localStorage.getItem("tabilog.user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const Header = () => {
  const navigate = useNavigate();
  const [me, setMe] = useState(() => readMe());
  const { t } = useTranslation(); // ✅ 추가

  useEffect(() => {
    const onUpdate = (e) => {
      const latest = readMe();
      setMe(latest ? { ...latest, ...(e.detail || {}) } : e.detail || null);
    };
    const onStorage = (e) => {
      if (e.key === "tabilog.user") setMe(readMe());
    };
    window.addEventListener("tabilog:user-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("tabilog:user-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const avatar = useMemo(() => {
    const mbti = me?.mbtiName ? String(me.mbtiName).toUpperCase() : null;
    return mbti ? `${process.env.PUBLIC_URL}/MbtiProfileImg/${mbti}.png` : logo;
  }, [me?.mbtiName]);

  const loginpage = () => navigate("/login");
  const regpage = () => navigate("/regpage");
  const mypage = () => navigate("/mypage");

  const logout = () => {
    try {
      window.localStorage.removeItem("tabilog.user");
      window.dispatchEvent(
        new CustomEvent("tabilog:user-updated", { detail: null })
      );
      navigate("/");
    } catch (e) {
      console.error(e);
      alert(t("header.logoutError")); // ✅ 번역
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={avatar} alt={t("header.profileOrLogoAlt")} />{" "}
          {/* ✅ 번역 */}
          <h2>TABILOG</h2>
        </Link>
      </div>

      <ul className="menu">
        <li>
          <Link to="/notice">{t("header.notice")}</Link> {/* ✅ 번역 */}
        </li>
        <li>
          <Link to="/recommend">{t("header.recommendBoard")}</Link>{" "}
          {/* ✅ 번역 */}
        </li>
        <li>
          <Link to="/community">{t("header.community")}</Link> {/* ✅ 번역 */}
        </li>
        <li>
          <Link to="/contact">{t("header.center")}</Link> {/* ✅ 번역 */}
        </li>
        {/* <LanguageSwitcher /> */}
        <li>
          {!me ? (
            <>
              <Button variant="white" onClick={loginpage}>
                {t("header.login")} {/* ✅ 번역 */}
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="black" onClick={regpage}>
                {t("header.signup")} {/* ✅ 번역 */}
              </Button>
            </>
          ) : (
            <>
              <Button variant="white" onClick={mypage}>
                {t("header.mypage")} {/* ✅ 번역 */}
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="black" onClick={logout}>
                {t("header.logout")} {/* ✅ 번역 */}
              </Button>
            </>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
