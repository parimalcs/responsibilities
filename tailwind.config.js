// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fancy: ['Papyrus', 'serif'], // Custom font for title and watermark
      },
    },
  },
  plugins: [],
};
