var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        app: path.join(__dirname, '/index'),//入口文件，index.js
        vendors: ['react', 'react-dom']
    },

    output: {
        path: path.join(__dirname, '/build'),//编译打包后，js文件输出路径  硬盘
        publicPath: '/assets/',//网站运行时的访问路径
        filename: '[name].[hash].js'//编译打包后，js文件名
    },




    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx', 'babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                /*loader: ExtractTextPlugin.extract(
                 { fallback: 'style-loader', use: 'css-loader!postcss-loader' }
                 )*/
                loader: 'style-loader!css-loader?modules'
            },
            {
                test: /\.less$/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!less-loader?modules'
            }
            /*,
             {
             test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
             exclude: /^node_modules$/,
             loader: 'url-loader?limit=50000&name=[path][name].[ext]'
             }*/,
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        name: '[name]-[hash].[ext]'
                    }
                }]
            }
        ]
    },




    plugins: [
        new webpack.BannerPlugin('This file is created by gyh'),
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            title: 'azlxApp'
        })
    ]

};












/*
var fs = require('fs');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),

    output: {
        filename: 'server.bundle.js'
    },

    target: 'node',

    externals: fs.readdirSync(path.resolve(__dirname, 'node_modules'))
        .concat(['react-dom/server', 'react/addons',])
        .reduce(function (ext, mod) {
            ext[mod] = 'commonjs ' + mod;
            return ext;
        }, {}),

    node: {
        __dirname: true,
        __filename: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react' }
        ]
    }
}*/
