import { Utils } from '../utils';

export class Controls {
    controlsEl: HTMLElement; // 控制条容器
    labelEl: HTMLElement; // 提示label
    progress: HTMLElement; // 进度条容器
    current_progress: HTMLElement; // 当前进度
    current_buffer: HTMLElement; // 缓冲进度
    current_dot: HTMLElement; // 进度条拖动按钮
    play_btn: HTMLElement; // 播放按钮
    timeEl: HTMLElement; // 播放时间/视频总长

    controls_left: HTMLElement;// 进度条左边按钮容器
    controls_right: HTMLElement; // 控制条右边按钮容器

    play: () => void;

    constructor() {
        this.createControlsEl(); // 创建容器
        this.createControlsBtn(); // 控制条左边元素
        this.showControls();
    }

    // 控制条
    createControlsEl() {
        this.controlsEl = document.createElement('div');
        this.controlsEl.className='p_controls';

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
    }

    // 控制条按钮
    createControlsBtn() {
        this.labelEl = document.createElement('span');
        this.labelEl.className='date_label';
        this.labelEl.innerText = '00:00';
        this.controlsEl.appendChild(this.labelEl);

        // 左边容器
        this.controls_left = document.createElement('div');
        this.controls_left.className="controls_left";

        // 播放按钮
        this.play_btn = document.createElement('i');
        this.play_btn.className="button_img play play_btn";
        this.play_btn.addEventListener('click', () => {this.play && this.play()})

        // 显示时间
        this.timeEl = document.createElement('div');
        this.timeEl.className = 'time';
        this.timeEl.innerText = '00:00 / 00:00';
        
        this.controls_left.appendChild(this.play_btn);
        this.controls_left.appendChild(this.timeEl);
        this.controlsEl.appendChild(this.controls_left);

        // 右边容器
        this.controls_right = document.createElement('div');
        this.controls_right.className="controls_right";
        this.controlsEl.appendChild(this.controls_right);
    }

     /** 设置播放按钮状态 */
     changePlay(isPause: boolean) {
        if(isPause) {
            Utils.removeClass(this.play_btn, 'suspend');
        } else {
            Utils.addClass(this.play_btn, 'suspend');
        }
    }

    /** 设置缓存进度条百分比值 */
    setBufferPer(per: number) {
        this.current_buffer.style.width = per + '%';
    }

    /** 获取进度条宽度，存在旋转屏幕导致宽度不一致，实时获取 */
    getProgressWidth() {
      return this.progress.clientWidth;
    }

    /**
     * 根据当前X位置计算当前时间进度 
     * @param position 当前位置
     * @param duration 视频总长度
     */
    getCurrentLocationTime(position: number, duration: number): string {
        const maxWidth = this.getProgressWidth(); // 进度总长度，进度条-按钮
        if(position > maxWidth) position = maxWidth;
        const slitherCurrentTime = position / maxWidth * duration; // 当前拖动进度位置时间
        const currentTime = `${Utils.formatSeconds(slitherCurrentTime)}`; // 当前播放进度- 分:秒
        return currentTime;
    }

    /**
     * 视频当前播放进度/进度条样式
     * @param position 当前位置
     * @param duration 视频总长度
     */
    setDuration(position: number, videoDuration: number) {
        const currentTime = this.getCurrentLocationTime(position, videoDuration);
        const duration = Utils.formatSeconds(videoDuration); // 视频总长度- 分:秒
        this.timeEl.innerHTML = `${currentTime} / ${duration}`
        this.current_progress.style.width = position + 'px';
        this.current_dot.style.left = position + 'px';
    }

    private timeout = null;
    /**显示控制条 */
    showControls = () => {
      clearTimeout(this.timeout);
      Utils.addClass(this.controlsEl, 'showControls');
    }

    /** 4秒后隐藏控制条 */
    hideControls = () => {
      this.timeout = setTimeout(() => {
        Utils.removeClass(this.controlsEl, 'showControls');
      }, 4000);
    }

    /** 改变label位置 */
    showmoveLabel = (clientX: number, videoDuration: number) => {
        if (clientX < 0) clientX = 0;
        this.labelEl.innerText = this.getCurrentLocationTime(clientX, videoDuration);
        const minLeft = this.labelEl.clientWidth / 2;
        const maxRight = this.progress.clientWidth - minLeft;
        if (clientX < minLeft) clientX = minLeft; // 防止被遮掩
        if (clientX > maxRight) clientX = maxRight;
        this.labelEl.style.left = clientX + 'px';
        this.labelEl.style.visibility = 'visible';
    }

    hidemoveLabel = () => {
        this.labelEl.style.visibility = 'hidden';
    }

    /** 进度条变粗大 */
    progressHover = (isHover: boolean) => {
        if (isHover) {
            Utils.addClass(this.progress, 'hover_cls')
        } else {
            Utils.removeClass(this.progress, 'hover_cls')
        }
    }
}