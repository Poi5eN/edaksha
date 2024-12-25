const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://eshikshaserver.onrender.com',
      target: 'https://backendserver-vpse.onrender.com',
      changeOrigin: true,
    })
  );
};