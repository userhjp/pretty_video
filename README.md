# video播放器

- 不依赖三方库，TypeSrcipt + less + html编写， 可以用 webpack 将less,ts,html,svg打包umd模块方便各种方式引入， 自定义video标签控制栏样式。
- 自定义 进度条、进度条拖动、音量控制、倍速切换、全屏 等基础功能。
- 完全基于video标签实现，只是单纯自定义了控制台，支持视频格式参考video标签。
- 简单处理了 移动端 和 PC端 的事件兼容，例如拖动事件、鼠标移入进度条事件等。
- PS：原生video标签各个浏览器样式不一，并且总感觉不好看，所以自己实现了个简单的播放器，后期有时间会扩展, 清晰度 、 选集 功能，如有需要自行修改源码，源码大部分都有注释，有点乱(捂脸)，代码水平有限，大佬轻喷，欢迎issue.

## 运行Demo

 > 将代码克隆到本地
 > npm install
 > npm run build
 > npm run dev

## 简单直接使用

``` javaSrcipt
 // 直接浏览器标签引入
 <body>
     <div id="MyVideo"></div>
    <script type="text/javascript" src="./video.bundle.js"></script></body>
    <script type="text/javascript">
        window.onload = function () {
            var video = document.getElementById('MyVideo');
            var myVideo = new prettyVideo();
            myVideo.init(video, {
                src: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4',
                poster: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg',
            });
        }
    </script>
 </body>

 // es6
 import prettyVideo from './video.bundle';

 const myVideo = new prettyVideo();
 myVideo.init(elId, obj: Config);

  // init初始化参数配置
  interface Config {
    autoplay?: boolean; // 视频加载是否自动播放
    src?: string; // 播放地址
    poster?: string; // 封面
    autoHideControls?: boolean; // 是否自动隐藏控制栏
    isFastForward?: boolean; // 是否允许点击、拖动进度条跳转进度
    hideFullScreen?: boolean; // 是否隐藏全屏按钮
  }
```

## 注意

1. webpack打包编译成js 执行 npm run build 会将less ts svg文件打包为一个js文件， 然后只需要dist目录下 video.bundle.js，将该文件复制到您的项目直接引入即可。
2. 默认不支持IE，若需要自行添加webpack 配置babel-polyfill
3. 源码本身是一个类，如果在TypeSrcipt 环境下使用，例如Angular 中，可以不经过webpack打包，可修改少量代码封装为Angular组件。
4. 由于第一次使用webpack自定义配置打包，不是太熟悉，有什么不足的地方请指点，谢谢。
