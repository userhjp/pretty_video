const { resolve } = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true, // gizp
    host: getHost(),
    // port: '8080',
    open: false,
    // proxy: { '/api': 'http://localhost:3000' },
    static: resolve(__dirname, 'build'), // 设置静态目录 服务器启动根目录
  },
};

function getHost() {
  const ifaces = require('os').networkInterfaces();
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

module.exports = merge(config, devConfig);

// asset-modules
// webpack5 之前我们处理静态资源比如。图片字体之类的资源的时候等，需要用到url-loader，file-loader，raw-loader，webpack5则放弃了这三个loader，这三个loader在github上也停止了更新。
// webpack5使用四种新增的资源模块（Asset Modules）替代了这些loader的功能。
// asset/resource 将资源分割为单独的文件，并导出url，就是之前的 file-loader的功能.
// asset/inline 将资源导出为dataURL（url(data:)）的形式，之前的 url-loader的功能.
// asset/source 将资源导出为源码（source code）. 之前的 raw-loader 功能.
// asset 自动选择导出为单独文件或者 dataURL形式（默认为8KB）. 之前有url-loader设置asset size limit 限制实现。
// 如果Rule.type为，asset则Rules.parser选项可以是描述条件的对象或函数，该条件是将文件内容编码为Base64还是将其作为单独的文件发送到输出目录中。
// 如果Rule.type为asset或，asset/inline则Rule.generatoroption可以是描述模块源编码的对象，也可以是通过自定义算法对模块源编码的函数。
