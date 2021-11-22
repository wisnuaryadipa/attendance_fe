// craco.config.js
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@containers": path.resolve(__dirname, "./src/containers"),
      "@root": path.resolve(__dirname, "./")
    },
  },
};