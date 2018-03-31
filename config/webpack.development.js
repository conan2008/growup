const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //提取css文件
    plugins: [
        new ExtractTextPlugin({
            filename: "styles/[name].css",
            allChunks: true //从所有额外的块中提取（默认情况下，它只从初始块中提取）
        })
    ]
}