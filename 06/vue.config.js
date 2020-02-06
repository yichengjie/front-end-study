module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://leyunyou.ideamerry.com',
                pathRewrite: {
                    '^/api' : '/api'
                }
            }
        }
    }
}