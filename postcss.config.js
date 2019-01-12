module.exports = {
  plugins: [
    require("autoprefixer")({
      grid: "no-autoplace" // enable Autoprefixer grid translations but exclude autoplacement support. You can also use /* autoprefixer grid: no-autoplace */ in your CSS.
    }),
    require("postcss-color-function") // https://github.com/postcss/postcss-color-function
  ]
};
