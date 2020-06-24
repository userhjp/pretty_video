import './index.less';
import Utils from './utils';
import { Config } from 'index';

class PrettyVideo {
   /** 容器 */
   private containerElemelt: any;
   /** video播放器 */
   private videoElement: any;
   /** 控制条 */
   private controlsElement: any;
   /** 音量滑动按钮 */
   private volumesliderElement: any;
   /** 进度条容器 */
   private progressElement: any;
   /** 缓冲进度条 */
   private progressBufferElement: any;
   /** 进度条当前进度 */
   private currentSpElement: any;
   /** 进度条拖动点按钮 */
   private dotElement: any;
   /** 当前鼠标位置提示label */
   private dateLabelElement: any;
   /** 当前播放时间进度 */
   private timeElement: any;
   /** 倍速列表 */
   private speedListElement: any;
   /** 倍速按钮 */
   private speedBtnElement: any;
   /** 播放按钮 */
   private playBtnElement: any;
   /** 遮掩层 */
   private coverElement: any;
   private config: Config = {
      autoplay: false,
      autoHideControls: true,
      isFastForward: true,
      hideFullScreen: false,
      controls: true, 
      loop: false, 
      preload: 'auto'
    }
    private isFullscreen = false; // 全屏状态
    private isMove = false; // 进度条是否拖动中，防止拖动时候视频正常播放更新进度条
    private currentvolum = 1; // 当前视频播放音量 0 - 1
    private envents: { [key: string]: Function } = {}; // 监听事件列表

    // 开始加载 | 加载完成 | 播放中 | 暂停中 | 缓冲中 | 缓冲就绪 | 播放完毕 | 错误

    constructor() {}
    
    init(el: string | HTMLElement, config: Config) {
      try {
        const videoContainer = typeof el === 'string' ? document.getElementById(el) : el;
        if(!videoContainer) throw new Error("无效的dom元素，请在页面加载完成后初始化播放器。");
        videoContainer.innerHTML = this.videoHtml;
        this.containerElemelt = videoContainer.querySelector('#video_container');;
        this.videoElement = videoContainer.querySelector('#_pretty_video');
        this.controlsElement = videoContainer.querySelector('#video_controls');
        this.controlsElement.innerHTML = this.controlsHtml;
        this.progressElement = videoContainer.querySelector('#progress');
        this.currentSpElement = this.progressElement.querySelector('.current_progress');
        this.progressBufferElement = this.progressElement.querySelector('.current_buffer');
        this.dotElement = this.progressElement.querySelector('.current_dot');
        this.volumesliderElement = videoContainer.querySelector('#volumeslider');
   
        this.dateLabelElement = videoContainer.querySelector('.date_label');
        this.timeElement = videoContainer.querySelector('.time');
        this.speedListElement = videoContainer.querySelector('#speed_con').children;
        this.speedBtnElement = videoContainer.querySelector('#speed_btn');
        this.playBtnElement = videoContainer.querySelectorAll('.play_btn');
        this.coverElement = this.containerElemelt.getElementsByClassName('video_cover');

        this.setupConfig(config);
        this.setUrl({
          src: config.src,
          poster: config.poster,
        });
        this.initEvent();
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * 获取总视频时长和当前播放进度
     */
    getDuration() {
      const currentSecond = this.videoElement?.currentTime || 0; // 当前播放时长 单位：秒
      const durationSecond = this.videoElement?.duration || 0;// 总时长 单位：秒

      // 转换格式HH:mm:ss  HH如果有的话才展示 否则展示mm:ss
      const currentText = Utils.formatSeconds(this.videoElement?.currentTime || 0); 
      const durationText = Utils.formatSeconds(this.videoElement?.duration || 0);
      return { currentSecond, durationSecond, currentText, durationText };
    }

    /** 播放器配置 */
    setupConfig(newConfig: Config) {
      this.config = {...this.config, ...newConfig};
      this.videoElement.autoplay = this.config.autoplay ? true : false;
      this.videoElement.loop = this.config.loop ? true : false;
      this.videoElement.preload = this.config.preload;
      this.containerElemelt.querySelector('#v_fullscreen').style.display = this.config.hideFullScreen ? 'none' : 'block';
      this.initControls();
    }

    /** 播放地址 */
    setUrl(object: { src: string, poster?: string }) {
      if(!this.videoElement) throw new Error("请先初始化播放器!");
      this.videoElement.src = object.src || '';
      this.videoElement.poster = object.poster || '';
    }
    
    /** 重新加载视频 */
    reload = () => this.videoElement.load();
    /** 开始播放 */
    play = () => this.videoElement.play();
    /** 是否暂停状态 */
    isPause(): boolean { return this.videoElement.paused }
    /** 暂停播放 */
    pause = () => this.videoElement.pause();
    /** 设置倍速 */
    setPlaybackRate(e: string) {
      this.speedBtnElement.innerText = e;
      this.videoElement.playbackRate = parseFloat(e);
    }
    
    /** 设置音量 */
    setVolum(value) {
      value = parseFloat(value);
      this.videoElement.volume = value;
      this.volumesliderElement.style.backgroundSize = `${value * 100}% 100%`; /*设置左右宽度比例*/
      const volume_bth = this.containerElemelt.querySelector('#volume_img');
      if(value && volume_bth) {
        volume_bth.classList.remove('mute');
      } else {
        volume_bth.classList.add('mute');
      }
    }

    /** 销毁video */
    dispose() {
      this.containerElemelt.innerHTML = '';
    }

    /**
     * 监听事件
     * @param eventName 事件名称
     * @param callback 回调
     */
    on(eventName: string, callback: Function) {
      this.envents[eventName] = callback;
    }

    /**
     * 取消事件监听
     */
    unOn(eventName: string){
      delete this.envents[eventName];
    }
    
    /** 全屏 */
    fullscreen() {
      const fullScreenElement = this.containerElemelt;
      if (this.isFullscreen) {
        if (document['exitFullscreen']) {
          document['exitFullscreen']();
        } else if (document['webkitCancelFullScreen']) {
          document['webkitCancelFullScreen']();
        } else if (document['mozCancelFullScreen']) {
          document['mozCancelFullScreen']();
        } else if (document['msExitFullscreen']) {
          document['msExitFullscreen']();
        } else {
          return;
        }
        this.isFullscreen = false;
      } else {
        const requestMethod = fullScreenElement.requestFullScreen || fullScreenElement.webkitRequestFullScreen || fullScreenElement.mozRequestFullScreen || fullScreenElement.msRequestFullscreen;
        if (requestMethod) {
           requestMethod.call(fullScreenElement);
          this.isFullscreen = true;
        } else {
          alert('该浏览器不支持全屏')
        }
      }
    }

    /** 设置播放按钮状态 */
    private changePlayBtn() {
      for (const el of this.playBtnElement) {
        if(this.isPause()) {
          Utils.removeClass(el, 'suspend');
        } else {
          Utils.addClass(el, 'suspend');
        }
      }
    }
    
    /** 更新当前状态 */
    setState(state: 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'playing' | 'ended' | 'error' | 'seeked' | 'loadedmetadata' | 'canplaythrough' | 'durationchange') {
      if(typeof this.envents[state] === 'function') {
        this.envents[state]({type: 'state'})
      };
      this.containerElemelt.querySelector('#v_play').style.display = (state !== 'waiting' && this.isPause()) ? 'block' : 'none';
      console.info(state);
      this.changePlayBtn();
      this.containerElemelt.querySelector('#v_waiting').style.display = 'none';
      // for(let cover of this.coverElement) { cover.style.display = 'none'; }
      switch (state) {
        case 'waiting':
          this.containerElemelt.querySelector('#v_waiting').style.display = 'block';
          break;
        case 'error':
          this.containerElemelt.querySelector('#v_error').style.display = 'block';
          break;
        case 'play':
        case 'ended':
        case 'canplay':
        case 'pause':
        case 'durationchange':
        case 'loadstart':
        case 'seeked':
          break;
        default:
          break;
      }
    }

    /** 获取进度条宽度，存在旋转屏幕导致宽度不一致，实时获取 */
    getProgressWidth() {
      return this.progressElement.clientWidth;
    }

    /** 根据当前X位置计算当前时间进度 */
    getCurrentLocationTime(position: number): string {
      const maxWidth = this.getProgressWidth(); // 进度总长度，进度条-按钮
      if(position > maxWidth) position = maxWidth;
      const slitherCurrentTime = position / maxWidth * this.videoElement.duration; // 当前拖动进度位置时间
      const currentTime = `${Utils.formatSeconds(slitherCurrentTime)}`; // 当前播放进度- 分:秒
      return currentTime;
    }
    
    /** 视频当前播放进度/进度条样式 */
    setDuration(position: number) {
      const currentTime = this.getCurrentLocationTime(position);
      const duration = Utils.formatSeconds(this.videoElement.duration); // 视频总长度- 分:秒
      this.timeElement.innerHTML = `${currentTime} / ${duration}`
      this.currentSpElement.style.width = position + 'px';
      this.dotElement.style.left = position + 'px';
    }
    
    /** 初始化控制条 */
    private initControls() {
      if(!this.config.controls) return;
      const controls = this.controlsElement;
      if(!this.config.controls) {
        return controls.style.display = 'none';
      }
      const video = this.videoElement;
      const isPc = Utils.isPC();
      // pc端 和移动端事件区分
      const touchstart = isPc ? 'mousedown' : 'touchstart'; // 鼠标按下/触摸
      const touchmove = isPc ? 'mousemove' : 'touchmove'; // 开始移动/拖动
      const touchend = isPc ? 'mouseup' : 'touchend'; // 松开/手指移开

      /** 倍速列表点击事件 */
      for (const i of this.speedListElement) {
        i.addEventListener('click', (e) => {
          for (const el of this.speedListElement) { el.classList.remove("on"); }
          e.target.classList.add("on");
          this.setPlaybackRate(e.target.innerText);
        })
      }

      /** 全屏按钮点击 */
      this.containerElemelt.querySelector('#v_fullscreen').addEventListener('click', (e) => {
        this.fullscreen();
        if (this.isFullscreen) {
          Utils.addClass(e.target, 'scale');
        } else {
          Utils.removeClass(e.target, 'scale')
        }
      })

      /** 进度条变粗大 */
      const progressHover = (isHover: boolean) => {
        if (!this.config.isFastForward) return;
        if (isHover) {
          Utils.addClass(this.progressElement, 'hover_cls')
        } else {
          Utils.removeClass(this.progressElement, 'hover_cls')
        }
      }

      /** 改变label位置 */
      const showmoveLabel = (clientX) => {
        if (clientX < 0) clientX = 0;
        this.dateLabelElement.innerText = this.getCurrentLocationTime(clientX);
        const minLeft = this.dateLabelElement.clientWidth / 2;
        const maxRight = this.progressElement.clientWidth - minLeft;
        if (clientX < minLeft) clientX = minLeft; // 防止被遮掩
        if (clientX > maxRight) clientX = maxRight;
        this.dateLabelElement.style.left = clientX + 'px';
        this.dateLabelElement.style.visibility = 'visible';
      }

      const hidemoveLabel = () => {
        this.dateLabelElement.style.visibility = 'hidden';
      }


      // 进度条开始拖动
      this.dotElement.addEventListener(touchstart, (event) => {
        if (!this.config.isFastForward) return;
        event.preventDefault();
        // 这里处理移动端进度条焦点变化
        if (!isPc) {
          progressHover(true);
        }
        const maxWidth = this.getProgressWidth();
        // 如果这个元素的位置内只有一个手指
        if (isPc || event.targetTouches.length === 1) {
          const touch = isPc ? event : event.targetTouches[0];
          // 把元素放在手指所在的位置
          const disX = touch.clientX - this.dotElement.offsetLeft;
          const getPosition = (e) => {
            let l = e.clientX - disX;
            if (l < 0) { l = 0; }
            if (l > maxWidth) { l = maxWidth; }
            return l;
          };
          const position = getPosition(touch);
          if (!isPc) showmoveLabel(position);
          // 开始拖动
          const move = (e) => {
            this.isMove = true;
            const touch2 = isPc ? e : e.targetTouches[0];
            const position = getPosition(touch2);
            this.setDuration(position);
            showmoveLabel(position);
          };

          // 如果浏览器下，需要全局监听拖动
          const dotElmt = isPc ? window : this.dotElement;
          // 拖动完成 删除事件
          const chend = (e) => {
            // 拖动完成更新播放器时间
            const touch2 = isPc ? e : e.changedTouches[0];
            const position = getPosition(touch2);
            // 更新视频实际播放时间
            video.currentTime = position / maxWidth * video.duration;
            this.isMove = false;
            if (!isPc) { // 这里处理移动端进度条变化
              progressHover(false);
              hidemoveLabel();
            }
            dotElmt.removeEventListener(touchmove, move);
            dotElmt.removeEventListener(touchend, chend);
          };
          dotElmt.addEventListener(touchmove, move);
          dotElmt.addEventListener(touchend, chend);
        }
      }, false);
      
      // 实现效果，pc端鼠标移入视频显示控制条，3秒无操作隐藏控制条
      // 移动端触摸视频时展示控制条, 3秒无操作隐藏控制条
      let timeout = null;
      const showControls = () => {
        clearTimeout(timeout);
        Utils.addClass(this.containerElemelt, 'showControls');
      }
      const hideControls = () => {
        timeout = setTimeout(() => {
          Utils.removeClass(this.containerElemelt, 'showControls');
        }, 4000);
      }

      const onmouseover = (e) => {
        showControls();
        hideControls();
      };

      if (isPc) {
        if(this.config.autoHideControls) {
          // 鼠标在容器移动时候触发显示
          this.containerElemelt.addEventListener('mousemove', onmouseover);
          // 当鼠标移动到控制条上，取消隐藏，一直显示
          this.controlsElement.addEventListener('mouseenter', (e) => {
            this.containerElemelt.removeEventListener('mousemove', onmouseover);
            showControls();
          });

          // 鼠标移开
          this.controlsElement.addEventListener('mouseleave', (e) => {
            this.containerElemelt.addEventListener('mousemove', onmouseover);
            hideControls();
          });
        }
      
        // PC端点击音量按钮禁音
        this.containerElemelt.querySelector('#volume_img').addEventListener('click', (e) => {
          const val = parseFloat(this.volumesliderElement.value) > 0 ? 0.0 : this.currentvolum;
          this.volumesliderElement.value = val;
          this.setVolum(val);
        })

        ///进度条控制样式 mouseover mouseout：鼠标移入子元素时会重复触发所以使用mouseenter mouseleave
        // PC端鼠标移入控制条变粗变大
        this.progressElement.addEventListener('mouseenter', (e) => progressHover(true));
        // 鼠标移开
        this.progressElement.addEventListener('mouseleave', (e) => {
          progressHover(false);
          hidemoveLabel();
        });
        // 鼠标移动
        this.progressElement.addEventListener('mousemove', (e) => showmoveLabel(e.clientX))
      } else {
        if(this.config.autoHideControls) {
          this.containerElemelt.ontouchstart = showControls;
          this.containerElemelt.ontouchend = hideControls;
        }
      }

      // 阻止事件冒泡到点击进度条
      this.dotElement.onmousedown = (event) => event.stopPropagation();

      // 鼠标按下时候，跳转进度
      this.progressElement.onmousedown = (event) => {
        if (!this.config.isFastForward) return;
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
    }

    
    /** 监听video事件 */
    initEvent() {
      const video = this.videoElement;
      const ua = navigator.userAgent.toLocaleLowerCase();

      // x5内核
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        video.setAttribute('x5-video-player-fullscreen', 'true'); // 进入全屏通知
        video.setAttribute('x-webkit-airplay', 'true'); // 设置允许设备播放
        // video.setAttribute('x5-playsinline', 'true'); // 设置android在微信中内联播放视频 这是坑微信无法正常横屏
        video.setAttribute('x5-video-player-type', 'h5'); // 关闭同层X5内核播放器    x5-video-player-type='h5' 启用Ｈ5同层播放器
        video.setAttribute('x5-video-orientation', 'landscape|portrait'); // 控制横竖屏 可选值： landscape 横屏, portraint竖屏  默认值：portraint
        // 进入全屏
        video.addEventListener('x5videoenterfullscreen', () => {
          const btnEl = this.containerElemelt.querySelector('#v_fullscreen');
          Utils.addClass(btnEl, 'scale');
        }, false);

        // 退出全屏时
        video.addEventListener('x5videoexitfullscreen', () => {
          const btnEl = this.containerElemelt.querySelector('#v_fullscreen');
          Utils.removeClass(btnEl, 'scale')
        }, false);
      } else {
        // ios端
        video.setAttribute('webkit-playsinline', 'true'); // // 设置ios在微信中内联播放视频 ios9
        video.setAttribute('playsinline', 'true'); // 设置ios在微信中内联播放视频 ios10/ios11
      }


      /** 播放按钮点击 */
      for (const el of this.playBtnElement) {
        el.addEventListener('click', (e) => {
          if (this.isPause()) {
            this.play()
          } else {
            this.pause()
          }
        });
      }

      // 右键
      this.containerElemelt.oncontextmenu = (e) => {
        //鼠标点的坐标
        const oX = e.layerX;
        const oY = e.layerY;
        //菜单出现后的位置
        // menu.style.display = "block";
        // menu.style.left = oX + "px";
        // menu.style.top = oY + "px";
        //阻止浏览器默认事件
        return false;//一般点击右键会出现浏览器默认的右键菜单，写了这句代码就可以阻止该默认事件。
      };

      // 双击播放器暂停，移动端无双击事件，用两次点击时间模拟 300 毫秒2次点击为双击
      let clickTime = 0;
      video.addEventListener('click', () => {
        const nowTime = new Date().getTime();
        if (nowTime - clickTime < 300) {
          if (this.isPause()) {
            this.play()
          } else {
            this.pause()
          }
        }
        clickTime = nowTime;
      });

      // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
      video.addEventListener('loadstart', (e) => this.setState('loadstart'));
    
      // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
      video.addEventListener('durationchange', (e) => {
        const maxWidth = this.getProgressWidth();
        this.setDuration(video.currentTime / video.duration * maxWidth);
        this.setState('durationchange');
      });
    
      // loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
      video.addEventListener('loadedmetadata', (e) => {
        this.setState('loadedmetadata');
        if(this.config.controls) this.controlsElement.style.display = 'block';
      });
    
      // loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
      // video.addEventListener('loadeddata', (e) => {
      //   console.log('提示当前帧的数据是可用的');
      //   this.setState('loadeddata');
      // });
    
      // progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发
      video.addEventListener('progress', (e) => {
        let buffered = e.target.buffered;
        if(buffered.length) {
          const loaded = 100 * buffered.end(0) / e.target.duration;
          this.progressBufferElement.style.width = loaded + '%';
        }
      });
    
      // canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
      video.addEventListener('canplay', (e) => this.setState('canplay'));
    
      // canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
      video.addEventListener('canplaythrough', (e) => {
        this.setState('canplaythrough')
      });
    
      // play：播放监听
      video.addEventListener('play', (e) => this.setState('play'));
    
      // pause：暂停监听
      video.addEventListener('pause', (e) => this.setState('pause'));
    
      // seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
      // video.addEventListener('seeking', (e) => {
      //   console.log('开始移动进度条');
      // });
    
      // // seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
      video.addEventListener('seeked', (e) => this.setState('seeked'));
    
      // waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
      video.addEventListener('waiting', (e) => this.setState('waiting'));
    
      // playing：当视频在已因缓冲而暂停或停止后已就绪时触发
      video.addEventListener('playing', (e) => this.setState('playing'));
    
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
        this.containerElemelt.getElementsByClassName('play_btn')[0].classList.remove('suspend');
      });
    
      // error：播放错误
      video.addEventListener('error', (e) => this.setState('error'));
    
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

    // 播放器element
    private videoHtml = `
      <div class="video_player showControls" id="video_container">
        <video id="_pretty_video" class="p_video" width="100%">
            您的浏览器不支持Video播放器
        </video>
        <div id="video_controls" style="display: none;"></div>
        <div class="video_cover" id="v_error">
            <div class="cover_content">
                <div class="cover_img error"></div>
                <div class="tips_text tips_error">资源加载失败~</div>
            </div>
        </div>
        <div class="video_cover" id="v_play">
            <div class="cover_content">
                <div class="cover_img play play_btn"></div>
            </div>
        </div>
        <div class="video_cover" id="v_waiting">
            <div class="cover_content">
                <div class="video_loading">
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

    // 控制条element
    private controlsHtml = `
      <div class="p_controls">
        <span class="date_label">00:00</span>
        <div id="progress" class="progress_bar">
            <div class="current_progress"></div>
            <div class="current_buffer"></div>
            <i class="current_dot"></i>
        </div>
        <div class="controls_left">
            <i class="button_img play play_btn"></i>
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
                <i id="volume_img" class="button_img sound"></i>
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
            <i id="v_fullscreen" class="button_img full"></i>
        </div>
      </div>
     
    `
}
export default PrettyVideo;