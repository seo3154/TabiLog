import React, { useState } from "react";

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // 닫기
    } else {
      setOpenIndex(index); // 열기
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>顧客センター</h2>
      <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />
      <h2 style={{ textAlign: "center" }}>いつもある質問(FAQ)</h2>

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          width: "80%",
          margin: "20px auto",
        }}
      >
        {faqs.map((faq, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="accordion"
              onClick={() => toggleAccordion(index)}
              style={{
                cursor: "pointer",
                padding: "15px 10px",
                fontSize: "16px",
                borderTop: "1px solid #888",
                borderBottom: "1px solid #888",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
                backgroundColor: "#ffffff",
                textAlign: "left",
                transition: "background-color 0.3s",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <span style={{ color: "red" }}>Q</span>
              {index + 1}. {faq.question}
            </button>
            <div
              className="panel"
              style={{
                overflowY: "hidden",
                maxHeight: openIndex === index ? "150px" : "0px",
                transition: "max-height 0.3s ease-out, padding 0.3s ease",
                borderBottom: "1px solid #000",
                borderLeft: "none",
                borderRight: "none",
                backgroundColor: "#fafafa",
                padding: openIndex === index ? "10px" : "0 10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
      <button
        onClick={() => window.location.href = "1to1.html"}
      style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #888",
      backgroundColor: "#f5f5f5",
      cursor: "pointer"
      }}>
    1:1 상담하기
  </button>
</div>
    </div>
  );
}
