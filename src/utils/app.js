export const getUrlCode = () => {
  const url = window.location.href;
  const newUrl = new URL(url);

  return newUrl.searchParams.get("code");
};

export const colors = [
  "from-red-700",
  "from-green-700",
  "from-blue-700",
  "from-alpha-700",
  "from-purple-700",
  "from-green-700",
  "from-coral-700",
  "from-orange-700",
  "from-pink-700",
  "from-maroon-700",
  "from-gray-700",
  "from-cyan-700",
  "from-slate-700",
  "from-violet-700",
  "from-lime-700",
  "from-indigo-700",
  "from-rose-700",
];
