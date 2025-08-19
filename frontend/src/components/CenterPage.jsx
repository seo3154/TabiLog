import React, { useState } from "react";

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
    { question: "一人でも構いませんか", answer: "一人で旅行をする方は多いので、大丈夫です。" },
    { question: "私は老人ですけど。", answer: "旅行には年とは関係ないです。" },
    { question: "旅行が初めてなので心配があります。", answer: "そういう方はここの方々に聞けばいいです。" },
    { question: "話すのが怖いです。", answer: "みんな優しい方なので、大丈夫です。" },
    { question: "I don't know Japanese.", answer: "It's OK. I don't know English." },
    { question: "旅行以外でも、話してもいいですか？", answer: "構いません" },
    { question: "ここの社員になりたいです。", answer: "採用情報がアップしたら確認してください。" },
    { question: "なんで旅行について話をしますか？", answer: "旅行は楽しいものですから、みんなに共有したらいいと思います。" },
    { question: "変な話を見つけました。", answer: "申告してください。" },
    { question: "脱退したいです。", answer: "脱退の理由を聞いてみます。" },
  ];

  const allPosts = [
    { id: 1, name: "山田太郎", title: "ログインできません", status: "対応中", date: "2025-08-10", content: "ログインができない内容", answer: "対応中です", isMine: true },
    { id: 2, name: "佐藤花子", title: "パスワード再発行について", status: "完了", date: "2025-08-09", content: "パスワードを忘れた", answer: "再発行完了", isMine: false },
    { id: 3, name: "鈴木一郎", title: "会員登録方法を教えてください", status: "未対応", date: "2025-08-08", content: "会員登録方法の質問", answer: "", isMine: false },
    { id: 4, name: "高橋美咲", title: "投稿の削除依頼", status: "対応中", date: "2025-08-07", content: "投稿削除希望", answer: "", isMine: true },
    { id: 5, name: "田中健", title: "写真がアップロードできない", status: "未対応", date: "2025-08-06", content: "写真をアップできない", answer: "", isMine: true },
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
    if (!formData.title) return alert("タイトルを入力してください");
    const newPost = {
      id: Date.now(),
      name: "自分",
      title: formData.title,
      status: "未対応",
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
    if (!window.confirm("本当に削除しますか？")) return;
    const filteredPosts = myPosts.filter((p) => p.id !== id);
    // 실제 삭제 로직 연결 가능
    alert("삭제 완료 (임시)");
    setSelectedPost(null);
    setActiveTab("mine");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>顧客センター</h1>
      <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />

      <div className="tab-container">
        <div className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>全ての投稿</div>
        <div className={`tab ${activeTab === "mine" ? "active" : ""}`} onClick={() => setActiveTab("mine")}>自分の投稿</div>
      </div>

      <div className="content">
        {/* FAQ & 전체 게시글 */}
        {activeTab === "all" && (
          <>
            <h2>いつもある質問(FAQ)</h2>
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

            <h2>ユーザーのお問い合わせ</h2>
            <table>
              <thead>
                <tr>
                  <th>問い合わせ者</th>
                  <th>タイトル</th>
                  <th>状態</th>
                  <th>日付</th>
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
                    <button className="submit-btn" onClick={() => setActiveTab("write")}>1:1相談する</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* 내 게시글 */}
        {activeTab === "mine" && (
          <>
            <h2>私の投稿</h2>
            <table>
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>状態</th>
                  <th>日付</th>
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
                <h3>内容</h3>
                <p>{selectedPost.content}</p>
              </div>
              <div style={{ flex: 1 }}>
                <h3>回答</h3>
                <p>{selectedPost.answer || "まだ回答がありません。"}</p>
              </div>
            </div>
            <div className="actions" style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button className="submit-btn" onClick={() => setActiveTab("mine")}>戻る</button>
              <button className="submit-btn" onClick={() => setActiveTab("write")}>修正</button>
              <button className="submit-btn" onClick={() => handleDelete(selectedPost.id)}>削除</button>
            </div>
          </div>
        )}

        {/* 1:1 작성폼 */}
        {activeTab === "write" && (
          <>
            <h2>1:1 相談フォーム</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="タイトルを入力してください" />
              </div>
              <div className="form-group">
                <div className="textarea-wrapper">
                  <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="内容を入力してください"></textarea>
                  <div className="bottom-actions">
                    <input type="file" name="file" onChange={handleInputChange} />
                    <div className="actions-inline">
                      <input type="checkbox" name="agree" checked={formData.agree} onChange={handleInputChange} />
                      <label htmlFor="agree">個人情報に同意します</label>
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
