const paths = require("./../config/paths");
const conf = require("./../config/base");

module.exports = {
  entry: [paths.entryFile],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: paths.src,
        use: ["babel-loader"]
      },
      {
        test: /.tsx?$/,
        include: paths.src,
        use: ["babel-loader", "ts-loader", "tslint-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: paths.static,
        use: {
          loader: "file-loader",
          options: {
            name: "image/[name].[hash:8].[ext]"
          }
        }
      },
      {
        test: /\.(mp4|webm|ogv)(\?.*)?$/,
        include: paths.static,
        use: {
          loader: "file-loader",
          options: {
            name: "video/[name].[hash:8].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: conf.extensions,
    alias: conf.alias,
    aliasFields: [], // libs 解析
    mainFiles: ["index"],
    modules: ["src", "node_modules"]
  }
};
