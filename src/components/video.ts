export type VideoState = 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'timeupdate' | 'playing' | 'ended' | 'error' | 'seeked' | 'loadedmetadata' | 'canplaythrough' | 'durationchange' | 'progress' | 'x5videoenterfullscreen' | 'x5videoexitfullscreen';

export class Video {
    onEvent: (eventName: VideoState, e: any) => void; // 监听事件列表
    el: HTMLVideoElement;
    posterEl: HTMLImageElement;

    constructor() {
        this.createVideoEl();
        this.createPosterEl();
    }

    setCurrentTime(time: number) {
        this.el.currentTime = time;
    }

    /** 播放地址 */
    setUrl(object: { src: string, poster?: string }) {
        if(!this?.el) throw new Error("请先初始化播放器!");
        this.el.setAttribute('src', object.src || '');
        this.posterEl.src = object.poster;

    }

    private setState(event: VideoState, e: any) {
        if(typeof this.onEvent === 'function') {
            this.onEvent(event, e);
        }
    }

    showPoster() {
        this.posterEl.style.display = 'block';
    }

    hidePoster() {
        this.posterEl.style.display = 'none';
    }

    
    createPosterEl() {
        this.posterEl = document.createElement('img');
        this.posterEl.className="poster_img";
        this.posterEl.style.position = 'absolute';
        this.posterEl.style.top = '0';
        this.posterEl.style.left = '0';
        this.posterEl.style.objectFit = 'cover';
        this.posterEl.style.height = '100%';
        this.posterEl.style.width = '100%';
        this.posterEl.style.display = 'none';
        this.posterEl.onerror = () => {
            this.hidePoster();
        }
    }

    // 创建video
    createVideoEl() {
        const videoEl = document.createElement('video');
        videoEl.className = 'p_video';
        const text = document.createTextNode('您的浏览器不支持Video播放器');
        videoEl.appendChild(text);
        const ua = navigator.userAgent.toLocaleLowerCase();
        // x5内核
        if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
            videoEl.setAttribute('x5-video-player-fullscreen', 'true'); // 进入全屏通知
            videoEl.setAttribute('x-webkit-airplay', 'true'); // 设置允许设备播放
            // this.el.setAttribute('x5-playsinline', 'true'); // 设置android在微信中内联播放视频 这是坑微信无法正常横屏
            videoEl.setAttribute('x5-video-player-type', 'h5'); // 关闭同层X5内核播放器    x5-video-player-type='h5' 启用Ｈ5同层播放器
            videoEl.setAttribute('x5-video-orientation', 'landscape|portrait'); // 控制横竖屏 可选值： landscape 横屏, portraint竖屏  默认值：portraint
            // 进入全屏
            videoEl.addEventListener('x5videoenterfullscreen', (e) => this.setState('x5videoenterfullscreen', e), false);
            // 退出全屏时
            videoEl.addEventListener('x5videoexitfullscreen', (e) => this.setState('x5videoenterfullscreen', e), false);
        } else {
            // ios端
            videoEl.setAttribute('webkit-playsinline', 'true'); // // 设置ios在微信中内联播放视频 ios9
            videoEl.setAttribute('playsinline', 'true'); // 设置ios在微信中内联播放视频 ios10/ios11
        };

        // 双击播放器暂停，移动端无双击事件，用两次点击时间模拟 300 毫秒2次点击为双击
        let clickTime = 0;
        videoEl.addEventListener('click', () => {
            const nowTime = new Date().getTime();
            if (nowTime - clickTime < 300) {
                if(videoEl.paused) {
                    videoEl.play()
                } else {
                    videoEl.pause()
                }
            }
            clickTime = nowTime;
        });

        this.el = videoEl;
        this.initEvent();
    }

    private initEvent() {
      // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
      this.el.addEventListener('loadstart', (e) => this.setState('loadstart', e));
    
      // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
      this.el.addEventListener('durationchange', (e) => this.setState('durationchange', e));
    
      // loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
      this.el.addEventListener('loadedmetadata', (e) => this.setState('loadedmetadata', e));
    
      // loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
      // this.el.addEventListener('loadeddata', (e) => {
      //   console.log('提示当前帧的数据是可用的');
      //   this.setState('loadeddata');
      // });
    
      // progress：浏览器缓存监听。当浏览器正在缓存指定的音频/视频时触发
      this.el.addEventListener('progress', (e) => this.setState('progress', e));
    
      // canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
      this.el.addEventListener('canplay', (e) => this.setState('canplay', e));
    
      // canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
      this.el.addEventListener('canplaythrough', (e) => this.setState('loadedmetadata', e));
    
      // play：播放监听
      this.el.addEventListener('play', (e) => this.setState('play', e));
    
      // pause：暂停监听
      this.el.addEventListener('pause', (e) => this.setState('pause', e));
    
      // seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
      // this.el.addEventListener('seeking', (e) => {
      //   console.log('开始移动进度条');
      // });
    
      // // seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
      this.el.addEventListener('seeked', (e) => this.setState('seeked', e));
    
      // waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
      this.el.addEventListener('waiting', (e) => this.setState('waiting', e));
    
      // playing：当视频在已因缓冲而暂停或停止后已就绪时触发
      this.el.addEventListener('playing', (e) => this.setState('playing', e));
    
      // timeupdate：目前的播放位置已更改时，播放时间更新
      this.el.addEventListener('timeupdate', (e) => this.setState('timeupdate', e));
    
      // ended：播放结束
      this.el.addEventListener('ended', (e) => this.setState('ended', e));
    
      // error：播放错误
      this.el.addEventListener('error', (e) => this.setState('error', e));
    
      // volumechange：当音量更改时
      // this.el.addEventListener('volumechange', (e) => {
      //   console.log('音量更改');
      // });
    
      // stalled：当浏览器尝试获取媒体数据，但数据不可用时
      // this.el.addEventListener('stalled', (e) => {
      //   console.log('媒体数据不可用');
      // });
    
      // ratechange：当视频的播放速度已更改时
      // this.el.addEventListener('ratechange', (e) => {
      //   console.log('ratechange');
      // });
    }
} 