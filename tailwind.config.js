const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 1.1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      fontFamily: {
        sans: ["var(--font-rubik-sans)"],
        mono: [
          "var(--font-roboto-mono)",
          "Monaco",
          "SFMono-Regular",
          "ui-monospace",
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
      },
    }),
  ],
};
