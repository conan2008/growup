
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlAfterWebpackPlugin = require('./config/html-after-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    join
} = require("path");


let webpackConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            })
        }, {
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: 'scripts/[name].[chunkhash:5].bundle.js'
    },
    resolve: {
        extensions: [".vue", ".js", ".es", ".css"]
    },
    externals: {
        'vue': 'Vue',
        'vuex':'Vuex',
        'vue-router':'VueRouter'
    },
    plugins: [
        //tree shaking
        //Scope Hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        //多entry提取公用代码
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'scripts/[name].js',
        //     minChunks: 2
        // }),
        //webpack必备代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minify: {
                collapseWhitespace: true
            },
            filename: 'scripts/[name].[hash:5].js',
            minChunks: Infinity,
            chunks: ['common']
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            output: {
                comments: false
            },
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: true,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                //内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            },
            sourceMap: false
        }),
        new ExtractTextPlugin('styles/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/webapp/index_prod.html',
            inject: false
        })
    ]
}

module.exports = webpackConfig;