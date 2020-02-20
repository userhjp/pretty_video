const path = require('path');

module.exports = {
    // mode: "production",
    entry: path.resolve(__dirname, 'src/main.ts'), // 入口，如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
    output: {
        filename: "[name].bundle.js", // 输出名称
        path: path.resolve(__dirname, "dist"), // 输出路径
        // publicPath: "/src/", // 输出解析文件的目录，url 相对于 HTML 页面
        library: "prettyVideo", // 导出库(exported library)的名称
        libraryTarget: "umd", // 通用模块定义
    },
    // devServer: {
    //   contentBase: './dist'
    // },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "awesome-typescript-loader"
          },
          {
            test: /\.less?$/,
            exclude: /node_modules/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'less-loader' }
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};
