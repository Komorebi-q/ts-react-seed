const fs = require("fs");
const path = require("path");
const app = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(app, relativePath);
const paths = {
  resolveApp,
  app,
  entryFile: resolveApp("src/index.tsx"),
  manifest: resolveApp("vender/manifest.json"),
  viewFile: resolveApp("view/index.html"),
  dllVender: resolveApp("vender/dll.vender.*.js"),
  component: resolveApp("src/component"),
  store: resolveApp("src/store"),
  style: resolveApp("src/style"),
  util: resolveApp("src/util"),
  config: resolveApp("src/config")
};
[
  "src",
  "dist",
  "config",
  "vender",
  "test",
  "static",
  "webpack",
  "view",
  "page",
  "scripts"
].forEach(dir => {
  paths[dir] = resolveApp(dir);
});

module.exports = paths;
