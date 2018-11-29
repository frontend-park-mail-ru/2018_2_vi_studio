const isProd = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

console.log(`Is Production: ${isProd}`);

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        filename: isProd ? '[name].bundle.min.js' : '[name].bundle.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
            'process.env.SERVER_IP': JSON.stringify(process.env.SERVER_IP),
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        }),
    ]
};