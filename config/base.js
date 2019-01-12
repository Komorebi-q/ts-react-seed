const paths = require("./paths");

module.exports = {
  alias: {
    "@src": paths.src,
    "@static": paths.static,
    "@page": paths.page,
    "@component": paths.component,
    "@store": paths.store,
    "@style": paths.style,
    "@util": paths.util,
    "@config": paths.config
  },
  extensions: [".tsx", ".ts", ".json", ".js"]
};
