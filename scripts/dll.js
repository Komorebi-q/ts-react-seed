const path = require("path");
const { exec } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");
const webpack = require("webpack");
const conf = require("../webpack/webpack.dll.conf");
const spinner = ora("building for dll dependencies on env:dev");

console.log(
  chalk.green("rm -rf"),
  `${path.resolve(__dirname, "./../vender")} ...`
);

exec(`rm -rf ${path.resolve(__dirname, "./../vender")}`, err => {
  if (err) throw err;
});

spinner.start();

webpack(conf, (err, stats) => {
  spinner.stop();

  if (err) throw err;

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );

  console.log(chalk.cyan("  Build complete.\n"));
});
