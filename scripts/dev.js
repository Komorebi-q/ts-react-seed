const path = require("path");
const net = require("net");
const { exec } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");
const webpack = require("webpack");
const conf = require("../webpack/webpack.dev.conf");
const env = require("./../config/dev");
const middleware = require("webpack-dev-middleware");
const devServer = require("webpack-dev-server");
const DashboardPlugin = require("webpack-dashboard/plugin");

function portIsOccupied(port) {
  // 创建服务并监听该端口
  const server = net.createServer().listen(port);

  return new Promise((resolve, reject) => {
    server.on("listening", function() {
      resolve(port);
      // 执行这块代码说明端口未被占用
      server.close(); // 关闭服务
    });

    server.on("error", function(err) {
      if (err.code === "EADDRINUSE") {
        // 端口已经被使用
        resolve(portIsOccupied(port + 1));
      } else {
        reject(err);
      }
    });
  });
}

async function dev() {
  // const rmSpinner = ora(`rm -rf ${env.distDir}`);
  // rmSpinner.start();
  // exec(`rm -rf ${env.distDir}`, err => {
  //   if (err) throw err;
  //   rmSpinner.stop();
  //   console.log(chalk.green(`${env.distDir} is clean;`));
  // });

  env.port = await portIsOccupied(env.port);
  conf.entry = [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${env.port}/`,
    "webpack/hot/dev-server",
    ...conf.entry
  ];

  const compiler = webpack(conf);
  compiler.apply(new DashboardPlugin());

  console.log(chalk.green("dev build..."));

  const app = new devServer(compiler, {
    contentBase: path.resolve(__dirname, "./../dist/"),
    hot: true,
    open: true,
    watchContentBase: true,
    inline: true,
    openPage: "/different/page",
    overlay: true,
    progress: true
  });

  console.log(chalk.green(`app listen to localhost:${env.port}`));

  app.listen(env.port);
}

dev();
