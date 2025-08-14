import client from "./client";

export async function getMbtiList() {
  const { data } = await client.get(`/api/mbti`);
  return data;
}
