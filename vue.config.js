module.exports = {
    devServer: {
        // 配置跨域代理
        proxy: {
            '/api': {
                target: 'http://localhost:8080',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '',//重写,
                }
            }
        }
    }
};
