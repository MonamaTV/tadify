export const getUrlCode = () => {
  const url = window.location.href;
  const newUrl = new URL(url);

  return newUrl.searchParams.get("code");
};

export const colors = [
  "from-red-700",
  "from-green-700",
  "from-blue-700",
  "from-purple-700",
  "from-amber-700",
  "from-orange-700",
  "from-pink-700",
  "from-cyan-700",
  "from-violet-700",
  "from-lime-700",
  "from-indigo-700",
  "from-rose-700",
  "from-fuchsia-700",
];

export const userRoutes = [
  "/tracks",
  "/artists",
  "/plays",
  "/profile",
  "/playlists",
  "/playlists/create",
  "/playlists/suggest",
];
