import client from "./client";
import APIConfig from "../config/API.config";
export const fetchBoards = ({
  category = "",
  mbti = "",
  page = 0,
  size = 50,
}) =>
  client.get(`${APIConfig}/api/boards/list`, {
    params: { category, mbti, page, size },
  });

export const fetchBoard = (id, { increaseView = true } = {}) =>
  client.get(`/api/boards/${id}`, { params: { increaseView } });

// export const createBoard = (payload) =>
//   client.post("/api/boards/create", payload);

// export const createBoard = async (payload) => {
//   try {
//     const { data } = await client.post("/api/boards/create", payload);
//     return data;
//   } catch (err) {
//     console.error(
//       "createBoard error:",
//       err?.response?.status,
//       err?.response?.data
//     );
//     throw err;
//   }
// };

export const createBoard = async (payload) => {
  // const url = "http://localhost:8080/api/boards/create"; // 프록시 우회, 경로 강제
  // const { data } = await client.post(url, payload);
  const { data } = await client.post(`${APIConfig}/api/boards/create`, payload);
  return data;
};

export const fetchComments = (boardId) =>
  client.get(`/api/comments/board/${boardId}`);

export const createComment = (payload) => client.post("/api/comments", payload);
