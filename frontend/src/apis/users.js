// src/apis/users.js
import client from "./client";

export async function getUserByLoginId(loginId) {
  const { data } = await client.get(`/api/users/${loginId}`);
  return data; // UserProfileDto
}

export async function updateUserProfile(loginId, form) {
  const { data } = await client.put(`/api/users/${loginId}`, form);
  return data; // 최신 UserProfileDto
}

export async function updateUserMbti(loginId, mbtiName) {
  const { data } = await client.put(`/api/users/${loginId}/mbti`, { mbtiName });
  return data; // 최신 UserProfileDto (mbtiName/mbtiUrl 반영)
}
