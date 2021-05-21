import path, { resolve, join } from 'path';
import os from 'os';
import webpack from 'webpack';
import UglifyJsPlugin from 'compression-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// 各种插件：https://www.webpackjs.com/plugins/
// import CopyWebpackPlugin from 'copy-webpack-plugin';  // 复制目录
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // 单独抽离样式
// import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';  // 压缩样式
interface Config extends webpack.Configuration {
  devServer: { [key: string]: any };
}

function getHost() {
  const ifaces = os.networkInterfaces();
  let ip = '';
  for (const dev in ifaces) {
    ifaces[dev].forEach((details) => {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || '127.0.0.1';
}

const config: Config = {
  entry: {
    video: ['./src/index.ts'],
  }, // 入口，如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    // publicPath: '/assets/', // 输出解析文件的目录，url 相对于 HTML 页面
    library: 'PrettyVideo', // 导出库(exported library)的名称
    libraryTarget: 'umd', // 通用模块定义
    libraryExport: 'default',
  },
  mode: 'development', // 默认是production 进行压缩
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // 处理less
        test: /\.less?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          // { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
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
      {
        exclude: /\.(js|ts|css|less|html|jpg|png|gif|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]',
        },
      },
    ],
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
  optimization: {
    // 优化项
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /.js$/, // 通过 include 设置只压缩 min.js 结尾的文件
        filename: '[name].min.js',
        // cache: true,  //是否启用文件缓存
        // parallel: true, //使用多进程并行运行来提高构建速度
      }),
      //   // new OptimizeCssAssetsPlugin({
      //   //   assetNameRegExp: /\.css$/g, // 匹配需要优化或者压缩的资源名
      //   //   cssProcessor: require('cssnano'), // 用于压缩和优化CSS 的处理器
      //   //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      //   //   canPrint: true // 表示插件能够在console中打印信息，默认值是true
      //   // }),
    ],
  },
  plugins: [
    // 插件数组
    new HtmlWebpackPlugin({
      // 创建一个在内存中生成html页面插件的配置对象
      template: path.join(__dirname, './src/index.html'), // 指定模版页面生成内存中的hmtl
      filename: 'index.html', // 指定生成的页面名称
    }),
    // 提取css文件
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([ // 打包复制目录
    //   {
    //     from:__dirname+'/src/index.d.ts',
    //     to:__dirname+'/dist/index.d.ts'
    //   }
    // ])
  ],
  devServer: {
    compress: true, // gizp
    host: getHost(),
    port: '8081',
    open: false,
    // proxy: { '/api': 'http://localhost:3000' },
    static: resolve(__dirname, 'dist'), // 设置静态目录 服务器启动根目录
  },
};

export default config;
