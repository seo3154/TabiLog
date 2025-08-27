import React, { useState } from "react";
<<<<<<< Updated upstream
import "../style/CenterPage.css"
=======
import "./style/CenterPage.css";
>>>>>>> Stashed changes

export default function CenterPage() {
  const [activeTab, setActiveTab] = useState("all"); // all, mine, write, detail
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const [submittedPosts, setSubmittedPosts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
    agree: false,
  });

  const faqs = [
    { question: "혼자여도 괜찮습니까?", answer: "혼자 여행하는 사람이 많으니까 괜찮아요." },
    { question: "저는 50대가 넘었습니다.", answer: "여행에는 나이는 상관없습니다." },
    { question: "여행이 처음인데 걱정이 됩니다.", answer: "이런 분은 커뮤니티에 물어보시면 됩니다." },
    { question: "얘기하는 것이 두렵습니다.", answer: "모두가 상냥하므로 괜찮습니다." },
    { question: "I don't know Korean.", answer: "It's OK. I don't know English." },
    { question: "여행 이외에도 얘기해도 됩니까?", answer: "상관없습니다." },
    { question: "여기 사원이 되고 싶습니다.", answer: "채용공지가 올라오면 확인하세요." },
    { question: "어째서 여행에 대해서 얘기를 하는 겁니까?", answer: "여행은 즐거운 것이니까요." },
    { question: "안 좋은 얘기를 쓴 글을 봤어요.", answer: "신고해주십시오." },
    { question: "탈퇴하고 싶습니다.", answer: "탈퇴 이유를 들어보겠습니다." },
  ];

  const allPosts = [
    { id: 1, name: "홍길동", title: "로그인 아이디 변경하고 싶어요.", status: "응답완료", date: "2025-08-10", content: "로그인 아이디 변경", answer: "처리중입니다.", isMine: true },
    { id: 2, name: "가길동", title: "패스워드 변경하고 싶어요.", status: "응답완료", date: "2025-08-09", content: "패스워드 변경", answer: "안내해 드렸습니다.", isMine: false },
    { id: 3, name: "나길동", title: "마길동이라는 사람이 욕했습니다.", status: "처리중", date: "2025-08-08", content: "마길동 신고", answer: "", isMine: false },
    { id: 4, name: "다길동", title: "닉넴 변경하고 싶어요.", status: "처리중", date: "2025-08-07", content: "닉넴 변경", answer: "", isMine: true },
    { id: 5, name: "라길동", title: "사진 업로드가 안됩니다.", status: "처리중", date: "2025-08-06", content: "사진 업로드 안됩니다.", answer: "", isMine: true },
  ];

  const myPosts = allPosts.filter((p) => p.isMine);

  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("타이틀 입력");
    const newPost = {
      id: Date.now(),
      name: "닉넴",
      title: formData.title,
      status: "처리중",
      date: new Date().toISOString().split("T")[0],
      content: formData.content,
      answer: "",
      isMine: true,
    };
    setSubmittedPosts([newPost, ...submittedPosts]);
    setFormData({ title: "", content: "", file: null, agree: false });
    setActiveTab("mine");
  };

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제합니까?")) return;
    const filteredPosts = myPosts.filter((p) => p.id !== id);
    // 실제 삭제 로직 연결 가능
    alert("삭제 완료 (임시)");
    setSelectedPost(null);
    setActiveTab("mine");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>고객센터</h1>
      <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />

      <div className="tab-container">
        <div className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>모든 게시글</div>
        <div className={`tab ${activeTab === "mine" ? "active" : ""}`} onClick={() => setActiveTab("mine")}>내 글</div>
      </div>

      <div className="content">
        {/* FAQ & 전체 게시글 */}
        {activeTab === "all" && (
          <>
            <h2>항상 있는 질문(FAQ)</h2>
            <div className="faq-grid">
              {faqs.map((faq, idx) => (
                <div className="faq-item" key={idx}>
                  <button onClick={() => toggleFaq(idx)}>
                    <span style={{ color: "red", marginRight: 5 }}>Q</span>
                    {idx + 1}. {faq.question}
                  </button>
                  <div className="faq-answer" style={{ maxHeight: openFaq === idx ? "150px" : "0", padding: openFaq === idx ? "10px" : "0" }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>유저의 질문들</h2>
            <table>
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>제목</th>
                  <th>답변상태</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {allPosts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
                <tr style={{ textAlign: "right" }}>
                  <td colSpan={4}>
                    <button className="submit-btn" onClick={() => setActiveTab("write")}>1:1 상담하기</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* 내 게시글 */}
        {activeTab === "mine" && (
          <>
            <h2>내 글</h2>
            <table>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>답변상태</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((p) => (
                  <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => { setSelectedPost(p); setActiveTab("detail"); }}>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* 상세보기 */}
        {activeTab === "detail" && selectedPost && (
          <div className="post-detail">
            <div className="header" style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>{selectedPost.title}</h2>
              <span>{selectedPost.date}</span>
            </div>
            <div className="content-area" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <div style={{ flex: 1 }}>
                <h3>내용</h3>
                <p>{selectedPost.content}</p>
              </div>
              <div style={{ flex: 1 }}>
                <h3>회답</h3>
                <p>{selectedPost.answer || "아직 회답이 없습니다."}</p>
              </div>
            </div>
            <div className="actions" style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button className="submit-btn" onClick={() => setActiveTab("mine")}>돌아가기</button>
              <button className="submit-btn" onClick={() => setActiveTab("write")}>수정</button>
              <button className="submit-btn" onClick={() => handleDelete(selectedPost.id)}>삭제</button>
            </div>
          </div>
        )}

        {/* 1:1 작성폼 */}
        {activeTab === "write" && (
          <>
            <h2>1:1 상담</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="타이틀 입력" />
              </div>
              <div className="form-group">
                <div className="textarea-wrapper">
                  <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="내용 입력"></textarea>
                  <div className="bottom-actions">
                    <input type="file" name="file" onChange={handleInputChange} />
                    <div className="actions-inline">
                      <input type="checkbox" name="agree" checked={formData.agree} onChange={handleInputChange} />
                      <label htmlFor="agree">개인 정보에 동의합니다.</label>
                      <button type="submit" className="submit-btn">작성하기</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div id="submitted-posts">
              <ul>
                {submittedPosts.map((p) => (
                  <li key={p.id}>{p.title}{p.file ? ` - ${p.file.name}` : ""}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
