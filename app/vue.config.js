module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  productionSourceMap: false,
  runtimeCompiler: true,
  outputDir: "./src-cordova/www",
  devServer: {
    port: 4000,
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/users/root": "",
        },
      },
    },
  },
};
