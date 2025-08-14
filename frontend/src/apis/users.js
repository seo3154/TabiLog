import client from "./client";

export async function getUserByLoginId(loginId) {
  const { data } = await client.get(`/api/users/${loginId}`);
  return data; // UserProfileDto
}
