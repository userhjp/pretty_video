import { Utils } from '../../utils';

export class VolumeBtn {
    valueChange: (value: number) => void; // 事件
    el: HTMLElement; // 音量按钮容器
    /** 音量slider */
    volumeSlider: HTMLInputElement;
    /** 当前视频播放音量 0 - 1 */
    currentvolum = 0.8;
    /** 是否静音 */
    isMute = false;
    
    constructor() {
        this.el = document.createElement('div');
        this.el.className="volume_bth";
        
        this.el.innerHTML=`
            <div class="volume_con">
                <div class="volume_slider">
                    <input id="volumeslider" type='range' min="0" max="1" step="0.01" value="0.8"/>
                </div>
            </div>
            <i id="volume_img" class="button_img sound"></i>
        `;

        this.volumeSlider = this.el.querySelector('#volumeslider') as any;

        // 音量拖动事件
        this.volumeSlider.oninput = (e: any) => {
            e.preventDefault();
            this.currentvolum = e.target.value;
            this.setValue(this.currentvolum);
            this.valueChange && this.valueChange(this.currentvolum);
        };

        // 点击事件
        if(Utils.isPC()) {
            (this.el.querySelector('#volume_img') as any).addEventListener('click', (e) => {
                e.preventDefault();
                this.isMute = !this.isMute;
                const val = this.isMute ? 0 : this.currentvolum;
                this.setValue(val);
                this.valueChange && this.valueChange(val);
            });
        }
      
    };

    /** 设置音量 */
    setValue(val: number | string) {
        const value = typeof val === 'string' ? parseFloat(val) : val;
        this.volumeSlider.style.backgroundSize = `${value * 100}% 100%`; /*设置左右宽度比例*/
        this.volumeSlider.value = `${val}`;
        const volume_bth = this.el.querySelector('#volume_img');
        if (value && volume_bth) {
            volume_bth.classList.remove('mute');
        } else {
            volume_bth.classList.add('mute');
        }
    }
    
}