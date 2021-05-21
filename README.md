# video播放器

- 不依赖三方库，TypeSrcipt + less + html编写， 使用 webpack 将less,ts,html,svg打包umd模块方便各种方式引入， 自定义video控制条。
- 自定义 进度条、进度条拖动、音量控制、倍速切换、全屏 等基础功能。
- 完全基于video标签实现，只是单纯自定义了控制条，支持视频格式参考video标签。
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
 import PrettyVideo from 'video.bundle';

 const myVideo = new PrettyVideo();
 myVideo.init(elId, obj: Config);
```

## API

``` javaSrcipt
// config
export interface Config {
    /** 视频加载是否自动播放 默认false */
    autoplay?: boolean;
    /** 播放地址 */
    src?: string;
    /** 封面 */
    poster?: string;
    /** 是否自动隐藏控制栏 controls 为 true 有效*/
    autoHideControls?: boolean;
    /** 是否允许点击、拖动进度条跳转进度 默认true*/
    isFastForward?: boolean;
    /** 是否隐藏全屏按钮 默认fasle*/
    hideFullScreen?: boolean;
    /** 显示控制条 默认true */
    controls?: boolean;
    /** 视频结束是否循环播放 */
    loop?: boolean;
    /** 预加载 默认 auto*/
    preload?: 'auto' | 'meta' | 'none';
}
// 方法
export default class PrettyVideo {
    /** 初始化 */
    init(el: string | HTMLElement, config: Config): void;
    /** 获取当前播放时长和总时长 */
    getDuration(): { currentSecond: number, durationSecond: number, currentText: string, durationText: string };
    /** 修改config */
    setupConfig(newConfig: Config): void;
    /** 修改播放地址 */
    setUrl(obj: { src: string, poster?: string }): void;
    /** 重置播放 */
    reload(): void;
    /** 播放 */
    play(): void;
    /** 暂停 */
    pause(): void;
     /** 是否暂停状态 */
    isPause(): boolean;
     /** 设置音量 0-1 */
    setVolum(num: number): void;
    /** 监听事件 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'playing' | 'ended' | 'error' | 'seeked' | 'loadedmetadata' */
    on(eventName: string, callback: (obj: { type }) => void): void;
    /** 取消事件监听 */
    unOn(eventName: string): void
    /** 销毁video包括dom元素 */
    dispose(): void
}
```

## 其他

1. IE兼容 iE10+
