import { Config } from "index";
import { Video, Controls, VolumeBtn, SpeedBtn, FullscreenBtn, VideoCover } from './components';
import './index.less';

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
   /** cover */
   private videoCover: VideoCover;

   private config: Config = {
    autoplay: false,
    autoHideControls: true,
    isFastForward: true,
    hideFullScreen: false,
    controls: true, 
    loop: false, 
    preload: 'auto'
  }

  private envents: { [key: string]: Function } = {}; // 监听事件列表

  init(el: string | HTMLElement, config: Config) {
    try {
      const videoContainer = typeof el === 'string' ? document.getElementById(el) : el;
      if(!videoContainer) throw new Error("无效的dom元素，请在页面加载完成后初始化播放器。");
      this.containerElemelt = document.createElement('div');
      this.containerElemelt.className = 'video_player';
      // 右键
      this.containerElemelt.oncontextmenu = (e) => {
        return false;//阻止右键默认事件。
      };
      this.video = new Video();
      this.videoCover = new VideoCover(this.containerElemelt);
      this.videoCover.play = () => this.video.el?.play();
      this.handleStateChange();
      this.containerElemelt.appendChild(this.video.el);
      this.containerElemelt.appendChild(this.video.posterEl);

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
  setUrl = (object: { src: string, poster?: string }) => this.video.setUrl(object);

  /** 重新加载视频 */
  reload = () => this.video?.el.load();
  /** 开始播放 */
  play = () => this.video?.el.play();
  /** 是否暂停状态 */
  isPause(): boolean { return this.video?.el.paused }
  /** 暂停播放 */
  pause = () => this.video?.el.pause();

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

  /** 播放器配置 */
  private initConfig(cfg: Config) {
    this.config = {...this.config, ...cfg};
    this.video.el.autoplay = this.config.autoplay ? true : false;
    this.video.el.loop = this.config.loop ? true : false;
    this.video.el.preload = this.config.preload;
    this.initControls();
  }

  // video事件
  private handleStateChange() {
    this.video.onEvent = (state, e) => {
      if(typeof this.envents[state] === 'function') {
        this.envents[state]({type: 'state'})
      };
      this.videoCover.setState(this.isPause() ? 'play' : '');
      console.log(state)
      switch (state) {
        case 'waiting':
          this.videoCover.setState('loading');
          break;
        case 'error':
          this.videoCover.setState('error');
          if(this.containerElemelt.contains(this.controls.controlsEl)) {
            this.containerElemelt.removeChild(this.controls.controlsEl);
          }
          
          break;
        case 'canplay':
          if(!this.containerElemelt.contains(this.controls.controlsEl)) {
            this.containerElemelt.appendChild(this.controls.controlsEl);
          }
          this.controls.changePlayTimeText();
          if(this.video.el.currentTime <= 0) {
            this.video.showPoster();
          }
          
        case 'play':
          
        case 'ended':
   
        case 'pause':
        case 'durationchange':
        case 'loadstart':
        case 'seeked':
          this.controls.changePlay(this.isPause());
          break;
        case 'timeupdate': // 播放中
          if (!this.controls.isMove) { // 防止拖动进度条时候更新
            const per = 100 * this.video.el.currentTime / this.video.el.duration;
            this.controls.setCurrentPlayPer(per);
          }
          this.controls.changePlayTimeText();
          this.video.hidePoster();
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
    this.controls = new Controls(this.video, this.containerElemelt, this.config);
    this.containerElemelt.appendChild(this.controls.controlsEl);

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