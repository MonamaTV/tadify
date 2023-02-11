export const getUrlCode = () => {
  const url = window.location.href;
  const newUrl = new URL(url);

  return newUrl.searchParams.get("code");
};
