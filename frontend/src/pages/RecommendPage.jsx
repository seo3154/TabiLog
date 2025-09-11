import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import places from "../assets/data/places.json";
import "../styles/RecommendPage.css";

const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

export default function RecommendPage() {
  const { t, i18n } = useTranslation(["translation", "places"]);
  const { mbti: mbtiFromUrl } = useParams();

  const [userMbti, setUserMbti] = useState(() => {
    try {
      const me = JSON.parse(localStorage.getItem("tabilog.user") || "{}");
      return (me?.mbtiName || "").toUpperCase();
    } catch {
      return "";
    }
  });

  // 다국어 도도부현 목록 (안전하게 배열로 보장)
  const PREFECTURES = useMemo(() => {
    const arr = t("prefectures", {
      ns: "translation",
      returnObjects: true,
      // 키가 비어있거나 로딩 전일 때 안전하게 빈 배열
      defaultValue: [],
    });
    return Array.isArray(arr) ? arr : [];
  }, [t, i18n.resolvedLanguage]);

  useEffect(() => {
    const onUserUpdated = (e) => {
      const up = e?.detail || {};
      if (typeof up.mbtiName === "string") {
        setUserMbti(String(up.mbtiName).toUpperCase());
      }
    };
    window.addEventListener("tabilog:user-updated", onUserUpdated);
    return () =>
      window.removeEventListener("tabilog:user-updated", onUserUpdated);
  }, []);

  const TARGET_MBTI = (
    mbtiFromUrl?.toUpperCase() ||
    userMbti ||
    "INFP"
  ).toUpperCase();

  const mbtiSource = mbtiFromUrl
    ? t("recommend.mbtiSource.url")
    : userMbti
    ? t("recommend.mbtiSource.mine")
    : t("recommend.mbtiSource.temp", { mbti: "INFP" });

  const mbtiList = useMemo(
    () =>
      places.filter(
        (p) =>
          Array.isArray(p.mbti) &&
          p.mbti.some((t) => String(t).toUpperCase() === TARGET_MBTI)
      ),
    [TARGET_MBTI]
  );

  // ===== 검색 상태 =====
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("name"); // 'name' | 'name+content' (드롭다운)
  const [scope, setScope] = useState("mbti"); // 'mbti' | 'all' (라디오)

  // ===== 지역 필터 상태 (다중 선택) =====
  const [selectedPrefs, setSelectedPrefs] = useState([]); // ex) ["도쿄도","가나가와현"]
  const regionResultRef = useRef(null);

  const togglePref = (pref) => {
    setSelectedPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const clearPrefs = () => setSelectedPrefs([]);

  // 검색용 텍스트 구성
  const buildContentText = (p) => {
    const isJA = (i18n.resolvedLanguage || i18n.language || "ja").startsWith(
      "ja"
    );
    // 이름은 이미 nameT로 표시하지만, 검색에도 동일 언어 텍스트가 반영되도록 처리
    const name = isJA
      ? t(`places:${p.id}.name`, {
          defaultValue: `${p?.name_jp || p?.name_ko || ""}`,
        })
      : p?.name_ko || p?.name_jp || "";

    // 소개/추가소개는 JA 리소스가 있으면 그걸로, 없으면 KO 원본 폴백
    const introSummary = isJA
      ? t(`places:${p.id}.intro.summary`, {
          defaultValue: p?.intro?.summary || "",
        })
      : p?.intro?.summary || "";
    const introDetail = isJA
      ? t(`places:${p.id}.intro.detail`, {
          defaultValue: p?.intro?.detail || "",
        })
      : p?.intro?.detail || "";
    const extraSummary = isJA
      ? t(`places:${p.id}.extra.summary`, {
          defaultValue: p?.extraintro?.summary || "",
        })
      : p?.extraintro?.summary || "";
    const extraDetail = isJA
      ? t(`places:${p.id}.extra.detail`, {
          defaultValue: p?.extraintro?.detail || "",
        })
      : p?.extraintro?.detail || "";

    const intro = `${introSummary} ${introDetail}`.trim();
    const extra = `${extraSummary} ${extraDetail}`.trim();
    return { name: name.trim(), content: `${intro} ${extra}`.trim() };
  };

  // 검색 대상: scope에 따라
  const searchTarget = scope === "all" ? places : mbtiList;

  // 검색 결과(텍스트 기반)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchTarget.filter((p) => {
      const { name, content } = buildContentText(p);
      const inName = name.toLowerCase().includes(q);
      if (mode === "name") return inName;
      const inContent = content.toLowerCase().includes(q);
      return inName || inContent;
    });
  }, [query, mode, searchTarget, i18n.resolvedLanguage]);

  // 지역 결과(다중 선택된 prefecture의 합집합, MBTI/검색 무시)
  const regionResults = useMemo(() => {
    if (selectedPrefs.length === 0) return [];
    const set = new Set(selectedPrefs);
    return places.filter((p) => set.has((p?.prefecture || "").trim()));
  }, [selectedPrefs]);

  // 지역 선택 변경 시 결과 영역으로 스크롤
  useEffect(() => {
    if (selectedPrefs.length > 0 && regionResultRef.current) {
      regionResultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedPrefs]);

  // i18n 표시 도우미
  // const nameT = (p) => t(`places.${p.id}.name`, { defaultValue: p.name_ko });
  // const prefT = (p) =>
  //   t(`places.${p.id}.prefecture`, { defaultValue: p.prefecture });
  const nameT = (p) => t(`places:${p.id}.name`, { defaultValue: p.name_ko });
  const prefT = (p) =>
    t(`places:${p.id}.prefecture`, { defaultValue: p.prefecture });

  return (
    <main className="recommend-page-main">
      <br />
      <br />
      <h1 align="center">
        {t("recommend.title", { mbti: TARGET_MBTI })}{" "}
        <span
          className="recommend-mbti-chip"
          title={t("recommend.mbtiSource.title")}
        >
          {mbtiSource}
        </span>{" "}
      </h1>
      <br />
      <br />

      {/* 지정 MBTI 카드 */}
      {mbtiList.length === 0 ? (
        <p>{t("recommend.emptyMbti")}</p>
      ) : (
        <div className="recommend-page-grid">
          {mbtiList.map((p) => (
            <Link
              key={p.id}
              to={`/place/${p.id}`}
              className="recommend-page-link"
            >
              <article className="recommend-page-article">
                <img
                  src={pub(p?.hero?.image)}
                  alt={nameT(p)}
                  className="recommend-page-img"
                />
                <div className="recommend-page-article-div">
                  <div className="recommend-page-name">{nameT(p)}</div>
                  <div className="recommend-page-prefecture">{prefT(p)}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* ===== 검색 섹션 ===== */}
      <section className="recommend-search">
        <h2 className="recommend-search-title">{t("search.title")}</h2>

        <div className="recommend-search-bar">
          {/* 검색어 */}
          <input
            type="text"
            className="recommend-search-input"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("search.aria.input")}
          />

          {/* 드롭다운: 검색 모드 */}
          <label
            className="recommend-select-wrap"
            aria-label={t("search.aria.mode")}
          >
            <select
              className="recommend-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="name">{t("search.mode.name")}</option>
              <option value="name+content">
                {t("search.mode.nameContent")}
              </option>
            </select>
          </label>

          {/* 라디오: 검색 범위 */}
          <div
            className="recommend-scope-radios"
            role="radiogroup"
            aria-label={t("search.aria.scope")}
          >
            <label className="recommend-radio">
              <input
                type="radio"
                name="scope"
                value="mbti"
                checked={scope === "mbti"}
                onChange={(e) => setScope(e.target.value)}
              />
              {TARGET_MBTI}
            </label>
            <label className="recommend-radio">
              <input
                type="radio"
                name="scope"
                value="all"
                checked={scope === "all"}
                onChange={(e) => setScope(e.target.value)}
              />
              {t("search.scope.all")}
            </label>
          </div>
        </div>

        {/* 검색 결과 */}
        {query.trim() && (
          <div className="recommend-search-result">
            <div className="recommend-search-count">
              {t("search.resultCount", { count: results.length })}
              <span className="recommend-search-scope-chip">
                {scope === "all"
                  ? t("search.scopeChip.all")
                  : t("search.scopeChip.withinMbti", { mbti: TARGET_MBTI })}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="recommend-search-empty">{t("search.empty")}</div>
            ) : (
              <div className="recommend-page-grid recommend-search-grid">
                {results.map((p) => (
                  <Link
                    key={`sr-${p.id}`}
                    to={`/place/${p.id}`}
                    className="recommend-page-link"
                  >
                    <article className="recommend-page-article">
                      <img
                        src={pub(p?.hero?.image)}
                        alt={nameT(p)}
                        className="recommend-page-img"
                      />
                      <div className="recommend-page-article-div">
                        <div className="recommend-page-name">{nameT(p)}</div>
                        <div className="recommend-page-prefecture">
                          {prefT(p)}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ===== 지역으로 찾기(다중 선택) ===== */}
      <section className="recommend-pref">
        <h2 className="recommend-search-title">{t("region.title")}</h2>

        <div className="recommend-pref-grid">
          {PREFECTURES.map((pref) => {
            const active = selectedPrefs.includes(pref);
            return (
              <button
                key={pref}
                type="button"
                className={`pref-chip ${active ? "active" : ""}`}
                onClick={() => togglePref(pref)}
                aria-pressed={active}
                title={pref}
              >
                {pref}
              </button>
            );
          })}
        </div>

        <div className="pref-actions">
          <div className="pref-selected-summary">
            {selectedPrefs.length > 0
              ? t("region.selected", { list: selectedPrefs.join(", ") })
              : t("region.none")}
          </div>

          <div className="pref-action-buttons">
            <button
              type="button"
              className="pref-clear"
              onClick={clearPrefs}
              disabled={selectedPrefs.length === 0}
              title={t("region.clear")}
            >
              {t("region.clear")}
            </button>
          </div>
        </div>

        {/* 지역 결과 (MBTI/검색 무시) */}
        {selectedPrefs.length > 0 && (
          <div ref={regionResultRef} className="recommend-search-result">
            <div className="recommend-search-count">
              {t("region.result", { count: regionResults.length })}
            </div>

            {regionResults.length === 0 ? (
              <div className="recommend-search-empty">{t("region.empty")}</div>
            ) : (
              <div className="recommend-page-grid recommend-search-grid">
                {regionResults.map((p) => (
                  <Link
                    key={`pref-${p.id}`}
                    to={`/place/${p.id}`}
                    className="recommend-page-link"
                  >
                    <article className="recommend-page-article">
                      <img
                        src={pub(p?.hero?.image)}
                        alt={nameT(p)}
                        className="recommend-page-img"
                      />
                      <div className="recommend-page-article-div">
                        <div className="recommend-page-name">{nameT(p)}</div>
                        <div className="recommend-page-prefecture">
                          {prefT(p)}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
} // end
