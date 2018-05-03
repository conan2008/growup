
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
        filename: "scripts/[name].bundle.js"
    },
    resolve: {
        extensions: [".vue", ".js", ".es", ".css"]
    },
    plugins: [
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
        new ExtractTextPlugin('styles/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/webapp/index.html',
            inject: false
        })
    ]
}

module.exports = webpackConfig;