export const youtubeId = (url = "") => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    return null;
  } catch {
    return null;
  }
};

export const youtubeThumb = (url) => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const youtubeEmbed = (url) => {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
};
