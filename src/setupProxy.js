const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/login', 
    {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }) 
  );
  app.use(
    createProxyMiddleware('/2factor', 
    {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }) 
  );
  app.use(
    createProxyMiddleware('/verification', 
    {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }) 
  );
  app.use('/api',
    createProxyMiddleware('/home', 
    {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }) 
  );

  app.use(
    createProxyMiddleware('/signup', 
    {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }) 
  );
};