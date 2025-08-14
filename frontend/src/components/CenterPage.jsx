import React, { useState } from "react";

const faqs = [
  { question: "私は", answer: "답변 내용 1" },
  { question: "질문2", answer: "답변 내용 2" },
  { question: "질문3", answer: "답변 내용 3" },
  { question: "질문4", answer: "답변 내용 4" },
  { question: "질문5", answer: "답변 내용 5" },
  { question: "질문6", answer: "답변 내용 6" },
  { question: "질문7", answer: "답변 내용 7" },
  { question: "질문8", answer: "답변 내용 8" },
  { question: "질문9", answer: "답변 내용 9" },
  { question: "질문10", answer: "답변 내용 10" },
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
    </div>
  );
}
