import React, { useState, useEffect } from "react";
import "../styles/CenterPage.css";
import { useTranslation } from "react-i18next";

export default function CenterPage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("center.title");
    document.documentElement.lang = i18n.resolvedLanguage || "ja";
  }, [t, i18n.resolvedLanguage]);

  const [activeTab, setActiveTab] = useState("all"); // all, mine, write, detail
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // 초기 게시글: status는 코드값으로 저장("processing" | "answered")
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "홍길동",
      title: "로그인 아이디 변경하고 싶어요.",
      status: "answered",
      date: "2025-08-10",
      content: "로그인 아이디 변경",
      answer: "처리중입니다.",
      isMine: true,
    },
    {
      id: 2,
      name: "가길동",
      title: "패스워드 변경하고 싶어요.",
      status: "answered",
      date: "2025-08-09",
      content: "패스워드 변경",
      answer: "안내해 드렸습니다.",
      isMine: false,
    },
    {
      id: 3,
      name: "나길동",
      title: "마길동이라는 사람이 욕했습니다.",
      status: "processing",
      date: "2025-08-08",
      content: "마길동 신고",
      answer: "",
      isMine: false,
    },
    {
      id: 4,
      name: "다길동",
      title: "닉넴 변경하고 싶어요.",
      status: "processing",
      date: "2025-08-07",
      content: "닉넴 변경",
      answer: "",
      isMine: true,
    },
    {
      id: 5,
      name: "라길동",
      title: "사진 업로드가 안됩니다.",
      status: "processing",
      date: "2025-08-06",
      content: "사진 업로드 안됩니다.",
      answer: "",
      isMine: true,
    },
  ]);

  const myPosts = posts.filter((p) => p.isMine);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
    agree: false,
  });

  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert(t("center.alert.needTitle"));
    if (!formData.agree) return alert(t("center.alert.needAgree"));

    const newPost = {
      id: Date.now(),
      name: "닉넴",
      title: formData.title,
      status: "processing",
      date: new Date().toISOString().split("T")[0],
      content: formData.content,
      answer: "",
      isMine: true,
      file: formData.file || null,
    };

    setPosts((prev) => [newPost, ...prev]);
    setFormData({ title: "", content: "", file: null, agree: false });
    setActiveTab("mine");
  };

  const handleDelete = (id) => {
    if (!window.confirm(t("center.alert.confirmDelete"))) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSelectedPost(null);
    setActiveTab("mine");
  };

  return (
    <div className="center-page">
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>{t("center.title")}</h1>
      <br />
      <br />
      <hr
        style={{
          border: "1px solid #c2c0c0",
          width: "80%",
          margin: "10px auto",
        }}
      />

      <div className="tab-container">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          {t("center.tabs.all")}
        </div>
        <div
          className={`tab ${activeTab === "mine" ? "active" : ""}`}
          onClick={() => setActiveTab("mine")}
        >
          {t("center.tabs.mine")}
        </div>
      </div>

      <div className="content">
        {/* FAQ & 전체 게시글 */}
        {activeTab === "all" && (
          <>
            <h2>{t("center.faq.title")}</h2>
            <div className="faq-grid">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <div className="faq-item" key={n}>
                  <button onClick={() => toggleFaq(n)}>
                    <span style={{ color: "red", marginRight: 5 }}>Q</span>
                    {n}. {t(`center.faq.q${n}`)}
                  </button>
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: openFaq === n ? "150px" : "0",
                      padding: openFaq === n ? "10px" : "0",
                    }}
                  >
                    <p>{t(`center.faq.a${n}`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>{t("center.usersQuestions")}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t("center.table.nickname")}</th>
                  <th>{t("center.table.title")}</th>
                  <th>{t("center.table.status")}</th>
                  <th>{t("center.table.date")}</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.title}</td>
                    <td>{t(`center.status.${p.status}`)}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
                <tr style={{ textAlign: "right" }}>
                  <td colSpan={4}>
                    <button
                      className="submit-btn"
                      onClick={() => setActiveTab("write")}
                    >
                      {t("center.btn.consult")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* 내 게시글 */}
        {activeTab === "mine" && (
          <>
            <h2>{t("center.tabs.mine")}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t("center.table.title")}</th>
                  <th>{t("center.table.status")}</th>
                  <th>{t("center.table.date")}</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((p) => (
                  <tr
                    key={p.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPost(p);
                      setActiveTab("detail");
                    }}
                  >
                    <td>{p.title}</td>
                    <td>{t(`center.status.${p.status}`)}</td>
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
            <div
              className="header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2>{selectedPost.title}</h2>
              <span>{selectedPost.date}</span>
            </div>
            <div
              className="content-area"
              style={{ display: "flex", gap: "20px", marginTop: "20px" }}
            >
              <div style={{ flex: 1 }}>
                <h3>{t("center.detail.content")}</h3>
                <p>{selectedPost.content}</p>
              </div>
              <div style={{ flex: 1 }}>
                <h3>{t("center.detail.answer")}</h3>
                <p>{selectedPost.answer || t("center.detail.noAnswer")}</p>
              </div>
            </div>

            {selectedPost.file && (
              <div style={{ marginTop: 12 }}>
                <strong>{t("center.detail.attach")}:</strong>{" "}
                {selectedPost.file.name || t("center.detail.file")}
              </div>
            )}

            <div
              className="actions"
              style={{ marginTop: "20px", display: "flex", gap: "10px" }}
            >
              <button
                className="submit-btn"
                onClick={() => setActiveTab("mine")}
              >
                {t("center.btn.back")}
              </button>
              <button
                className="submit-btn"
                onClick={() => setActiveTab("write")}
              >
                {t("center.btn.edit")}
              </button>
              <button
                className="submit-btn"
                onClick={() => handleDelete(selectedPost.id)}
              >
                {t("center.btn.delete")}
              </button>
            </div>
          </div>
        )}

        {/* 1:1 작성폼 */}
        {activeTab === "write" && (
          <>
            <h2>{t("center.write.title")}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t("center.write.phTitle")}
                />
              </div>
              <div className="form-group">
                <div className="textarea-wrapper">
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder={t("center.write.phContent")}
                  />
                  <div className="bottom-actions">
                    <input
                      type="file"
                      name="file"
                      onChange={handleInputChange}
                    />
                    <div className="actions-inline">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="agree">{t("center.write.agree")}</label>
                      <button type="submit" className="submit-btn">
                        {t("center.btn.write")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div id="submitted-posts">
              <ul>
                {posts
                  .filter((p) => p.isMine)
                  .slice(0, 5)
                  .map((p) => (
                    <li key={p.id}>
                      {p.title}
                      {p.file ? ` - ${p.file.name}` : ""}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
