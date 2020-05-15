const path = require('path');
//导入htm-webpack-plugin插件
const htmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离样式
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩样式
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js

module.exports = {
    // mode: "production",
    entry: {
      video: [path.resolve(__dirname, 'src/video.ts')], // 'babel-polyfill', 
    }, // 入口，如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
    output: {
        filename: "[name].bundle.js", // 输出名称
        path: path.resolve(__dirname, "dist"), // 输出路径
        publicPath: "/dist", // 输出解析文件的目录，url 相对于 HTML 页面
        library: "prettyVideo", // 导出库(exported library)的名称
        libraryTarget: "umd", // 通用模块定义
        libraryExport: 'default',
    },
    devServer: {
      contentBase: './src',
      inline: true, // 自动刷新
      host: 'localhost',
      // port: 'auto',
      // open: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        },
        { // 处理less
          test: /\.less?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'less-loader' }
          ],
          // use: [
          //   {
          //     loader: MiniCssExtractPlugin.loader
          //   },
          //   'css-loader',
          //   'less-loader'
          // ]
        },
        { // 处理图片
          test: /\.(png|svg|jpg|gif)$/,
          use: {
                loader: 'url-loader',
                options: {
                    name:'assets/[name].[ext]',  //图片复制到指定位置
                    limit:8192  //单位byte，小于8KB的图片都会被编码(base64)放打包在js中
                }
            }
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    optimization: {//优化项
      // minimizer: [
      //   new UglifyJsPlugin({
      //     cache: true,  //是否启用文件缓存
      //     parallel: true, //使用多进程并行运行来提高构建速度
      //   }),
      //   new OptimizeCssAssetsPlugin({
      //     assetNameRegExp: /\.css$/g, // 匹配需要优化或者压缩的资源名
      //     cssProcessor: require('cssnano'), // 用于压缩和优化CSS 的处理器
      //     cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      //     canPrint: true // 表示插件能够在console中打印信息，默认值是true
      //   }),
      // ],
    },
    plugins: [//插件数组
      new htmlWebpackPlugin({ //创建一个在内存中生成html页面插件的配置对象
        template:path.join(__dirname,'./src/index.html'),    //指定模版页面生成内存中的hmtl
        filename:'index.html'   //指定生成的页面名称
      }),
      // // 提取css文件
      // new MiniCssExtractPlugin({
      //   // 类似 webpackOptions.output里面的配置 可以忽略
      //   filename: '[name].css',
      //   chunkFilename: '[id].css',
      // }),
      // new CopyWebpackPlugin([ // 打包复制目录
      //   {
      //     from:__dirname+'/src/assets',
      //     to:__dirname+'/dist/assets'
      //   }
      // ])
    ]
};
