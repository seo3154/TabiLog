import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";
import places from "../assets/data/places.json";
import "../styles/RecommendPage.css";

const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

// 47개 도도부현(한국어 표기)
const PREFECTURES = [
  "홋카이도",
  "아오모리현",
  "이와테현",
  "미야기현",
  "아키타현",
  "야마가타현",
  "후쿠시마현",
  "이바라키현",
  "도치기현",
  "군마현",
  "사이타마현",
  "치바현",
  "도쿄도",
  "가나가와현",
  "니가타현",
  "도야마현",
  "이시카와현",
  "후쿠이현",
  "시즈오카현",
  "야마나시현",
  "나가노현",
  "기후현",
  "아이치현",
  "미에현",
  "시가현",
  "교토부",
  "오사카부",
  "효고현",
  "나라현",
  "와카야마현",
  "돗토리현",
  "시마네현",
  "오카야마현",
  "히로시마현",
  "야마구치현",
  "도쿠시마현",
  "카가와현",
  "에히메현",
  "고치현",
  "후쿠오카현",
  "사가현",
  "나가사키현",
  "구마모토현",
  "오이타현",
  "미야자키현",
  "가고시마현",
  "오키나와현",
];

export default function RecommendPage() {
  const { mbti: mbtiFromUrl } = useParams();

  const [userMbti, setUserMbti] = useState(() => {
    try {
      const me = JSON.parse(localStorage.getItem("tabilog.user") || "{}");
      return (me?.mbtiName || "").toUpperCase();
    } catch {
      return "";
    }
  });

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
    ? "URL 지정"
    : userMbti
    ? "내 MBTI"
    : "임시(INFP)";

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
    const name = `${p?.name_ko || ""} ${p?.name_jp || ""}`.trim();
    const intro = `${p?.intro?.summary || ""} ${p?.intro?.detail || ""}`.trim();
    const extra = `${p?.extraintro?.summary || ""} ${
      p?.extraintro?.detail || ""
    }`.trim();
    return { name, content: `${intro} ${extra}`.trim() };
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
  }, [query, mode, searchTarget]);

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

  return (
    <main className="recommend-page-main">
      <br />
      <br />
      <h1 align="center">
        {TARGET_MBTI} 추천 여행지{" "}
        <span className="recommend-mbti-chip" title="MBTI 출처">
          {mbtiSource}
        </span>{" "}
      </h1>
      <br />
      <br />

      {/* 지정 MBTI 카드 */}
      {mbtiList.length === 0 ? (
        <p>해당 MBTI에 맞는 추천 여행지가 없습니다.</p>
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
                  alt={p.name_ko}
                  className="recommend-page-img"
                />
                <div className="recommend-page-article-div">
                  <div className="recommend-page-name">{p.name_ko}</div>
                  <div className="recommend-page-prefecture">
                    {p.prefecture}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* ===== 검색 섹션 ===== */}
      <section className="recommend-search">
        <h2 className="recommend-search-title">검색</h2>

        <div className="recommend-search-bar">
          {/* 검색어 */}
          <input
            type="text"
            className="recommend-search-input"
            placeholder="검색어를 입력하세요 (예: 미야지마, 벚꽃, 온천...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="검색어"
          />

          {/* 드롭다운: 검색 모드 */}
          <label className="recommend-select-wrap" aria-label="검색 모드 선택">
            <select
              className="recommend-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="name">관광지명</option>
              <option value="name+content">관광지명 + 내용</option>
            </select>
          </label>

          {/* 라디오: 검색 범위 */}
          <div
            className="recommend-scope-radios"
            role="radiogroup"
            aria-label="검색 범위"
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
              전체 목록
            </label>
          </div>
        </div>

        {/* 검색 결과 */}
        {query.trim() && (
          <div className="recommend-search-result">
            <div className="recommend-search-count">
              검색 결과: <b>{results.length}</b>건
              <span className="recommend-search-scope-chip">
                {scope === "all" ? "전체 목록" : `${TARGET_MBTI} 내`}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="recommend-search-empty">
                검색 결과가 없습니다.
              </div>
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
                        alt={p.name_ko}
                        className="recommend-page-img"
                      />
                      <div className="recommend-page-article-div">
                        <div className="recommend-page-name">{p.name_ko}</div>
                        <div className="recommend-page-prefecture">
                          {p.prefecture}
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
        <h2 className="recommend-search-title">지역으로 찾기</h2>

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
              ? `선택: ${selectedPrefs.join(", ")}`
              : "선택된 지역 없음"}
          </div>

          <div className="pref-action-buttons">
            <button
              type="button"
              className="pref-clear"
              onClick={clearPrefs}
              disabled={selectedPrefs.length === 0}
              title="지역 선택 해제"
            >
              전체 해제
            </button>
          </div>
        </div>

        {/* 지역 결과 (MBTI/검색 무시) */}
        {selectedPrefs.length > 0 && (
          <div ref={regionResultRef} className="recommend-search-result">
            <div className="recommend-search-count">
              지역 결과: <b>{regionResults.length}</b>건
            </div>

            {regionResults.length === 0 ? (
              <div className="recommend-search-empty">
                해당 지역의 등록된 관광지가 없습니다.
              </div>
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
                        alt={p.name_ko}
                        className="recommend-page-img"
                      />
                      <div className="recommend-page-article-div">
                        <div className="recommend-page-name">{p.name_ko}</div>
                        <div className="recommend-page-prefecture">
                          {p.prefecture}
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
