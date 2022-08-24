const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000',
			changeOrigin: true,
		})
	);
};

/*프론트(3000),백엔드(5000.5500) 서버가 달라서 중계포트인 프록시서버 만듦*/
