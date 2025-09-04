export const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

export function getProfileImgs(user) {
  const mbti = user?.mbtiName ? String(user.mbtiName).toUpperCase() : "";
  const mbtiImg = mbti ? pub(`/MbtiProfileImg/${mbti}.png`) : null;

  const raw = user?.mbtiUrl || "";
  const userImg = raw && raw.startsWith("http") ? raw : raw ? pub(raw) : null;

  return { mbtiImg, userImg };
}

export function syncUserToHeader(next) {
  const prev = JSON.parse(window.localStorage.getItem("tabilog.user") || "{}");
  window.localStorage.setItem(
    "tabilog.user",
    JSON.stringify({ ...prev, ...next })
  );
  window.dispatchEvent(
    new CustomEvent("tabilog:user-updated", { detail: next })
  );
}

export const PLACEHOLDER = "https://placehold.co/120x120";
