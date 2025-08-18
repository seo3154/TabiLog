import React, { useState } from "react";

export default function CustomerCenter() {
  // FAQ 데이터
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

  // 게시글 데이터
  const initialPosts = [
    { name: "山田太郎", title: "ログインできません", status: "対応中", date: "2025-08-10" },
    { name: "佐藤花子", title: "パスワード再発行について", status: "完了", date: "2025-08-09" },
    { name: "鈴木一郎", title: "会員登録方法を教えてください", status: "未対応", date: "2025-08-08" },
    { name: "高橋美咲", title: "投稿の削除依頼", status: "対応中", date: "2025-08-07" },
    { name: "田中健", title: "写真がアップロードできない", status: "未対応", date: "2025-08-06" }
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState(initialPosts);
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>顧客センター</h2>

      <div style={{ display: "flex", marginTop: "20px" }}>
        {/* 좌측 탭 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "150px",
          backgroundColor: "#f5f5f5",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          padding: "10px",
          position: "fixed",
          left: 0,
          top: "100px"
        }}>
          <div
            onClick={() => setActiveTab("all")}
            style={{
              padding: "10px 5px",
              textAlign: "center",
              marginBottom: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: activeTab === "all" ? "#ddd" : "transparent",
              fontWeight: activeTab === "all" ? "bold" : "normal"
            }}
          >
            全ての投稿
          </div>
          <div
            onClick={() => setActiveTab("mine")}
            style={{
              padding: "10px 5px",
              textAlign: "center",
              marginBottom: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: activeTab === "mine" ? "#ddd" : "transparent",
              fontWeight: activeTab === "mine" ? "bold" : "normal"
            }}
          >
            自分の投稿
          </div>
        </div>

        {/* 오른쪽 컨텐츠 */}
        <div style={{ width: "80%", margin: "0 auto", paddingLeft: "150px" }}>
          {/* FAQ 표시: 전체 게시글 탭에서만 */}
          {activeTab === "all" && (
            <div>
              <h2>いつもある質問(FAQ)</h2>
              <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {faqs.map((faq, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      className="accordion"
                      style={{
                        cursor: "pointer",
                        padding: "15px 10px",
                        fontSize: "16px",
                        borderTop: "1px solid #888",
                        borderBottom: "1px solid #888",
                        borderLeft: "none",
                        borderRight: "none",
                        backgroundColor: "#fff",
                        textAlign: "left",
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        boxSizing: "border-box",
                        transition: "background-color 0.3s"
                      }}
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    >
                      <span style={{ color: "red", marginRight: "5px" }}>Q</span>
                      {index + 1}. {faq.question}
                    </button>
                    <div
                      className="panel"
                      style={{
                        overflowY: "hidden",
                        maxHeight: openFAQ === index ? "150px" : "0",
                        transition: "max-height 0.3s ease-out, padding 0.3s ease",
                        borderBottom: "1px solid #000",
                        backgroundColor: "#fafafa",
                        padding: openFAQ === index ? "10px" : "0 10px",
                        width: "100%",
                        boxSizing: "border-box"
                      }}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 게시판 */}
          <h2>ユーザーのお問い合わせ</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr>
                <th style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", backgroundColor: "#f2f2f2", padding: "10px" }}>問い合わせ者</th>
                <th style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", backgroundColor: "#f2f2f2", padding: "10px" }}>タイトル</th>
                <th style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", backgroundColor: "#f2f2f2", padding: "10px" }}>状態</th>
                <th style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", backgroundColor: "#f2f2f2", padding: "10px" }}>日付</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={idx}>
                  <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "10px", textAlign: "center" }}>{post.name}</td>
                  <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "10px", textAlign: "center" }}>{post.title}</td>
                  <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "10px", textAlign: "center" }}>{post.status}</td>
                  <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "10px", textAlign: "center" }}>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <a href="1to1.html" style={{ color: "black", textDecoration: "underline", fontSize: "16px" }}>1:1 相談する</a>
          </div>
        </div>
      </div>
    </div>
  );
}
