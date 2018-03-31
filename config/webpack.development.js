const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //提取css文件
    plugins: [
        new ExtractTextPlugin({
            filename: "styles/[name].css",
            allChunks: true
        })
    ]
}