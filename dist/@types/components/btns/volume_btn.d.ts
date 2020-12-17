export declare class VolumeBtn {
    valueChange: (value: number) => void;
    el: HTMLElement;
    /** 音量slider */
    volumeSlider: HTMLInputElement;
    /** 当前视频播放音量 0 - 1 */
    currentvolum: number;
    /** 是否静音 */
    isMute: boolean;
    constructor();
    /** 设置音量 */
    setValue(val: number | string): void;
}
