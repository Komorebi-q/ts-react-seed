const path = require("path");
const conf = require("../config/dev");
const paths = require("../config/paths");
const webpack = require("webpack");

module.exports = {
  mode: conf.env,
  entry: {
    vender: conf.venderMoudle
  },
  output: {
    path: path.vender,
    filename: "dll.[name].[hash:8].js",
    library: conf.venderName
  },
  plugins: [
    new webpack.DllPlugin({
      path: paths.manifest,
      name: conf.venderName
    })
  ]
};
