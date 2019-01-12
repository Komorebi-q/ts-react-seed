const paths = require("./../config/paths");
const conf = require("./../config/prod");
const base = require("./webpack.base.conf");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: conf.env,
  output: {
    path: paths.dist,
    publicPath: conf.publicPath,
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/chunk.[name].[chunkhash:8]"
  },
  devtool: conf.devTool,
  module: {
    rules: [
      {
        test: /.(css|scss)$/,
        include: paths.src,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: "~",
      chunks: "all", // 模式 all, async, initial
      minChunks: 2,
      minSize: 5000, // 大于 5kb
      name: true,
      cacheGroups: {
        venders: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        },
        react_venders: {
          priority: 10,
          test: (module, chunks) =>
            new RegExp(conf.venderModule.join("|")).test(module.context),
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(conf.define),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/chunk.[contenthash:8].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: paths.viewFile,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
    new BundleAnalyzerPlugin()
  ]
});
