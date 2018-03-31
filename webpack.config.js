const argv = require('yargs-parser')(process.argv.slice(2));
const glob = require('glob');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MyPlugin = require('./myplugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require("path");

let files = glob.sync(__dirname + "/src/webapp/views/**/*.entry.js");
const webpackConfig = require(__dirname + `/config/webpack.${argv.mode}.js`);

console.log(webpackConfig);

let _entry = {};

for (let item of files) {
    item.replace(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g, (match, $1, $2) => {
        //match 匹配前的字符串
        //$1正则组（匹配的一个括号内的） $2-->第二组
        _entry[$1] = item;
    });
}

let _webpackConfig = {
    entry: _entry,
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
        }]
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "/src/webapp/views/common/**/*.js",
            to: "../views/common"
        }]),
        new HtmlWebpackPlugin({
            filename: "../views/hello/pages/index.html",
            template: "./src/webapp/views/hello/pages/index.html",
            inject: false
        }),
        new MyPlugin()
    ]
}

module.exports = merge(_webpackConfig, webpackConfig);