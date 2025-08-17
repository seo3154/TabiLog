import client from "./client";

export async function getUserByLoginId(loginId) {
  const { data } = await client.get(`/api/users/${loginId}`);
  return data; // UserProfileDto
}

// src/apis/users.js
export async function updateUserProfile(loginId, form) {
  // return (await axios.put(`/api/users/${loginId}`, form)).data;
  return Promise.resolve(form); // MOCK
}
export async function updateUserMbti(loginId, mbtiName) {
  // return (await axios.put(`/api/users/${loginId}/mbti`, { mbtiName })).data;
  return Promise.resolve({ mbtiName }); // MOCK
}
