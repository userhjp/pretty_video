const path = require('path');
//导入htm-webpack-plugin插件
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: "production",
    entry: path.resolve(__dirname, 'src/index.ts'), // 入口，如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
    output: {
        filename: "[name].bundle.js", // 输出名称
        path: path.resolve(__dirname, "dist"), // 输出路径
        // publicPath: "./", // 输出解析文件的目录，url 相对于 HTML 页面
        library: "prettyVideo", // 导出库(exported library)的名称
        libraryTarget: "umd", // 通用模块定义
    },
    // devServer: {
    //   contentBase: './dist'
    // },
    module: {
      rules: [
        { // 处理ts
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'awesome-typescript-loader' },
          ]
        },
        { // 处理less
          test: /\.less?$/,
          exclude: /node_modules/,
          use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'less-loader' }
          ]
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
    plugins: [//插件数组
      new htmlWebpackPlugin({ //创建一个在内存中生成html页面插件的配置对象
        template:path.join(__dirname,'./src/index.html'),    //指定模版页面生成内存中的hmtl
        filename:'index.html'   //指定生成的页面名称
      }),
      // new CopyWebpackPlugin([ // 打包复制目录
      //   {
      //     from:__dirname+'/src/assets',
      //     to:__dirname+'/dist/assets'
      //   }
      // ])
    ]
};
