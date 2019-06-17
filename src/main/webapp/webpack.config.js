// webpack 是什么？
// MODULE BUNDLER
// 它是这么自称的，模块打包器。
// 这是 webpack 一类工具的特点，它们在 HTML 文件直接引用构建后的 js 文件，而不是源文件。

// 实时重新构建。 webpack --watch
// 实时刷新页面。 webpack-dev-server  (--inline)  (--hot)
    // 1. js 文件修改
    // 2. webpack-dev-server 监控到变化
    // 3. webpack 在内存中重新构建 bundle.js
    // 4. webpack-dev-server 保证浏览器页面引用的 bundle.js 文件与内存中一致

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

module.exports = {

    devtool: 'eval-source-map',//映射，解决调试问题

    entry: path.join(__dirname, '/index'),//入口文件，index.js

    output: {
        // path: path.join(__dirname, '/build'),//编译打包后，js文件输出路径 内存
        publicPath: '/assets/',//网站运行时的访问路径
        filename: 'bundle.js'//编译打包后，js文件名
    },

    // webpack-dev-server起的服务器配置，默认端口8080

    // contentBase: 默认webpack-dev-server是从项目的根目录提供服务，
    // 如果要从不同的目录提供服务，可以通过contentBase来配置，
    // 比如可以把contentBase配置成'./public'。

    // port: 默认webpack-dev-server是用 8080 端口起的，通过port可以配成其他的端口。

    // inline: 设置为true，代码有变化时，浏览器端刷新。

    // colors: 设置为true，当server跑的时候，terminal输出带颜色。

    // historyApiFallback: 这个是干嘛用的嘞？
    // 对于单页面程序，浏览器的brower histroy可以设置成html5 history api或者hash，
    // 而设置为html5 api的，如果刷新浏览器会出现404 not found，
    // 原因是它通过这个路径（比如： /activities/2/ques/2）来访问后台，所以会出现404，
    // 而把historyApiFallback设置为 true 那么所有的路径都执行index.html。

    // webpack 最基本的启动webpack命令
    // --progress命令行选项, 是用于显示build的进度
    // --config, 指定使用哪个配置文件
    // -w 提供watch方法，实时进行打包更新
    // -p 对打包后的文件进行压缩
    // -d 提供SourceMaps，方便调试
    // --colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
    // --profile 输出性能数据，可以看到每一步的耗时
    // --display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块

    devServer: {
        proxy: {
            "/gp": {
                target: "http://localhost:8080",
                secure: false,
                changeOrigin: true
            }
        },

        contentBase: './public',
        port: 8888,
        inline: true,
        // colors: true,
        historyApiFallback: true,
        open: true
    },






    /*
    webpack通过loader来加载各种各样的资源，不同的资源应用的不同的loader ，
    举个例子：打包es6会用到babel-loader，打包css用到style-loader和css-loader等等。
    loaders是通过单独的npm来安装的，然后在webpack.config.js中通过module来配置。
    loader的配置包括：
        test: 一个正则表达式，用于检测不同的文件的后缀名，然后配置不同的loader。
        loader/loaders: loader的名字，比如'babel-loader'
        exclude/include: 一个选项来配置哪些目录和文件需要排除掉或者加上
        query: 这个query settings可以用于传递不同的参数给loader

    babel是一个编译javascript的工具，它可以实现：
        让你用下一代javascript（es6/es7/es2015/es2016）来写代码。
        可以使用javascript的扩展语法，比如react jsx。
    babel是一个单独的工具，但是我们可以通过babel-loader在webpack中应用它。
    babel的安装和配置:
        babel是一个模块化的并且分发到不同的npm modules。
        核心的功能 babel-core 是通过babel-loader安装来直接使用的。
        但是，对于一些其他的功能和扩展要另外的安装
        （最常用的是babel-preset-es2015和babel-preset-react分别用于支持es6和react jsx）。
        我们来安装所需的包
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

    babel的配置文件:
    babel可以通过webpack的配置文件直接配置，
    但是它有很多的配置信息，都放到同一个webpack的配置文件中会使得配置文件不好维护。
    因为这个原因很多的开发者选择了单独的babel配置文件'.babelrc'，来配置bebel的选项等等。
    目前我们对babel的配置只是presets，所以我们先把这个配置放到'.babelrc'中吧，后面会一些别的配置信息的。

    其他资源（除了javascript）
    webpack最大的一个特点就是能把各种各样的文件当做module(模块)来对待调用。
    这些资源文件包括 js，css, font, image 等等。
    webpack能够通过 @import 和 url 值等相应的处理 css 文件的依赖关系，编译打包。

    样式表
    webpack提供了css-loader和style-loader来处理样式表。
    不同的loader处理不同的任务，
    其中css-loader处理 @import 和 url 值来解决他们的依赖关系，
    然后style-loader把这些计算后的样式表加到页面上。
    总结来说呢，就是这两个loader共同实现了把样式表嵌入到webpack的js bundle中。
    style-loader 将 css 文件以 <style></style> 标签插入 <head> 头部，
    css-loader 负责解读、加载 CSS 文件。

    css 模块（css modules）https://github.com/css-modules/css-modules
    在过去几年中，javascript发生了很多的变化，添加了很多的语言功能，
    同时更多更好的前端工具化使得开发更加高效同时建立一些最好的实践（best pratice）例如 modules。
    模块使得开发者可以把代码分成很多小的单独的单元，然后声明之间的依赖关系。
    通过好的优化工具，依赖管理，依赖顺序自动会被解决。
    但是随着javascript的发展，css还是单片的，全局的，使得开发越来越难以维护和复杂。
    最近一个项目叫做'css modules'，目的就是把模块化等等的特点带给css。
    通过css modules，所有的css的classname和animation name都是本地scoped。
    webpack从一开始就加入了这个项目在css-loader中，只是我们需要显式的开启它。
    有了这个功能，你可以export class来给指定的component。
    这样说可能比较抽象，那么我们来把这个功能添加到我们的项目当中。

    css的预处理器
    css的预处理比如sass less stylus 都扩展扩展了css的语法。
    他们让我们可以利用一些css中没有的功能来写css，
    比如变量，函数，嵌套，mixins等等。
    其实从概念上 es6/coffeescript 转译成 js和sass等转译成css是相似的。
    一个新的趋势更加宽松的css工作流程是通过应用PostCSS来实现的。
    不是通过一个完整的，固定的css语言。
    PostCSS是一个css转译工具。通过连接不同的插件，来应用不用的转译到你的css文件。
    autoprefixer是给我们的css自动添加浏览器供应商前缀。

    图片:
    图片同样可以是模块，但使用的是 file loader 或者 url loader，
    后者会根据定义的大小范围来判断是否使用 data url。
    */
    module: {
       /* preLoaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /^node_modules$/,
                loader: 'jshint-loader'
            }
        ],*/
        loaders: [
            {
                test: /\.json$/,
                exclude: /^node_modules$/,
                loader: 'json-loader'
            },
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
                loader: 'style-loader!css-loader?modules!postcss-loader'
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




















    /*plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css')
    ] : [
        new ExtractTextPlugin('[name].css')
    ],*/


    plugins: [
        new webpack.BannerPlugin('This file is created by gyh'),

        // new ExtractTextPlugin('styles.css'),

        new HtmlWebpackPlugin({title: 'azlx'}),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [require('postcss-modules-values')]
            }
        })

    ]

    /*
    将样式抽取出来为独立的文件
    将require引入的样式嵌入js文件中，有好处也有坏处。
    好处是减少了请求数，坏处也很明显，就是当你的样式文件很大时，造成编译的js文件也很大。
    我们可以使用插件的方式，将样式抽取成独立的文件。
    使用的插件就是extract-text-webpack-plugin
    根据插件在github上的解释，ExtractTextPlugin.extract可以有三个参数。
    第一个参数是可选参数，传入一个loader，当css样式没有被抽取的时候可以使用该loader。
    第二个参数则是用于编译解析的css文件loader，很明显这个是必须传入的，就像上述例子的css-loader。
    第三个参数是一些额外的备选项，貌似目前只有传入publicPath，用于当前loader的路径。
    那什么时候需要传入第一个参数呢，那就得明白什么时候样式不会被抽取出来。
    了解过code splittiog的同学便会知道，我们有些代码在加载页面的时候不会被使用时，
    使用code splitting，可以实现将这部分不会使用的代码分离出去，独立成一个单独的文件，实现按需加载。
    那么如果在这些分离出去的代码中如果有使用require引入样式文件，
    那么使用ExtractTextPlugin这部分样式代码是不会被抽取出来的。
    这部分不会抽取出来的代码，可以使用loader做一些处理，
    这就是ExtractTextPlugin.extract第一个参数的作用。
    根据上面的案例，ExtractTextPlugin需要配合plugin使用。
    new ExtractTextPlugin([id: string], filename: string, [options])
    id: string 该插件实例的唯一标志，一般是不会传的，其自己会生成。
    filename: string 文件名。可以是[name]、[id]、[contenthash]
        [name]：将会和entry中的chunk的名字一致
        [id]：将会和entry中的chunk的id一致
        [contenthash]：根据内容生成hash值
    options
    allchunk： 是否将所有额外的chunk都压缩成一个文件
    disable：禁止使用插件
   在你有多个entry的时候，便需要使用这种方式来命名 [name]、[id]、[contenthash]
*/
};