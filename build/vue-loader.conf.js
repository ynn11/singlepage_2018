var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction ?
            config.build.productionSourceMap : config.dev.cssSourceMap,
        extract: isProduction
    }),
    postcss: [
        require('autoprefixer')({
            // browsers: ['last 2 versions']
            "browsers": [
                "iOS >= 8",
                "Firefox >= 20",
                "Android >= 4.4"
            ]
            // browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
            // browsers: ['> 5% in alt-AS']
        })
    ]
}
