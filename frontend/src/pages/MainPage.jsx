// [CHANGED] useNavigate 추가
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // [NEW]

import image1 from "../assets/MainPagePictures/Group 1.jpg";
import image2 from "../assets/MainPagePictures/Group 2.jpg";
import image3 from "../assets/MainPagePictures/Group 3.jpg";
import image4 from "../assets/MainPagePictures/Group 4.jpg";
import image5 from "../assets/MainPagePictures/Group 5.jpg";
import image6 from "../assets/MainPagePictures/Group 6.jpg";
import image7 from "../assets/MainPagePictures/Group 7.jpg";
import image8 from "../assets/MainPagePictures/Group 8.jpg";
import image9 from "../assets/MainPagePictures/Group 9.jpg";
import image10 from "../assets/MainPagePictures/Group 10.jpg";
import image11 from "../assets/MainPagePictures/Group 11.jpg";
import image12 from "../assets/MainPagePictures/Group 12.jpg";
import image13 from "../assets/MainPagePictures/Group 13.jpg";
import image14 from "../assets/MainPagePictures/Group 14.jpg";
import image15 from "../assets/MainPagePictures/Group 15.jpg";
import image16 from "../assets/MainPagePictures/Group 16.jpg";

import left1 from "../assets/MainPagePictures/left1.png";
import left2 from "../assets/MainPagePictures/left2.png";
import right1 from "../assets/MainPagePictures/right1.png";
import right2 from "../assets/MainPagePictures/right2.png";

// [NEW] 텍스트 타이틀 대신 사용될 이미지(요청하신 경로)
import titleImage from "../assets/MainPagePictures/MBTINANI.png";

import "../styles/MainPage.css";
import { useTranslation } from "react-i18next"; // ✅ i18n

const sliders = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
];

const LEFT_ILLOS = [left1, left2];
const RIGHT_ILLOS = [right1, right2];

/* 그대로 유지: 스크롤을 ‘한 번이라도’ 했는지 (로드 직후엔 애니메이션 대기) */
function useHasScrolled() {
  const [has, setHas] = useState(false);
  useEffect(() => {
    const mark = () => setHas(true);
    window.addEventListener("scroll", mark, { once: true, passive: true });
    window.addEventListener("wheel", mark, { once: true, passive: true });
    window.addEventListener("touchstart", mark, { once: true });
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("wheel", mark);
      window.removeEventListener("touchstart", mark);
    };
  }, []);
  return has;
}

/** 그대로 유지: 뷰포트에 들어오면 in, 나가면 out(숨김) 되는 토글형 리빌 */
function RevealToggle({ children, side = "left", threshold = 0.35 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const hasScrolled = useHasScrolled();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasScrolled) return setInView(false);
          setInView(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasScrolled, threshold]);

  return (
    <div
      ref={ref}
      className={[
        "illo-reveal",
        side === "right" ? "from-right" : "from-left",
        inView ? "in" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // [NEW]
  const { t, i18n } = useTranslation(); // ✅ i18n

  useEffect(() => {
    // 문서 제목/언어 동기화(옵션)
    document.documentElement.lang = i18n.resolvedLanguage || "ja";
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    const tmr = setInterval(
      () => setCurrentIndex((i) => (i + 1) % sliders.length),
      5000
    );
    return () => clearInterval(tmr);
  }, []);

  // [NEW] 상·하 테두리 위에서 등장할 이미지들(상단/하단 배치)
  const topLeft = LEFT_ILLOS[0];
  const bottomLeft = LEFT_ILLOS[1] || LEFT_ILLOS[0];
  const topRight = RIGHT_ILLOS[0];
  const bottomRight = RIGHT_ILLOS[1] || RIGHT_ILLOS[0];

  return (
    <div className="home-body">
      {/* 이미지 슬라이더 (상단 잘림 ↓ 최소화) */}
      <div className="image-slider-container">
        {sliders.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={t("main.sliderAlt", { index: index + 1 })} // ✅ 번역
            style={{
              opacity: index === currentIndex ? 1 : 0,
              objectPosition: "50% 0%", // 윗부분 우선 노출
            }}
            loading="eager"
          />
        ))}
      </div>

      {/* 본문 영역 */}
      <div className="main-content">
        {/* [CHANGED] 기존 H1 텍스트 제거, 이미지 타이틀로 교체 */}
        <div className="title-image-wrap">
          {" "}
          {/* [NEW] */}
          <img
            src={titleImage} // [NEW]
            alt={t("main.heroImageAlt")} // ✅ 번역
            className="title-image" // [NEW]
            loading="eager"
          />
        </div>

        {/* 풀-블리드 하얀 직사각형 밴드 */}
        <section className="tabi-band">
          <div className="band-bg" />

          {/* 상·하 테두리 위에서 움직일 일러스트 레일 */}
          <div className="band-rails">
            <div className="band-rail top left">
              <RevealToggle side="left">
                <img src={topLeft} alt="left top" className="edge-illo" />
              </RevealToggle>
            </div>
            <div className="band-rail top right">
              <RevealToggle side="right">
                <img src={topRight} alt="right top" className="edge-illo" />
              </RevealToggle>
            </div>

            <div className="band-rail bottom left">
              <RevealToggle side="left">
                <img src={bottomLeft} alt="left bottom" className="edge-illo" />
              </RevealToggle>
            </div>
            <div className="band-rail bottom right">
              <RevealToggle side="right">
                <img
                  src={bottomRight}
                  alt="right bottom"
                  className="edge-illo"
                />
              </RevealToggle>
            </div>
          </div>

          {/* 설명 + CTA */}
          <div className="band-content">
            <h1 className="band-title">{t("main.band.title")}</h1>
            <br />
            <div className="band-desc">
              <p>{t("main.band.p1")}</p>
              <p>{t("main.band.p2")}</p>
              <p>{t("main.band.p3")}</p>
            </div>

            <br />
            <br />

            <button
              type="button"
              className="cta-join"
              onClick={() => navigate("/regpage")}
              aria-label={t("main.band.ctaAria")}
            >
              {t("main.band.cta")}
              <span aria-hidden="true" className="cta-arrow">
                →
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
