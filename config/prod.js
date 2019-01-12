module.exports = {
  env: "production",
  devTool: "source-map",
  publicPath: "",
  venderModule: [
    "axios",
    "react",
    "react-dom",
    "react-router",
    "immutable",
    "mobx",
    "mobx-react"
  ],
  define: {
    env: JSON.stringify(JSON.stringify("development")),
    "process.env.NODE_ENV": JSON.stringify("development")
  }
};
