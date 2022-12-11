const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const isDevServer = !!process.env.WEBPACK_DEV_SERVER;

const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    common: ["./src/index.ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: isProduction ? false : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
      minify: {
        inject: "body",
        removeComments: isProduction,
        collapseWhitespace: isProduction,
      },
    }),

    ...(!isDevServer ? [new CleanWebpackPlugin()] : []),

    new MiniCssExtractPlugin({
      filename: !isProduction ? "bundle.[hash].css" : "bundle.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.module\.s[ac]ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module.(s[ac]ss)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [stylesHandler, "style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
};
