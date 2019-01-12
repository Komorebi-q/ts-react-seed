const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const merge = require("webpack-merge");
const base = require("./webpack.base.conf");
const conf = require("../config/dev");
const paths = require("../config/paths");

module.exports = merge(base, {
  mode: conf.env,
  output: {
    filename: "js/bundle.js",
    chunkFilename: "js/chunk.[name].js",
    publicPath: conf.publicPath
  },
  devtool: conf.devTool,
  module: {
    rules: [
      {
        test: /.(css|scss)$/,
        include: paths.src,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(paths.manifest),
      name: conf.venderName
    }),
    new webpack.DefinePlugin(conf.define),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: paths.viewFile
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: paths.dllVender
      }
    ])
  ]
});
