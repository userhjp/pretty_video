## video播放器

- 不依赖三方库，TypeSrcipt + less + html编写， 可以用 webpack 将less,js,html,svg打包umd模块方便各种方式引入， 自定义video标签控制栏样式。
- 自定义 进度条、进度条拖动、音量控制、倍速切换、全屏 等基础功能。
- 完全基于video标签实现，只是单纯自定义了控制台，支持视频格式参考video标签。
- 简单处理了 移动端 和 PC端 的事件兼容，例如拖动事件、鼠标移入进度条事件等。
- 如果你是TypeSrcipt环境使用就更方便了，参考src目录
- PS：原生video标签是真的丑，不是一般的丑，所以自己实现了个简单的播放器，该播放器使用仅限于对播放功能需求不高只是简单的播放视频又嫌原video太丑的人员，后期有时间会扩展, 清晰度 、 选集 功能，如有需要自行修改源码，源码大部分都有注释，有点乱(捂脸)，我没加因为，一般小需求播放视频用不上，大需求播放视频这点功能肯定不够用，需要的自行修改源码重新打包。代码水平有限，大佬轻喷，欢迎提issue

## 开始使用

 > 将代码克隆到本地
 > npm install
 > npm run dev

## 简单直接使用

``` javaSrcipt
  import Video from './video';
  window.onload = function () {
      const video = document.getElementById('MyVideo');
      const obj = new Video();
      obj.init({
          el: video,
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          poster: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg',
      });
  }

  interface Config {
    el?: string | HTMLElement; // Element或者容器ID
    autoplay?: boolean; // 视频加载是否自动播放
    src?: string; // 播放地址
    poster?: string; // 封面
    autoHideControls?: boolean; // 是否自动隐藏控制栏
    isFastForward?: boolean; // 是否允许点击、拖动进度条跳转进度
    hideFullScreen?: boolean; // 是否隐藏全屏按钮
  }
```

## 注意

1. 打包 npm run build 需要将 webpack.config.js 文件 修改入口entry地址为video.ts  index.ts只是测试用，不用打包进去（第一次使用webpack自己配置打包，很多不是太熟悉 - - 见谅),然后只需要main.bundle.js 文件，将该文件复制到您的项目直接引入
2. 目前webpack打包，不支持IE，若需要自行添加webpack 配置babel-polyfill。
