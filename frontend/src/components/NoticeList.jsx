import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Notice.css";

function NoticeList({ notices }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  // 1. 제목 검색어로 필터링 (대소문자 무시)
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. 날짜 내림차순 정렬 (최신글이 위로)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // 3. 페이지네이션 처리
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = sortedNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  // 4. 총 페이지 수 계산
  const totalPages = Math.ceil(sortedNotices.length / noticesPerPage);

  // 5. 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="notice-list-container">
      <h1>공지사항</h1>

      {/* 검색창 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // 검색어 변경시 페이지 1로 초기화
          }}
        />
        <button>🔍</button>
      </div>

      {/* 공지사항 테이블 */}
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                공지사항이 없습니다.
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
        <Link to="/notice/write" className="btn">
          글쓰기
        </Link>
        {/* 또는 현재 경로가 이미 /notice 라우트 아래라면: <Link to="write">글쓰기</Link> */}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination" style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={num === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default NoticeList;
