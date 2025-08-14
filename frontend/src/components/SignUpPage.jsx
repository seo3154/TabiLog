import React from "react";

export default function Signup() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>회원가입</h1>
      <form action="Signup" method="post">
        <fieldset
          style={{
            width: "300px",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <legend style={{ textAlign: "center" }}>회원가입</legend>
          <table style={{ margin: "0 auto", width: "100%" }}>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>
                  <input type="text" name="userid" required style={inputStyle} />
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>비밀번호 확인</td>
                <td>
                  <input
                    type="password"
                    name="password2"
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td>성별</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="여자"
                      required
                      style={radioStyle}
                    />{" "}
                    여자
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="남자"
                      required
                      style={radioStyle}
                    />{" "}
                    남자
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <input
                    type="submit"
                    value="회원가입"
                    style={{
                      borderRadius: "5px",
                      padding: "5px 10px",
                      border: "1px solid #888",
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </div>
  );
}

const inputStyle = {
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "5px",
  width: "95%",
};

const radioStyle = {
  appearance: "none",
  WebkitAppearance: "none",
  width: "18px",
  height: "18px",
  border: "2px solid #888",
  borderRadius: "50%",
  outline: "none",
  cursor: "pointer",
  position: "relative",
};
