// src/apis/users.js
import client from "./client";

/** 유저 조회 */
export async function getUserByLoginId(loginId) {
  const res = await client.get(`/api/users/${encodeURIComponent(loginId)}`);
  return res.data;
}

/** 프로필 수정 (UpdateProfileRequest DTO와 키 맞추기) */
export async function updateUserProfile(loginId, form) {
  // form: { nickname?, email?, tel?, introText? }
  const res = await client.put(
    `/api/users/${encodeURIComponent(loginId)}`,
    form
  );
  return res.data;
}

/** MBTI 수정 (UpdateMbtiRequest DTO와 키 맞추기) */
export async function updateUserMbti(loginId, mbtiName) {
  const body = { mbtiName: mbtiName }; // ✅ DTO: UpdateMbtiRequest.mbtiName
  const res = await client.put(
    `/api/users/${encodeURIComponent(loginId)}/mbti`,
    body
  );
  return res.data;
}
