# video播放器

- 不依赖三方库，TypeSrcipt + less + html编写， 可以用 webpack 将less,ts,html,svg打包umd模块方便各种方式引入， 自定义video标签控制栏样式。
- 自定义 进度条、进度条拖动、音量控制、倍速切换、全屏 等基础功能。
- 完全基于video标签实现，只是单纯自定义了控制台，支持视频格式参考video标签。
- 简单处理了 移动端 和 PC端 的事件兼容，例如拖动事件、鼠标移入进度条事件等。
- PS：原生video标签各个浏览器样式不一，并且总感觉不好看，所以自己实现了个简单的播放器，后期有时间会扩展, 清晰度 、 选集 功能，如有需要自行修改源码，源码大部分都有注释，有点乱(捂脸)，代码水平有限，大佬轻喷，欢迎issue.

## install

 > npm install pretty-video;
 > import PrettyVideo from 'pretty-video';

## 使用

``` javaSrcipt
 // 直接浏览器标签引入
 <body>
     <div id="MyVideo"></div>
    <script type="text/javascript" src="./video.bundle.js"></script></body>
    <script type="text/javascript">
        window.onload = function () {
            var video = document.getElementById('MyVideo');
            var myVideo = new PrettyVideo();
            myVideo.init(video, {
                src: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4',
                poster: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg',
            });
        }
    </script>
 </body>

 // es6
 import PrettyVideo from './video.bundle';

 const myVideo = new PrettyVideo();
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

## API

``` javaSrcipt
    init(id, config: Config) // 初始化
    getDuration() // 获取视频当前进度和总时长
    setupConfig(newConfig: Config): void // 更新config
    setUrl(object: { src: string, poster?: string }): void // 设置播放地址
    reload(): void // 重新加载视频
    play(): void // 播放
    pause(): void // 暂停
    isPause(): boolean // 当前是否暂停状态
    setVolum(num: numner): void // 设置音量 0-1
    on(eventName: string, callback: () => {}): void // 事件监听 同video事件 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'playing' | 'ended' | 'error' | 'seeked'
    unOn(eventName: string): void // 取消事件监听
```

## 其他

1. IE兼容 iE10+
