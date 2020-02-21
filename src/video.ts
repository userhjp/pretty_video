import './index.less';

export default class Video {
    containerElemelt: any; // 容器
    playerElement: any; // 播放器
    volumesliderElement: any; // 音量滑动
    progressElement: any; // 进度条
    currentElement: any; // 进度条当前进度
    dotElement: any; // 进度条拖动按钮
    timeElement: any; // 当前播放时间进度
    speedListElement: any; // 倍速列表
    speedBtnElement: any; // 倍速按钮
    
    autoplay = false; // 自动播放
    isFullscreen = false; // 全屏
    isMove = false; // 进度条是否拖动中，防止拖动时候视频播放更新进度条
    currentvolum = 1; // 当前视频播放音量 0 - 1
    // 开始加载 | 加载完成 | 播放中 | 暂停中 | 缓冲中 | 缓冲就绪 | 播放完毕 | 错误

    constructor() {
    }
    
    init(el) {
      let videoContainer = typeof el === 'string' ? document.getElementById(el) : el;
      videoContainer.innerHTML = this.videoElement;
      this.containerElemelt = videoContainer.querySelector('#video_container');;
      this.playerElement = videoContainer.querySelector('#myVideo');
      this.progressElement = videoContainer.querySelector('#progress');
      this.volumesliderElement = videoContainer.querySelector('#volumeslider');
      this.currentElement = this.progressElement.getElementsByTagName('div')[0];
      this.dotElement = this.progressElement.getElementsByTagName('i')[0];
      this.timeElement = videoContainer.getElementsByClassName('time')[0];
      this.speedListElement = videoContainer.querySelector('#speed_con').children;
      this.speedBtnElement = videoContainer.querySelector('#speed_btn');
      this.playerElement.src = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'// 'https://media.w3.org/2010/05/sintel/trailer.mp4';
      this.playerElement.poster = 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg';
      this.playerElement.autoplay = this.autoplay;
      this.initEvent();
    }
    
    /** 重新加载视频 */
    reload = () => this.playerElement.load();
    
    /** 开始、暂停播放 */
    play() {
      if (this.playerElement.paused) {
        this.playerElement.play();
      } else {
        this.playerElement.pause();
      }
    }
    
    /** 设置倍速 */
    setPlaybackRate(e: string) {
      this.speedBtnElement.innerText = e;
      this.playerElement.playbackRate = parseFloat(e);
    }
    
    /** 设置音量 */
    setVolum(value) {
      value = parseFloat(value);

      this.playerElement.volume = value;
      this.volumesliderElement.style.backgroundSize = `${value * 100}% 100%`; /*设置左右宽度比例*/
      this.containerElemelt.querySelector('#volume_img').src = value ? 'src/assets/mn_shengyin_fill.svg' : 'src/assets/mn_shengyinwu_fill.svg'
    }
    
    /** 全屏 */
    fullscreen() {
      const fullScreenElement = this.containerElemelt;
      if (this.isFullscreen) {
        this.isFullscreen = false;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (fullScreenElement.webkitCancelFullScreen) {
          fullScreenElement.webkitCancelFullScreen();
        } else if (fullScreenElement.mozCancelFullScreen) {
          fullScreenElement.mozCancelFullScreen();
        } else if (fullScreenElement.msExitFullscreen) {
          fullScreenElement.msExitFullscreen();
        }
      } else {
        this.isFullscreen = true;
        if (fullScreenElement.requestFullscreen) {
          fullScreenElement.requestFullscreen();
        } else if (fullScreenElement.webkitRequestFullScreen) {
          fullScreenElement.webkitRequestFullScreen();
        } else if (fullScreenElement.mozRequestFullScreen) {
          fullScreenElement.mozRequestFullScreen();
        } else if (fullScreenElement.msRequestFullscreen) {
          // IE11
          fullScreenElement.msRequestFullscreen();
        }
      }
    }
    
    /** 更新当前状态 */
    setState(state: 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'playing' | 'ended' | 'error') {
      const video_cover = this.containerElemelt.getElementsByClassName('video_cover');
      for(let cover of video_cover) { cover.style.display = 'none'; }
      switch (state) {
          case 'error':
            this.containerElemelt.querySelector('#v_error').style.display = 'block';
            break;
          case 'canplay':
          case 'pause':
          case 'ended':
            this.containerElemelt.querySelector('#v_play').style.display = 'block';
            break;
          case 'waiting':
            this.containerElemelt.querySelector('#v_waiting').style.display = 'block';
            break;
          default:
            break;
      }
      console.log(state);
    }

    /** 获取进度条宽度，存在旋转屏幕导致宽度不一致，实时获取 */
    getProgressWidth() {
      return this.progressElement.clientWidth;
    }
    
    /** 视频当前播放事件进度/进度条样式 */
    setDuration(position: number) {
      const maxWidth = this.getProgressWidth(); // 进度总长度，进度条-按钮
      const slitherCurrentTime = position / maxWidth * this.playerElement.duration; // 当前拖动进度位置时间
      
      const currentTime = `${this.PrefixInteger(slitherCurrentTime / 60)}:${this.PrefixInteger(slitherCurrentTime % 60)}`; // 当前播放进度- 分:秒
      const duration = `${this.PrefixInteger(this.playerElement.duration / 60)}:${this.PrefixInteger(this.playerElement.duration % 60)}`; // 视频总长度- 分:秒
      this.timeElement.innerHTML = `${currentTime} / ${duration}`
      this.currentElement.style.width = position + 'px';
      this.dotElement.style.left = position + 'px';
    }
    
    /** 是否是移动端 */
    isPC() {
      const userAgentInfo = navigator.userAgent;
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];  // 判断用户代理头信息
      let flag = true;
      for (const i in Agents) {
        if (userAgentInfo.indexOf(Agents[i]) !== -1) { flag = false; break; }
      }
      return flag;   // true为pc端，false为非pc端
    }
    
    /** 各种初始化事件 */
    initEvent() {
      const video = this.playerElement;
      const isPc = this.isPC();
      // pc端 和移动端事件区分
      const touchstart = isPc ? 'mousedown' : 'touchstart';
      const touchmove = isPc ? 'mousemove' : 'touchmove';
      const touchend = isPc ? 'mouseup' : 'touchend';
      
      // 倍速列表点击事件
      for(const i of this.speedListElement) {
          i.addEventListener('click', (e) => {
            for(const el of this.speedListElement) { el.classList.remove("on"); }
              e.target.classList.add("on");
              this.setPlaybackRate(e.target.innerText);
          })
      }

      // 播放按钮点击
      const playBtn = this.containerElemelt.getElementsByClassName('play_btn');
      for(const el of playBtn) { 
        el.addEventListener('click', (e) => { 
            this.play();
            this.containerElemelt.getElementsByClassName('play play_btn')[0].src = this.playerElement.paused ? 'src/assets/bofang.svg' : 'src/assets/zanting.svg';
        })
      }

      // 全屏按钮点击
      this.containerElemelt.querySelector('#v_fullscreen').addEventListener('click', (e) => { 
        this.fullscreen();
        e.target.src = this.isFullscreen ? 'src/assets/suoxiao.svg' : 'src/assets/quanping.svg'
      })
      

      // 进度条开始拖动
      this.dotElement.addEventListener(touchstart, (event) => {
        event.preventDefault();
        const maxWidth = this.progressElement.clientWidth - this.dotElement.clientWidth; // 进度总长度，进度条-按钮
        // 如果这个元素的位置内只有一个手指的话
        if (isPc || event.targetTouches.length === 1) {
          const touch = isPc ? event : event.targetTouches[0];
          // 把元素放在手指所在的位置
          const disX = touch.pageX - this.dotElement.offsetLeft;
          const getPosition = (e) => {
            let l = e.pageX - disX;
            if (l < 0) { l = 0; }
            if (l > maxWidth) { l = maxWidth; }
            return l;
          };
          // 开始拖动
          const move = (e) => {
            this.isMove = true;
            const touch2 = isPc ? e : e.targetTouches[0];
            const position = getPosition(touch2);
            this.setDuration(position);
          };
    
          // 如果浏览器下，需要全局监听拖动
          const dotElmt = isPc ? window : this.dotElement;
          // 拖动完成 删除事件
          const chend = (e) => {
            // 拖动完成更新播放器时间
            const touch2 = isPc ? e : e.changedTouches[0];
            const position = getPosition(touch2);
            video.currentTime = position / maxWidth * video.duration;
            this.isMove = false;
            dotElmt.removeEventListener(touchmove, move);
            dotElmt.removeEventListener(touchend, chend);
          };
          dotElmt.addEventListener(touchmove, move);
          dotElmt.addEventListener(touchend, chend);
        }
      }, false);
    
      let timeout = null;
      // 实现效果，pc端鼠标移入视频显示控制条，3秒无操作隐藏控制条
      // 移动端触摸视频时展示控制条, 3秒无操作隐藏控制条
      const onmouseover = (e) => {
        this.containerElemelt.classList.add('showControls');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.containerElemelt.classList.remove('showControls');
        }, 3000);
      };
    
      // 隐藏控制条pc和移动端失去焦点事件差异
      if (isPc) {
        this.containerElemelt.addEventListener('mousemove', onmouseover);
        this.containerElemelt.querySelector('#volume_img').addEventListener('click', (e) => {
            const val = parseFloat(this.volumesliderElement.value) > 0 ? 0.0 : this.currentvolum;
            this.volumesliderElement.value = val;
            this.setVolum(val);
        })
      } else {
        this.containerElemelt.ontouchstart = onmouseover;
      }

      // 双击播放器暂停，移动端无双击时间，用两次点击时间模拟 300 毫秒2次点击为双击
      let clickTime = 0;
      this.playerElement.addEventListener('click', () => {
        const nowTime = new Date().getTime();
        if(nowTime - clickTime < 300) {
            this.play()
        }
        clickTime = nowTime;
      });
    
      // 阻止事件冒泡到点击进度条
      this.dotElement.onmousedown = (event) => event.stopPropagation();
    
      // 鼠标点击的时候，跳转进度
      this.progressElement.onmousedown = (event) => {
        const maxWidth = this.getProgressWidth();
        let layerX = event.layerX;
        if (layerX > maxWidth) { layerX = maxWidth; }
        video.currentTime = layerX / maxWidth * video.duration; // 计算出点击的位置在总时间里面占多少。
        this.setDuration(layerX);
      };
    
      // 音量拖动事件
      this.volumesliderElement.oninput = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        this.currentvolum = value;
        this.setVolum(value);
        
      };
    
      // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
      video.addEventListener('loadstart', (e) => {
        this.setState('loadstart');
      });
    
      // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
      video.addEventListener('durationchange', (e) => {
        const maxWidth = this.getProgressWidth();
        this.setDuration(video.currentTime / video.duration * maxWidth);
      });
    
      // loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
      // video.addEventListener('loadedmetadata', (e) => {
      //   console.log('视频的元数据已加载');
      // });
    
      // loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
      // video.addEventListener('loadeddata', (e) => {
      //   console.log('提示当前帧的数据是可用的');
      //   this.setState('loadeddata');
      // });
    
      // progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发
      // video.addEventListener('progress', (e) => {
      //   console.log('提示视频正在下载中');
      //   console.log(e);
      // });
    
      // canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
      video.addEventListener('canplay', (e) => {
        this.setState('canplay');
      });
    
      // canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
      // video.addEventListener('canplaythrough', (e) => {
      //   console.log('提示视频能够不停顿地一直播放');
      // });
    
      // play：播放监听
      video.addEventListener('play', (e) => {
        this.setState('play');
      });
    
      // pause：暂停监听
      video.addEventListener('pause', (e) => {
        this.setState('pause');
      });
    
      // seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
      // video.addEventListener('seeking', (e) => {
      //   console.log('开始移动进度条');
      // });
    
      // // seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
      // video.addEventListener('seeked', (e) => {
      //   console.log('进度条已经移动到了新的位置');
      // });
    
      // waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
      video.addEventListener('waiting', (e) => {
        this.setState('waiting');
      });
    
      // playing：当视频在已因缓冲而暂停或停止后已就绪时触发
      video.addEventListener('playing', (e) => {
        this.setState('playing');
      });
    
      // timeupdate：目前的播放位置已更改时，播放时间更新
      video.addEventListener('timeupdate', (e) => {
        if (!this.isMove) { // 防止拖动进度条时候更新
          const maxWidth = this.getProgressWidth();
          this.setDuration(video.currentTime / video.duration * maxWidth);
        }
      });
    
      // ended：播放结束
      video.addEventListener('ended', (e) => {
        this.setState('ended');
      });
    
      // error：播放错误
      video.addEventListener('error', (e) => {
        this.setState('error');
      });
    
      // volumechange：当音量更改时
      // video.addEventListener('volumechange', (e) => {
      //   console.log('音量更改');
      // });
    
      // stalled：当浏览器尝试获取媒体数据，但数据不可用时
      // video.addEventListener('stalled', (e) => {
      //   console.log('媒体数据不可用');
      // });
    
      // ratechange：当视频的播放速度已更改时
      // video.addEventListener('ratechange', (e) => {
      //   console.log('ratechange');
      // });
    }
    
    /**
     * utils 数字向下取整
     * @param num 数字
     * @param len 长度
     */
    PrefixInteger(num: number, len: number = 2) {
      num = isNaN(num) ? 0 : Math.floor(num); // 向下取整
      return (Array(len).join('0') + num).slice(-len);
    }

    videoElement = `
        <div class="video_player" id="video_container">
        <video #myVideo id="myVideo" class="video" width="100%">
            您的浏览器不支持Video播放器
        </video>
        <div class="controls" id="video_controls">
            <div id="progress" class="progress_bar">
                <div></div>
                <i></i>
            </div>
            <div class="controls_left">
                <img class="play play_btn" src="src/assets/bofang.svg">
                <div class="time"></div>
            </div>
            <div class="controls_right">
                <!-- 音量 -->
                <div class="volume_bth">
                    <div class="volume_con">
                        <div class="volume_slider">
                            <input id="volumeslider" type='range' min="0" max="1" step="0.01" value="0.8"/>
                        </div>
                    </div>
                    <img id="volume_img" class="fullscreen" src="src/assets/mn_shengyin_fill.svg">
                </div>
                <!-- 倍速 -->
                <div class="speed_bth">
                    <div id="speed_con" class="speed_li">
                        <div>2.0x</div>
                        <div>1.5x</div>
                        <div>1.2x</div>
                        <div class="on">1.0x</div>
                        <div>0.5x</div>
                    </div>
                    <span id="speed_btn">1.0x</span>
                </div>
                <!-- 全屏 -->
                <img id="v_fullscreen" class="fullscreen" src="src/assets/quanping.svg">
            </div>
        </div>
        <div class="video_cover" id="v_error">
            <div class="cover_content">
                <img src="src/assets/error.svg">
                <div class="tips_text tips_error">资源加载失败~</div>
            </div>
        </div>
        <div class="video_cover" id="v_play">
            <div class="cover_content">
                <img class="play_btn" src="src/assets/bofang.svg">
            </div>
        </div>
        <div class="video_cover" id="v_waiting">
            <div class="cover_content">
                <div class="loading">
                    <div>
                        <div class="spot"></div>
                        <div class="spot"></div>
                        <div class="spot"></div>
                        <div class="spot"></div>
                        <div class="spot"></div>
                    </div>
                    <div class="tips_text">缓冲中...</div>
                </div>
            </div>
        </div>
    </div>
    `
}
