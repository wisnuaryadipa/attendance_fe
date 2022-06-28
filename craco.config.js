// craco.config.js
const path = require("path");
console.log(process.env.REACT_APP_HOST_TYPE)

if(process.env.REACT_APP_HOST_TYPE === "development"){
  require('dotenv').config({ path: '.env.development' })
} else if (process.env.REACT_APP_HOST_TYPE.trim() === "production") {
  require('dotenv').config({ path: '.env.production' })
} else {
  require('dotenv').config({ path: '.env' })
}


module.exports = {
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@controllers": path.resolve(__dirname, "./src/controllers"),
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