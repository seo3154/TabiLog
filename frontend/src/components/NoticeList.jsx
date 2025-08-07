import { Link } from "react-router-dom";

function NoticeList({ notices }) {
  return (
    <div>
      <h2>공지사항 목록</h2>
      <table
        border="2"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "1000px", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            notices.map((notice, index) => (
              <tr key={notice.id}>
                <td>{index + 1}</td>
                <td>
                  {/* 경로를 /notice/:id로 맞춰야 함 */}
                  <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                </td>
                <td>{notice.writer}</td>
                <td>{notice.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        {/* 경로를 /notice/write로 맞춰야 함 */}
        <Link to="/notice/write">
          <button>글쓰기</button>
        </Link>
      </div>
    </div>
  );
}

export default NoticeList;
