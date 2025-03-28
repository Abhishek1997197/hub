const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/movixo",
  createProxyMiddleware({
    target: "https://www.movixo.info",
    changeOrigin: true,
    pathRewrite: { "^/movixo": "/" },
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["X-Frame-Options"] = "";
      proxyRes.headers["Content-Security-Policy"] = "";
    },
  })
);

app.listen(3000, () => {
  console.log("Proxy server running at http://localhost:3000/movixo");
});
