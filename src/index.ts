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
    if(this.config.controls) {
      this.initControls();
    }
  }

  // video事件
  private handleStateChange() {
    this.video.onEvent = (state, e) => {
      if(typeof this.envents[state] === 'function') {
        this.envents[state]({type: 'state'})
      };
      console.info(state);
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

    const video = this.video.el;
    const isPc = Utils.isPC();
    // pc端 和移动端事件区分
    const touchstart = isPc ? 'mousedown' : 'touchstart'; // 鼠标按下/触摸
    const touchmove = isPc ? 'mousemove' : 'touchmove'; // 开始移动/拖动
    const touchend = isPc ? 'mouseup' : 'touchend'; // 松开/手指移开


    // 进度条开始拖动
    this.controls.current_dot.addEventListener(touchstart, (event: any) => {
      if (!this.config.isFastForward) return;
      event.preventDefault();
      // 这里处理移动端进度条焦点变化
      if (!isPc && !this.config.isFastForward) {
        this.controls.progressHover(true);
      }
      const maxWidth = this.controls.getProgressWidth();
      // 如果这个元素的位置内只有一个手指
      if (isPc || event.targetTouches.length === 1) {
        const touch = isPc ? event : event.targetTouches[0];
        // 把元素放在手指所在的位置
        const disX = touch.clientX - this.controls.current_dot.offsetLeft;
        const getPosition = (e) => {
          let l = e.clientX - disX;
          if (l < 0) { l = 0; }
          if (l > maxWidth) { l = maxWidth; }
          return l;
        };
        const position = getPosition(touch);
        if (!isPc) this.controls.showmoveLabel(position, this.video.el.duration);
        // 开始拖动
        const move = (e) => {
          this.isMove = true;
          const touch2 = isPc ? e : e.targetTouches[0];
          const position = getPosition(touch2);
          this.controls.setDuration(position, this.video.el.duration);
          this.controls.showmoveLabel(position, this.video.el.duration);
        };

        // 如果浏览器下，需要全局监听拖动
        const dotElmt = isPc ? window : this.controls.current_dot;
        // 拖动完成 删除事件
        const chend = (e) => {
          // 拖动完成更新播放器时间
          const touch2 = isPc ? e : e.changedTouches[0];
          const position = getPosition(touch2);
          // 更新视频实际播放时间
          video.currentTime = position / maxWidth * video.duration;
          this.isMove = false;
          if (!isPc) { // 这里处理移动端进度条变化
            this.controls.progressHover(false);
            this.controls.hidemoveLabel();
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
        this.controls.controlsEl.addEventListener('mouseenter', (e) => {
          this.containerElemelt.removeEventListener('mousemove', onmouseover);
          showControls();
        });

        // 鼠标移开
        this.controls.controlsEl.addEventListener('mouseleave', (e) => {
          this.containerElemelt.addEventListener('mousemove', onmouseover);
          hideControls();
        });
      }
    
      ///进度条控制样式 mouseover mouseout：鼠标移入子元素时会重复触发所以使用mouseenter mouseleave
      // PC端鼠标移入控制条变粗变大
      this.controls.progress.addEventListener('mouseenter', (e) => this.controls.progressHover(true));
      // 鼠标移开
      this.controls.progress.addEventListener('mouseleave', (e) => {
        this.controls.progressHover(false);
        this.controls.hidemoveLabel();
      });
      // 鼠标移动
      this.controls.progress.addEventListener('mousemove', (e) => this.controls.showmoveLabel(e.clientX, this.video.el.duration))
    } else {
      if(this.config.autoHideControls) {
        this.containerElemelt.ontouchstart = showControls;
        this.containerElemelt.ontouchend = hideControls;
      }
    }

    // 阻止事件冒泡到点击进度条
    this.controls.current_dot.onmousedown = (event) => event.stopPropagation();

    // 鼠标按下时候，跳转进度
    this.controls.progress.onmousedown = (event: any) => {
      if (!this.config.isFastForward) return;
      const maxWidth = this.controls.getProgressWidth();
      let layerX = event.layerX;
      if (layerX > maxWidth) { layerX = maxWidth; }
      video.currentTime = layerX / maxWidth * video.duration; // 计算出点击的位置在总时间里面占多少。
      this.controls.setDuration(layerX, this.video.el.duration);
    };

  }
}

export default PrettyVideo;