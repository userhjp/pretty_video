import './index.less';

export class SpeedBtn {
  valueChange: (value: number) => void; // 事件
  el: HTMLElement; // 音量按钮容器
  value = 0.8; // 当前视频播放音量 0 - 1

  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'speed_bth';

    this.el.innerHTML = `
            <div id="speed_con" class="speed_li fill">
                <div>2.0x</div>
                <div>1.5x</div>
                <div>1.2x</div>
                <div class="on">1.0x</div>
                <div>0.5x</div>
            </div>
            <span id="speed_btn">1.0x</span>
        `;

    const speed_con = this.el.querySelectorAll('#speed_con > div') || [];
    const speed_btn = this.el.querySelector('#speed_btn') as any;
    /** 倍速列表点击事件 */
    speed_con.forEach((f: Element) => {
      f.addEventListener('click', (e: any) => {
        speed_con.forEach((el: Element) => {
          el.classList.remove('on');
        });
        e.target.classList.add('on');
        speed_btn.innerText = e.target.innerText;
        this.value = parseFloat(e.target.innerText);
        this.valueChange && this.valueChange(this.value);
      });
    });
  }
}
