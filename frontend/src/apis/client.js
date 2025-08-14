import axios from "axios";

const client = axios.create({
  baseURL: "", // dev 프록시 쓰면 빈 문자열
  timeout: 10000,
});

export default client;
