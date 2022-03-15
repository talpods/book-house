module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: '300px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px',
      },
    },
    
    extend: {
      spacing: { cw: "1280px" },
      colors: {
        purple: "#3F3D56",
        lightPurple: "rgba(63, 61, 86, 0.5)",
        lp: "#5d5b7a",
        grey: "#464346",
        white: "#ffffff",
        lightGrey: "#C4CDD5",
        lightGreyTrans: "rgba(172, 169, 169, 0.36)",
        black: "#000",
        mc: "#3F3D56",
        dsbld:"#53525E",
        nc: "#E5E5E5",
        nb: "#5D5D5D",
        bb: "#2F2E41",
        mcm: "#464346",
        ce: "#EEEEEE",
        fb: "url('../public/assets/bg.png')",
      },
      backgroundImage: {
        "hero-pattern": "url('../public/assets/bg.png')",
        "hero-books-pattern": "url('../public/assets/books-bg.png')",
        "hero-categories-pattern": "url('../public/assets/categories-bg.png')",
      },
      fontFamily: {
        Roboto: ["Roboto"],
        sans: ["Poppins", "sans-serif"],
      },
      width:{
        100: "40rem",
      }
    },
  },
  variants: {
    extend: {},
    outline:["focus"],
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "100%",
            paddingRight:"1rem",
            paddingLeft:"1rem",
          },
          "@screen md": {
            maxWidth: "100%",
            paddingRight:"4rem",
            paddingLeft:"4rem",
          },
          "@screen lg": {
            maxWidth: "1280px",
          },
          "@screen xl": {
            maxWidth: "1280px",
          },
        },
      });
    },
  ],
};