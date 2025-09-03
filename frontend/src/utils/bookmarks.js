// frontend/src/utils/bookmarks.js
const KEY = (loginId) => `tabilog.bookmarks:${loginId || "guest"}`;

export function readBookmarks(loginId) {
  try {
    const raw = localStorage.getItem(KEY(loginId));
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function writeBookmarks(loginId, slugs = []) {
  localStorage.setItem(KEY(loginId), JSON.stringify(slugs));
  window.dispatchEvent(
    new CustomEvent("tabilog:bookmarks-updated", {
      detail: { loginId, slugs },
    })
  );
  return slugs;
}

export function isBookmarked(loginId, slug) {
  const list = readBookmarks(loginId);
  return list.includes(slug);
}

export function toggleBookmark(loginId, slug) {
  const list = new Set(readBookmarks(loginId));
  if (list.has(slug)) list.delete(slug);
  else list.add(slug);
  return writeBookmarks(loginId, Array.from(list));
}
