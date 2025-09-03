// src/apis/users.js
import client from "./client";

/** 유저 조회 */
export async function getUserByLoginId(loginId) {
  const res = await client.get(`/users/${encodeURIComponent(loginId)}`);
  return res.data;
}

/** 프로필 수정 (UpdateProfileRequest DTO와 키 맞추기) */
export async function updateUserProfile(loginId, form, opts = {}) {
  // form: { nickname?, email?, tel?, introText? }
  const res = await client.put(`/users/${encodeURIComponent(loginId)}`, form, {
    signal: opts.signal,
  });
  return res.data;
}

/** MBTI 수정 (UpdateMbtiRequest DTO와 키 맞추기) */
export async function updateUserMbti(loginId, mbtiName) {
  const body = { mbtiName: mbtiName }; // ✅ DTO: UpdateMbtiRequest.mbtiName
  const res = await client.put(
    `/users/${encodeURIComponent(loginId)}/mbti`,
    body
  );
  return res.data;
}

// 로그인
export const login = (loginId, password) =>
  client.post("/auth/login", { loginId, password }).then((res) => res.data);

// 아이디 중복 확인
export const checkIdDuplicate = (loginId) =>
  client.get(`/auth/check-id`, { params: { loginId } }).then((res) => res.data);

// 닉네임 중복 확인
export const checkNicknameDuplicate = (nickname) =>
  client
    .get(`/auth/check-nickname`, { params: { nickname } })
    .then((res) => res.data);

// 이메일 중복 확인
export const checkEmailDuplicate = (email) =>
  client
    .get(`/auth/check-email`, { params: { email } })
    .then((res) => res.data);
// 회원가입
export const register = (userData) => client.post(`/auth/register`, userData);
