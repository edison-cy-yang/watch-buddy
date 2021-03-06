const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: false,
    })
  );
  app.use(
    '/rooms',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: false,
    })
  );
};