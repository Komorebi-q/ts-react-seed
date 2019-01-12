const path = require("path");
const resolve = dir => {
  return path.resolve(__dirname, "./../", dir);
};

module.exports = {
  env: "development",
  port: 3000,
  distDir: resolve("dist"),
  devServer: {},
  publicPath: "",
  devTool: "cheap-module-source-map",
  venderName: "vender_dll",
  venderMoudle: [
    "axios",
    "react",
    "react-dom",
    "react-router",
    "immutable",
    "mobx",
    "mobx-react"
  ],
  define: {
    env: JSON.stringify("development"),
    "process.env.NODE_ENV": JSON.stringify("development")
  }
};
