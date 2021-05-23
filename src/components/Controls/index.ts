import Config from '../../config';
import { Utils } from '../../utils';
import { Video } from '../Video';
import './index.less';
/** 播放器控制条 */
export class Controls {
  controlsEl: HTMLElement; // 控制条容器
  labelEl: HTMLElement; // 提示label
  progress: HTMLElement; // 进度条容器
  current_progress: HTMLElement; // 当前进度
  current_buffer: HTMLElement; // 缓冲进度
  current_dot: HTMLElement; // 进度条拖动按钮
  play_btn: HTMLElement; // 播放按钮
  timeEl: HTMLElement; // 播放时间/视频总长

  controls_left: HTMLElement; // 进度条左边按钮容器
  controls_right: HTMLElement; // 控制条右边按钮容器

  isMove = false;

  constructor(private video: Video, private containerElemelt: any, private config: Config) {
    this.createControlsEl(); // 创建容器
    this.createControlsBtn(); // 控制条左边元素
    if (config.controls) {
      this.showControls();
    }
  }

  /** 获取进度条宽度，实时获取 */
  get progressWidth() {
    return this.progress.clientWidth;
  }

  // 控制条dom创建
  createControlsEl() {
    this.controlsEl = document.createElement('div');
    this.controlsEl.className = 'p_controls';

    // 进度条容器
    this.progress = document.createElement('div');
    this.progress.className = 'progress_bar';

    // 当前播放进度
    this.current_progress = document.createElement('div');
    this.current_progress.className = 'current_progress';
    // 当前缓冲进度
    this.current_buffer = document.createElement('div');
    this.current_buffer.className = 'current_buffer';

    // 进度条按钮
    this.current_dot = document.createElement('i');
    this.current_dot.className = 'current_dot';

    this.progress.appendChild(this.current_progress);
    this.progress.appendChild(this.current_buffer);
    this.progress.appendChild(this.current_dot);
    this.controlsEl.appendChild(this.progress);

    if (this.config.isFastForward && this.config.controls) this.initControlsEvent();
    if (this.config.autoHideControls && this.config.controls) this.initAutoControls();
  }

  /** 控制条拖拽事件 */
  initControlsEvent() {
    const isPc = Utils.isPC();
    // pc端 和移动端事件区分
    const touchstart = isPc ? 'mousedown' : 'touchstart'; // 鼠标按下/触摸
    const touchmove = isPc ? 'mousemove' : 'touchmove'; // 开始移动/拖动
    const touchend = isPc ? 'mouseup' : 'touchend'; // 松开/手指移开
    // 鼠标按下时候，跳转进度
    this.progress.onmousedown = (event: any) => {
      if (!this.config.isFastForward) return;
      this.setPlayTime(event.offsetX);
      const per = (100 * event.offsetX) / this.progressWidth;
      this.setCurrentPlayPer(per);
    };
    // 阻止事件冒泡到点击进度条
    this.current_dot.onmousedown = (event) => event.stopPropagation();
    // 进度条按钮拖动
    this.current_dot.addEventListener(
      touchstart,
      (event: any) => {
        event.preventDefault();
        // event.stopPropagation();
        if (!this.config.isFastForward) return;
        // 移动端触摸到进度条变化
        if (!isPc && this.config.isFastForward) this.progressHover(true);
        // 如果这个元素的位置内只有一个手指
        if (isPc || event.targetTouches.length === 1) {
          const touch = isPc ? event : event.targetTouches[0];
          if (!isPc) this.showmoveLabel(touch.clientX);
          // 开始拖动
          const move = (e) => {
            this.isMove = true;
            const touch2 = isPc ? e : e.targetTouches[0];
            const touchX = this.offsetXPer(touch2.clientX);
            this.setCurrentPlayPer(touchX);
            this.showmoveLabel(touch2.clientX);
          };

          // 如果浏览器下，需要全局监听拖动
          const dotElmt = isPc ? window : this.current_dot;
          // 拖动完成 删除事件
          const chend = (e) => {
            // 拖动完成更新播放器时间
            const touch2 = isPc ? e : e.changedTouches[0];
            // 更新视频实际播放时间
            this.setPlayTime(touch2.clientX);
            this.isMove = false;
            if (!isPc) this.progressHover(false);
            this.hidemoveLabel();
            dotElmt.removeEventListener(touchmove, move);
            dotElmt.removeEventListener(touchend, chend);
          };
          dotElmt.addEventListener(touchmove, move);
          dotElmt.addEventListener(touchend, chend);
        }
      },
      false
    );

    if (isPc) {
      // /进度条控制样式 mouseover mouseout：鼠标移入子元素时会重复触发所以使用mouseenter mouseleave
      // PC端鼠标移入控制条变粗变大
      this.progress.addEventListener('mouseenter', (e) => this.progressHover(true));
      // 鼠标移开
      this.progress.addEventListener('mouseleave', (e) => {
        this.progressHover(false);
        this.hidemoveLabel();
      });
      // 鼠标移动
      this.progress.addEventListener('mousemove', (e) => this.showmoveLabel(e.clientX));
    }
  }

  /** 自动显示隐藏控制条 */
  initAutoControls() {
    const onmouseover = (e) => {
      this.showControls();
      this.hideControls();
    };
    const isPc = Utils.isPC();
    if (isPc) {
      // 鼠标在容器移动时候触发显示
      this.containerElemelt.addEventListener('mousemove', onmouseover);
      // 当鼠标移动到控制条上，取消隐藏，一直显示
      this.controlsEl.addEventListener('mouseenter', (e) => {
        this.containerElemelt.removeEventListener('mousemove', onmouseover);
        this.showControls();
      });

      // 鼠标移开
      this.controlsEl.addEventListener('mouseleave', (e) => {
        this.containerElemelt.addEventListener('mousemove', onmouseover);
        this.hideControls();
      });
    } else {
      this.containerElemelt.ontouchstart = this.showControls;
      this.containerElemelt.ontouchend = this.hideControls;
    }
  }

  // 控制条按钮
  createControlsBtn() {
    this.labelEl = document.createElement('span');
    this.labelEl.className = 'date_label';
    this.labelEl.innerText = '00:00';
    this.controlsEl.appendChild(this.labelEl);

    // 左边容器
    this.controls_left = document.createElement('div');
    this.controls_left.className = 'controls_left';

    // 播放按钮
    this.play_btn = document.createElement('i');
    this.play_btn.className = 'button_img play_btn';
    this.play_btn.addEventListener('click', () => {
      if (this.video?.el.paused) {
        this.video.el.play();
      } else {
        this.video.el.pause();
      }
    });

    // 显示时间
    this.timeEl = document.createElement('div');
    this.timeEl.className = 'time';
    this.timeEl.innerText = '00:00 / 00:00';

    this.controls_left.appendChild(this.play_btn);
    this.controls_left.appendChild(this.timeEl);
    this.controlsEl.appendChild(this.controls_left);

    // 右边容器
    this.controls_right = document.createElement('div');
    this.controls_right.className = 'controls_right';
    this.controlsEl.appendChild(this.controls_right);
  }

  /** 设置播放按钮状态 */
  changePlay(isPause: boolean) {
    if (isPause) {
      Utils.removeClass(this.play_btn, 'suspend');
    } else {
      Utils.addClass(this.play_btn, 'suspend');
    }
  }

  /**
   * 根据当前x位置计算在进度条占比
   * @param offsetX 距离进度条的偏移
   */
  offsetXPer(offsetX: number) {
    if (offsetX < 0) {
      offsetX = 0;
    }
    if (offsetX > this.progressWidth) {
      offsetX = this.progressWidth;
    }
    const per = (100 * offsetX) / this.progressWidth;
    return per;
  }

  /**
   * 根据当前x位置计算当前时间进度
   * @param per
   */
  getOffsetXTimeText(offsetX: number) {
    const maxWidth = this.progressWidth; // 进度总长度，进度条-按钮
    if (offsetX > maxWidth) offsetX = maxWidth;
    const slitherCurrentTime = (offsetX / maxWidth) * this.video.duration; // 当前拖动进度位置时间
    const currentTime = `${Utils.formatSeconds(slitherCurrentTime)}`; // 当前播放进度- 分:秒
    return currentTime;
  }

  /** 设置缓存进度条百分比样式 */
  setBufferPer(per: number) {
    this.current_buffer.style.width = per + '%';
  }

  /** 设置进度条百分比样式 */
  setCurrentPlayPer(per: number) {
    this.current_progress.style.width = per + '%';
    this.current_dot.style.left = per + '%';
  }

  /** 更新展示当前播放时间进度 */
  changePlayTimeText() {
    if (!this.isMove) {
      // 防止拖动进度条时候更新
      const per = (100 * this.video.currentTime) / this.video.duration;
      this.setCurrentPlayPer(per);
    }
    const currentTime = Utils.formatSeconds(this.video.currentTime); // 当前播放时长
    const duration = Utils.formatSeconds(this.video.duration); // 视频总长度- 分:秒
    this.timeEl.innerHTML = `${currentTime} / ${duration}`;
  }

  /**
   * 根据当前位置更新播放器进度
   * @param offsetX 当前进度条偏移位置
   */
  setPlayTime(offsetX: number) {
    if (offsetX > this.progressWidth) {
      offsetX = this.progressWidth;
    }
    const time = (offsetX / this.progressWidth) * this.video.duration;
    this.video.setCurrentTime(time);
  }

  private timeout = null;
  /** 显示控制条 */
  showControls = () => {
    clearTimeout(this.timeout);
    Utils.addClass(this.controlsEl, 'showControls');
  };

  /** 4秒后隐藏控制条 */
  hideControls = () => {
    this.timeout = setTimeout(() => {
      Utils.removeClass(this.controlsEl, 'showControls');
    }, 5000);
  };

  /** 改变label位置 */
  showmoveLabel = (offsetX: number) => {
    if (offsetX < 0) offsetX = 0;
    this.labelEl.innerText = this.getOffsetXTimeText(offsetX);
    const minLeft = this.labelEl.clientWidth / 2;
    const maxRight = this.progress.clientWidth - minLeft;
    if (offsetX < minLeft) offsetX = minLeft; // 防止被遮掩
    if (offsetX > maxRight) offsetX = maxRight;
    this.labelEl.style.left = offsetX + 'px';
    this.labelEl.style.visibility = 'visible';
  };

  /** 隐藏label */
  hidemoveLabel = () => {
    this.labelEl.style.visibility = 'hidden';
  };

  /** 进度条变粗大 */
  progressHover = (isHover: boolean) => {
    if (isHover) {
      Utils.addClass(this.progress, 'hover_cls');
    } else {
      Utils.removeClass(this.progress, 'hover_cls');
    }
  };
}
