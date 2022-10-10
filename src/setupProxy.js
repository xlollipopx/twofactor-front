const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/login', 
    {
      target: 'https://hotspotxx.herokuapp.com',
      changeOrigin: true,
    }) 
  );
  app.use(
    createProxyMiddleware('/2factor', 
    {
      target: 'https://hotspotxx.herokuapp.com',
      changeOrigin: true,
    }) 
  );
  app.use(
    createProxyMiddleware('/verification', 
    {
      target: 'https://hotspotxx.herokuapp.com',
      changeOrigin: true,
    }) 
  );
  app.use('/api',
    createProxyMiddleware('/home', 
    {
      target: 'https://hotspotxx.herokuapp.com',
      changeOrigin: true,
    }) 
  );

  app.use(
    createProxyMiddleware('/signup', 
    {
      target: 'https://hotspotxx.herokuapp.com',
      changeOrigin: true,
    }) 
  );
};