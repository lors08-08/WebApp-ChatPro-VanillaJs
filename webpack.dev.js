const { merge } = require("webpack-merge");

const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "js/[name].js",
    chunkFilename: "js/[name].[id].js",
  },
  plugins: [new ForkTSCheckerPlugin()],
});
