/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit", // JIT (just-in-time) mode を適用
  darkMode: false, // "media" or "class"
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  // purgeに使用するファイルの拡張子を指定
  // 設定したファイルで使われているクラス以外がビルドされず、cssファイルのサイズを縮小できる
  purge: [
    // "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  plugins: [],
};
