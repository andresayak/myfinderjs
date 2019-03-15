const path = require("path");
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.js",
    target: 'node',
    externals: [nodeExternals()], 
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: ["raw-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};