const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 1.1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
    fontFamily: {
      mono: ["Droid Sans", "Monaco", "SFMono-Regular", "ui-monospace"],
    },
  },
  plugins: [],
};
