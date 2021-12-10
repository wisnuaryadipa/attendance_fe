// craco.config.js
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@containers": path.resolve(__dirname, "./src/containers"),
      "@routers": path.resolve(__dirname, "./src/routers"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@public": path.resolve(__dirname, "./public"),
      "@root": path.resolve(__dirname, "./"),
    },
  },
};