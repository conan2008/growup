
const webpack = require('webpack');
const MyPlugin = require('./myplugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HashOutput = require('webpack-plugin-hash-output');

module.exports = {
    output: {
        //...
        filename: '[name].[hash:5].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                            {
                                loader: 'css-loader'
                            },
                            { 
                                loader: 'postcss-loader'
                            }
                        ]
                })
            }
        ]
    },
    plugins: [
        new HashOutput(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'indexPlugin.html',
            inject: false
        }),
        new MyPlugin(),
        new ExtractTextPlugin('[name].[hash:5].css')
      ],

      optimization: {
 
        runtimeChunk: {
            name: "common"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    // chunks: "all"
                }
            }
        }
    }
}