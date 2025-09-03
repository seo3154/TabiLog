import client from "./client";

// GET /api/users/{loginId}/bookmarks  → { items: number[] }
export async function getBookmarks(loginId) {
  const { data } = await client.get(
    `/users/${encodeURIComponent(loginId)}/bookmarks`
  );
  return Array.isArray(data?.items) ? data.items : [];
}

// GET /api/users/{loginId}/bookmarks/{travelId}/exists → { exists: boolean }
export async function existsBookmark(loginId, travelId) {
  const { data } = await client.get(
    `/users/${encodeURIComponent(loginId)}/bookmarks/${travelId}/exists`
  );
  return !!data?.exists;
}

// POST /api/users/{loginId}/bookmarks/{travelId}
export async function addBookmark(loginId, travelId) {
  await client.post(
    `/users/${encodeURIComponent(loginId)}/bookmarks/${travelId}`
  );
}

// DELETE /api/users/{loginId}/bookmarks/{travelId}
export async function removeBookmark(loginId, travelId) {
  await client.delete(
    `/users/${encodeURIComponent(loginId)}/bookmarks/${travelId}`
  );
}
