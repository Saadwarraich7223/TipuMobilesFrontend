export const cld = (url, options = "") => {
  if (!url) return "";
  return url.replace("/upload/", `/upload/${options}/`);
};
