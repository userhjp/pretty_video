import { Config } from "index";
import { Video, Controls, VolumeBtn, SpeedBtn, FullscreenBtn } from './components';
import './index.less';
import { Utils } from './utils';

class PrettyVideo {
   /** 容器 */
   private containerElemelt: HTMLDivElement;
   /** video播放器对象 */
   private video: Video;
   /** 控制条 */
   private controls: Controls;
   /** 音量 */
   private volume: VolumeBtn;
   /** 全屏 */
   private fullscreenBtn: FullscreenBtn;

   private config: Config = {
    autoplay: false,
    autoHideControls: true,
    isFastForward: true,
    hideFullScreen: false,
    controls: true, 
    loop: false, 
    preload: 'auto'
  }

  private isMove = false; // 进度条是否拖动中，防止拖动时候视频正常播放更新进度条
  private envents: { [key: string]: Function } = {}; // 监听事件列表

  init(el: string | HTMLElement, config: Config) {
    try {
      const videoContainer = typeof el === 'string' ? document.getElementById(el) : el;
      if(!videoContainer) throw new Error("无效的dom元素，请在页面加载完成后初始化播放器。");
      this.containerElemelt = document.createElement('div');
      this.containerElemelt.className = 'video_player';
      this.video = new Video();
      this.handleStateChange();
      this.containerElemelt.appendChild(this.video.el);

      this.initConfig(config);
      this.setUrl({
        src: config.src,
        poster: config.poster,
      });
      videoContainer.appendChild(this.containerElemelt);
    } catch (error) {
      console.error(error);
    }
  }

  /** 播放地址 */
  setUrl(object: { src: string, poster?: string }) {
    if(!this.video?.el) throw new Error("请先初始化播放器!");
    this.video.el.setAttribute('src', object.src || '');
    this.video.el.setAttribute('poster', object.poster || '');
  }

  /** 重新加载视频 */
  reload = () => this.video?.el.load();
  /** 开始播放 */
  play = () => this.video?.el.play();
  /** 是否暂停状态 */
  isPause(): boolean { return this.video?.el.paused }
  /** 暂停播放 */
  pause = () => this.video?.el.pause();

  /** 播放器配置 */
  private initConfig(cfg: Config) {
    this.config = {...this.config, ...cfg};
    this.video.el.autoplay = this.config.autoplay ? true : false;
    this.video.el.loop = this.config.loop ? true : false;
    this.video.el.preload = this.config.preload;
    if(this.config.controls) {
      this.initControls();
    }
  }

  // video事件
  private handleStateChange() {
    this.video.onEvent = (state, e) => {
      switch (state) {
        case 'waiting':
          break;
        case 'error':
          break;
        case 'play':
          
        case 'ended':
        case 'canplay':
        case 'pause':
        case 'durationchange':
        case 'loadstart':
        case 'seeked':
          this.controls.changePlay(this.isPause());
          console.info(state);
          break;
        case 'timeupdate': // 播放中
          if (!this.isMove) { // 防止拖动进度条时候更新
            const maxWidth = this.controls.getProgressWidth();
            const duration = this.video.el.duration;
            const position = this.video.el.currentTime / this.video.el.duration * maxWidth;
            this.controls.setDuration(position, duration);
          }
          break;
        case 'progress': // 缓冲中
          const buffered = e.target.buffered;
          if(buffered.length) {
            const loaded = 100 * buffered.end(0) / e.target.duration;
            this.controls.setBufferPer(loaded);
          }
          break;
        case 'x5videoenterfullscreen': 
          this.fullscreenBtn && this.fullscreenBtn.changeIcon(true);
        case 'x5videoexitfullscreen': 
          this.fullscreenBtn && this.fullscreenBtn.changeIcon(false);
          break;
        default:
          break;
      }
    };
  }

 

  /** 初始化控制条 */
  private initControls() {
    this.controls = new Controls();
    this.containerElemelt.appendChild(this.controls.controlsEl);
    this.controls.play = () => {
      if(this.isPause()) {
        this.play();
      } else {
        this.pause();
      }
    }
    // 音量按钮
    this.volume = new VolumeBtn();
    this.controls.controls_right.appendChild(this.volume.el);
    this.volume.valueChange = (value) => {
      this.video.el.volume = value;
    }

    // 倍速
    const speedBtn = new SpeedBtn();
    this.controls.controls_right.appendChild(speedBtn.el);
    speedBtn.valueChange = (value) => {
      this.video.el.playbackRate = value;
    }

    if(!this.config.hideFullScreen) {
      // 全屏按钮
      this.fullscreenBtn = new FullscreenBtn(this.containerElemelt);
      this.controls.controls_right.appendChild(this.fullscreenBtn.el);
    }
  }
}

export default PrettyVideo;