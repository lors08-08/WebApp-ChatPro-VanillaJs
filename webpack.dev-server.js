const { merge } = require("webpack-merge");

const dev = require("./webpack.dev");

module.exports = merge(dev, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  watch: true,
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 3000,
    // open: true,
  },
});
