// src/apis/client.js
import axios from "axios";

const client = axios.create({
  baseURL: "", //  proxy 설정 때문에 비워둬도 됨 (package.json 덕분에 자동으로 8080으로 감)
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
