/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Lato,sans-serif"],
      monserrat: ["Montserrat"],
      nunito: ["Nunito,sans-serif"],
      dancing: ["Dancing Script"],
    },
    extend: {
      skew: {
        17: "17deg",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      animation: {
        bounce: "bounce 3s ease-in-out infinite",
      },
    },
    screens: {
      xs: "260px",
      sm: "300px",
      // => @media (min-width: 640px) { ... }

      md: "800px",
      // => @media (min-width: 768px) { ... }

      lg: "1000px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".modal": {
          "@apply fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition ease-out":
            {},
        },
        ".modal-content": {
          "@apply relative bg-white w-96 p-6 rounded": {},
        },
        ".modal-open": {
          "@apply overflow-hidden": {},
        },
      });
    },
  ],
};
