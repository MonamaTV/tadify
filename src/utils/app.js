export const getUrlCode = () => {
  const url = window.location.href;
  const newUrl = new URL(url);

  return newUrl.searchParams.get("code");
};

export const colors = [
  "from-red-900",
  "from-green-900",
  "from-blue-900",
  "from-purple-900",
  "from-amber-900",
  "from-orange-900",
  "from-pink-900",
  "from-gray-900",
  "from-cyan-900",
  "from-slate-900",
  "from-violet-900",
  "from-lime-900",
  "from-indigo-900",
  "from-rose-900",
];
