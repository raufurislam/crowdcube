export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2C5282", // Sky blue
          secondary: "#3182CE", // Icy azure
          accent: "#63B3ED", // Glacier blue
          neutral: "#E2E8F0", // Frosty gray
          "base-100": "#fff1f0", // Snow white FFFFFF
        },
        dark: {
          primary: "#2A4365", // Midnight blue
          secondary: "#2B6CB0", // Deep sky
          accent: "#4299E1", // Cool glacier
          neutral: "#2D3748", // Mountain shadow
          "base-100": "#1A202C", // Night black
        },
      },
    ], // Include light and dark themes
  },
};
