import React, { useState } from "react";

export default function Board() {
  const [activeTab, setActiveTab] = useState("all"); // all / mine
  const [openFaq, setOpenFaq] = useState(null);

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
    { name: "山田太郎", title: "ログインできません", status: "対応中", date: "2025-08-10" },
    { name: "佐藤花子", title: "パスワード再発行について", status: "完了", date: "2025-08-09" },
    { name: "鈴木一郎", title: "会員登録方法を教えてください", status: "未対応", date: "2025-08-08" },
    { name: "高橋美咲", title: "投稿の削除依頼", status: "対応中", date: "2025-08-07" },
    { name: "田中健", title: "写真がアップロードできない", status: "未対応", date: "2025-08-06" },
  ];

  const myPosts = [
    { title: "ログインできません", status: "対応中", date: "2025-08-10" },
    { title: "写真がアップロードできない", status: "未対応", date: "2025-08-06" },
  ];

  const handleFaqClick = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* 좌측 탭 */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 100,
        width: 150,
        backgroundColor: "#f5f5f5",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10
      }}>
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          style={{ padding: "10px 5px", marginBottom: 5, cursor: "pointer", border: "none", borderRadius: 5 }}
          onClick={() => setActiveTab("all")}
        >
          全ての投稿
        </button>
        <button
          className={`tab ${activeTab === "mine" ? "active" : ""}`}
          style={{ padding: "10px 5px", marginBottom: 5, cursor: "pointer", border: "none", borderRadius: 5 }}
          onClick={() => setActiveTab("mine")}
        >
          自分の投稿
        </button>
      </div>

      {/* 중앙 콘텐츠 */}
      <div style={{ marginLeft: 170, width: "80%" }}>
        {activeTab === "all" && (
          <>
            <h2>いつもある質問(FAQ)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 30 }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => handleFaqClick(idx)}
                    style={{
                      cursor: "pointer",
                      padding: "15px 10px",
                      fontSize: 16,
                      borderTop: "1px solid #888",
                      borderBottom: "1px solid #888",
                      borderLeft: "none",
                      borderRight: "none",
                      backgroundColor: "#fff",
                      textAlign: "left",
                      minHeight: 60,
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      boxSizing: "border-box",
                      transition: "background-color 0.3s"
                    }}
                  >
                    <span style={{ color: "red", marginRight: 5 }}>Q</span>
                    {idx + 1}. {faq.question}
                  </button>
                  <div
                    style={{
                      overflowY: "hidden",
                      maxHeight: openFaq === idx ? 150 : 0,
                      transition: "max-height 0.3s ease-out, padding 0.3s ease",
                      borderBottom: "1px solid #000",
                      backgroundColor: "#fafafa",
                      padding: openFaq === idx ? 10 : 0,
                      width: "100%",
                      boxSizing: "border-box"
                    }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>ユーザーのお問い合わせ</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
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
              </tbody>
            </table>

            <div style={{ textAlign: "right", marginBottom: 30 }}>
              <a href="1to1.html" style={{ textDecoration: "underline", color: "black", fontSize: 16 }}>
                1:1 相談する
              </a>
            </div>
          </>
        )}

        {activeTab === "mine" && (
          <>
            <h2>私の投稿</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>状態</th>
                  <th>日付</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
