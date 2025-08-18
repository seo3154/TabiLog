import React, { useState, useEffect } from "react";

export default function CenterPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
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

  useEffect(() => {
    // 페이지 로드 시 전체 게시글 불러오기
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
        // 내 게시글만 필터링 (예: userId === 내 id)
        setMyPosts(data.filter((p) => p.isMine));
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("タイトルを入力してください");

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("content", formData.content);
    if (formData.file) fd.append("file", formData.file);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("投稿に失敗しました");

      const newPost = await res.json();
      setAllPosts((prev) => [newPost, ...prev]);
      setMyPosts((prev) => [newPost, ...prev]);
      setFormData({ title: "", content: "", file: null, agree: false });
      setActiveTab("all"); // 작성 후 전체 탭으로 이동
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>顧客センター</h1>
      <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />

      <div className="tab-container">
        <div className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
          全ての投稿
        </div>
        <div className={`tab ${activeTab === "mine" ? "active" : ""}`} onClick={() => setActiveTab("mine")}>
          自分の投稿
        </div>
      </div>

      <div className="content">
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
                {allPosts.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.name}</td>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
                <tr style={{ textAlign: "right" }}>
                  <td colSpan={4}>
                    <button className="submit-btn" onClick={() => setActiveTab("write")}>
                      1:1相談する
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

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
                {myPosts.map((p, idx) => (
                  <tr key={idx} onClick={() => setActiveTab("write")} style={{ cursor: "pointer" }}>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "write" && (
          <>
            <h2>1:1 相談フォーム</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="タイトルを入力してください" />
              </div>
              <div className="form-group">
                <div className="textarea-wrapper">
                  <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="内容を入力してください" />
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
          </>
        )}
      </div>
    </div>
  );
}
