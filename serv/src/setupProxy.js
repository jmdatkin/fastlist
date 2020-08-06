const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("setup proxy");
    // app.use(
    //     '/',
    //     createProxyMiddleware({
    //         target: 'http://[::1]:9000',
    //         changeOrigin: true
    //     })
    // );
    app.use(
        proxy("/", {
            target: "http://[::1]:9000",
            changeOrigin: true,
            onProxyReq(proxyReq) {
                if (proxyReq.getHeader('origin')) {
                    proxyReq.setHeader("origin", "http://[::1]:9000"
                }
            },
            pathRewrite: { "^/rootpath": ""},
            logLevel: "debug"
        })
    )
};