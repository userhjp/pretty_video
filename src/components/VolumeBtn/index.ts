import { Utils } from '../../utils';
import './index.less';

export class VolumeBtn {
  valueChange: (value: number) => void; // 事件
  el: HTMLElement; // 音量按钮容器
  /** 音量容器 */
  volumeRange: any;
  /** 当前进度 */
  volumeProgress: any;
  /** 拖动按钮 */
  volumeDot: any;
  /** 音量百分比展示dom */
  volumeText: any;
  /** 当前视频播放音量 0 - 1 */
  currentvolum = 0.8;
  /** 是否静音 */
  isMute = false;

  private isMove = false;

  constructor() {
    this.init();
  }

  init() {
    const isPc = Utils.isPC();
    this.el = document.createElement('div');
    this.el.className = 'volume_bth';

    this.el.innerHTML = `
            <div class="volume_con fill">
                <div id="volume_text"></div>
                <div id="volume_range">
                  <i id="volume_progress"></i>
                  <div class="volume_dot_warp">
                    <i id="volume_dot" class="dot"></i>
                  </div>
                </div>
            </div>
            <div id="volume_img" class="button_img sound"></div>
        `;

    this.volumeProgress = this.el.querySelector('#volume_progress');
    this.volumeDot = this.el.querySelector('#volume_dot');
    this.volumeRange = this.el.querySelector('#volume_range');
    this.volumeText = this.el.querySelector('#volume_text');
    this.changeValue(this.currentvolum);
    this.volumeRange.addEventListener('click', (e) => {
      if (e.target.id === 'volume_dot') return;
      const currentHeight = e.currentTarget.clientHeight;
      const height = e.target.clientHeight;
      const per = ((height - e.offsetY) / currentHeight).toFixed(3);
      this.changeValue(+per);
    });

    // pc端 和移动端事件区分
    const touchstart = isPc ? 'mousedown' : 'touchstart'; // 鼠标按下/触摸
    const touchmove = isPc ? 'mousemove' : 'touchmove'; // 开始移动/拖动
    const touchend = isPc ? 'mouseup' : 'touchend'; // 松开/手指移开
    this.volumeDot.addEventListener(
      touchstart,
      (event: any) => {
        event.preventDefault();
        if (this.isMove) return;
        // 如果这个元素的位置内只有一个手指
        if (isPc || event.targetTouches.length === 1) {
          const touch = isPc ? event : event.targetTouches[0];
          const height = this.volumeRange.clientHeight; // 音量条长度
          const startClientY = touch.clientY;
          const offsetTop = this.volumeProgress.offsetTop < 0 ? 0 : this.volumeProgress.offsetTop > height ? height : this.volumeProgress.offsetTop;
          // 开始拖动
          const move = (e) => {
            this.isMove = true;
            const touch2 = isPc ? e : e.targetTouches[0];
            const offsetY = startClientY - touch2.clientY;
            const currentOffsetY = height - offsetTop + offsetY; // 当前位置偏移
            // let currentOffsety = offsetY + currentOffsetY;
            // currentOffsetY = currentOffsetY < 0 ? 0 : currentOffsetY > height ? height : currentOffsetY;
            let per = +(currentOffsetY / height).toFixed(6);
            per = per < 0 ? 0 : 1 < per ? 1 : per;
            this.changeValue(+per);
          };

          // 如果PC浏览器下，需要全局监听拖动
          const dotElmt = isPc ? window : this.volumeDot;
          // 拖动完成 删除事件
          const chend = () => {
            this.isMove = false;
            dotElmt.removeEventListener(touchmove, move);
            dotElmt.removeEventListener(touchend, chend);
          };
          dotElmt.addEventListener(touchmove, move);
          dotElmt.addEventListener(touchend, chend);
        }
      },
      false
    );

    // 点击事件
    if (Utils.isPC()) {
      (this.el.querySelector('#volume_img') as any).addEventListener('click', (e) => {
        // e.preventDefault();
        this.isMute = !this.isMute;
        const val = this.isMute ? 0 : this.currentvolum;
        this.setValue(val);
        this.valueChange && this.valueChange(val / 100);
      });
    }
  }

  // 音量改变
  changeValue = (num: number) => {
    this.currentvolum = num;
    this.setValue(this.currentvolum);
    this.valueChange && this.valueChange(this.currentvolum);
  };

  /** 设置音量 */
  setValue(val: number | string) {
    const value = typeof val === 'string' ? parseFloat(val) : val;
    const per = value * 100;
    this.volumeProgress.style.height = `${per}%`;
    this.volumeDot.style.bottom = `${per}%`;
    this.volumeText.innerText = Math.round(per);
    const volume_bth = this.el.querySelector('#volume_img');
    if (value && volume_bth) {
      volume_bth.classList.remove('mute');
    } else {
      volume_bth.classList.add('mute');
    }
  }
}
