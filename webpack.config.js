const { resolve, join } = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    PrettyVideo: ['./src/index.ts'],
    test: ['./src/test.ts'],
  }, // 入口，如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/', // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    library: '[name]', // 导出库(exported library)的名称
    libraryTarget: 'umd', // 通用模块定义
    libraryExport: 'default',
  },
  mode: 'development', // 默认是production 进行压缩
  devtool: false, // 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // /*
          //  开启多进程打包。
          //  进程启动大概为600ms，进程通信也有开销。
          //  只有工作消耗时间比较长，才需要多进程打包,目前加上后反而慢了1s
          //  */
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 2, // 进程2个
          //   },
          // },
          'babel-loader',
        ],
      },
      {
        // 处理less
        test: /\.less?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          // { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  // 自动添加样式前缀
                  Autoprefixer(),
                ],
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      // 处理其他资源
      // {
      //   exclude: /\.(js|ts|css|less|html|jpg|png|gif|svg)/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/[name][ext][query]',
      //   },
      // },
    ],
  },
  optimization: {
    minimize: true, // 开发环境也开启压缩
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  resolve: {
    // 解析模块请求的选项
    modules: [
      // 用于模块查找的目录
      'node_modules', // 例如导入 import { format } from 'date-fns'; 这里指 date-fns 是在node_modules查找
    ],
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // 使用的扩展名
  },
  externals: [], // 不打包的模块，例如：externals: ['date-fns']，打包时候将不会对date-fns模块进行打包到
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, './src/index.html'), // 指定模版页面生成内存中的hmtl
      filename: 'index.html', // 指定生成的页面名称
    }),
    // 提取css文件
    // new MiniCssExtractPlugin({
    //   // 类似 webpackOptions.output里面的配置 可以忽略
    //   filename: '[name].css',
    // }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([ // 打包复制目录
    //   {
    //     from:__dirname+'/src/index.d.ts',
    //     to:__dirname+'/dist/index.d.ts'
    //   }
    // ])
  ],
};
