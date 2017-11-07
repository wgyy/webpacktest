const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var glob=require("glob")
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
        // entry: getEntry(__dirname+"/src/js/**/*.js"), //已多次提及的唯一入口文件
        entry: {
            'index':__dirname+'/src/js/index.js'
        },
        output: {
            path: __dirname + "/dist",
            filename: "[name].js"
        },
        devtool: 'eval-source-map',
        devServer: {
            contentBase: "./dist", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true,
            open:true,
            port: 3000
        },
        module: {
            rules: [
                {
                    test:require.resolve("jquery"),
                    loader:"expose-loader?$!expose-loader?jQuery"
                },
                {
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                },
                // { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
                ,{
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                      })
                },{
                    test:  /\.scss$/,
                    //  loader:  "style-loader!css-loader!sass-loader"
                    use:ExtractTextPlugin.extract({fallback: "style-loader", use:['css-loader','sass-loader']})
                },
                //     {
                //     test:  /\.less$/,
                //      loader:  "style!css!less"
                // }
            ]
            },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/views/entry/index.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            "window.$":"jquery"
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //       warnings: false
        //     }
        //   }),

    new ExtractTextPlugin("styles.css")
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/src/views/entry/index.html" //new 一个这个插件的实例，并传入相关的参数
        // }),
        // new CleanWebpackPlugin(
        //     ['dist/**',],　 //匹配删除的文件
        //     {
        //         root: __dirname,       　　　　　　　　　　//根目录
        //         verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        //         dry:      false        　　　　　　　　　　//启用删除文件
        //     }
        // )

    ],
}
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname.replace(path.resolve(__dirname,'./src'),""), basename);
        entries[pathname] = entry;
    }
    return entries;
}