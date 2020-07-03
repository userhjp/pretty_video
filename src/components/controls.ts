export class Controls {
    controlsEl: HTMLElement; // 控制条容器
    labelEl: HTMLElement; // label
    progress: HTMLElement; // 进度条容器
    current_progress: HTMLElement; // 当前进度
    current_buffer: HTMLElement; // 缓冲进度
    current_dot: HTMLElement; // 进度条拖动按钮
    controls_left: HTMLElement;// 进度条左边按钮容器
    play_btn: HTMLElement; // 播放按钮
    timeEl: HTMLElement; // 播放时间/视频总长
    controls_right: HTMLElement; // 控制条右边按钮

    volume_container: HTMLElement; // 音量按钮容器
    speed_container: HTMLElement; // 倍速
    v_fullscreen: HTMLElement; // 全屏

    constructor() {
        this.createControlsEl(); // 创建容器
        this.createControlsBtn(); // 控制条左边元素
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
        // 左边容器
        this.controls_left = document.createElement('div');
        this.controls_left.className="controls_left";
        // 播放按钮
        this.play_btn = document.createElement('i');
        this.play_btn.className="button_img play play_btn";
        // 显示时间
        this.timeEl = document.createElement('div');
        this.timeEl.className = 'time';
  
        this.controls_left.appendChild(this.play_btn);
        this.controls_left.appendChild(this.timeEl);
        this.controlsEl.appendChild(this.controls_left);

        // 右边容器
        this.controls_right = document.createElement('div');

        this.volume_container = document.createElement('div');
        this.volume_container.innerHTML=`
            <div class="volume_con">
                <div class="volume_slider">
                    <input id="volumeslider" type='range' min="0" max="1" step="0.01" value="0.8"/>
                </div>
            </div>
            <i id="volume_img" class="button_img sound"></i>
        `;

        this.speed_container = document.createElement('div');
        this.speed_container.innerHTML = `
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
        `

        this.v_fullscreen = document.createElement('i');
        this.v_fullscreen.className = 'button_img full';

        this.controls_right.appendChild(this.volume_container);
        this.controls_right.appendChild(this.speed_container);
        this.controls_right.appendChild(this.v_fullscreen);
        this.controlsEl.appendChild(this.controls_right);
    }

    // 创建label
    createLabelEl() {
        this.labelEl = document.createElement('span');
        this.labelEl.className='date_label';
        this.labelEl.innerText = '00:00';
    }
}