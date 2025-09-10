import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Notice.css";
import Button from "../../components/Button.jsx";
import { useTranslation } from "react-i18next";

function NoticeList({ notices }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  // 1) 제목 검색어로 필터링 (대소문자 무시)
  const filteredNotices = notices.filter((notice) =>
    (notice.title || "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 2) 날짜 내림차순 정렬
  const sortedNotices = [...filteredNotices].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 3) 페이지네이션
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = sortedNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  // 4) 총 페이지 수
  const totalPages = Math.ceil(sortedNotices.length / noticesPerPage);

  // 5) 페이지 번호
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="notice-list-container">
      <br />
      <br />
      <h1>{t("notice.list.title", { defaultValue: "공지사항" })}</h1>
      <br />
      <br />

      {/* 검색창 */}
      <div className="search-box">
        <input
          type="text"
          placeholder={t("notice.list.searchPH", {
            defaultValue: "검색어를 입력하세요",
          })}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // 검색어 변경 시 1페이지로
          }}
          aria-label={t("notice.list.searchLabel", { defaultValue: "검색" })}
        />
        <button
          aria-label={t("notice.list.searchBtn", { defaultValue: "검색" })}
        >
          🔍
        </button>
      </div>

      {/* 공지사항 테이블 */}
      <table
        className="notice-table"
        aria-label={t("notice.table.label", { defaultValue: "공지 목록" })}
      >
        <thead>
          <tr>
            <th>{t("notice.table.no", { defaultValue: "번호" })}</th>
            <th>{t("notice.table.title", { defaultValue: "제목" })}</th>
            <th>{t("notice.table.writer", { defaultValue: "작성자" })}</th>
            <th>{t("notice.table.date", { defaultValue: "작성일" })}</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                {t("notice.list.empty", {
                  defaultValue: "공지사항이 없습니다.",
                })}
              </td>
            </tr>
          ) : (
            currentNotices.map((notice, index) => (
              <tr key={notice.id}>
                <td>{sortedNotices.length - (indexOfFirstNotice + index)}</td>
                <td className="title-cell">
                  <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                </td>
                <td>{notice.writer}</td>
                <td>{notice.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 글쓰기 버튼 */}
      <div style={{ textAlign: "right" }}>
        <br />
        <Link to="/notice/write" className="btn">
          <Button variant="white">
            {t("notice.list.writeBtn", { defaultValue: "글쓰기" })}
          </Button>
        </Link>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination" style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label={t("common.prev", { defaultValue: "이전" })}
        >
          {"<"}
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={num === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(num)}
            aria-current={num === currentPage ? "page" : undefined}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label={t("common.next", { defaultValue: "다음" })}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default NoticeList;
