import Config from '../config';
import { Video } from './video';
export declare class Controls {
    private video;
    private containerElemelt;
    private config;
    controlsEl: HTMLElement;
    labelEl: HTMLElement;
    progress: HTMLElement;
    current_progress: HTMLElement;
    current_buffer: HTMLElement;
    current_dot: HTMLElement;
    play_btn: HTMLElement;
    timeEl: HTMLElement;
    controls_left: HTMLElement;
    controls_right: HTMLElement;
    isMove: boolean;
    constructor(video: Video, containerElemelt: any, config: Config);
    /** 获取进度条宽度，实时获取 */
    get progressWidth(): number;
    createControlsEl(): void;
    /** 控制条拖拽事件 */
    initControlsEvent(): void;
    /** 自动显示隐藏控制条 */
    initAutoControls(): void;
    createControlsBtn(): void;
    /** 设置播放按钮状态 */
    changePlay(isPause: boolean): void;
    /**
     * 根据当前x位置计算在进度条占比
     * @param offsetX 距离进度条的偏移
     */
    offsetXPer(offsetX: number): number;
    /**
     * 根据当前x位置计算当前时间进度
     * @param per
     */
    getOffsetXTimeText(offsetX: number): string;
    /** 设置缓存进度条百分比样式 */
    setBufferPer(per: number): void;
    /** 设置进度条百分比样式 */
    setCurrentPlayPer(per: number): void;
    /** 更新展示当前播放时间进度 */
    changePlayTimeText(): void;
    /**
     * 根据当前位置更新播放器进度
     * @param offsetX 当前进度条偏移位置
     */
    setPlayTime(offsetX: number): void;
    private timeout;
    /** 显示控制条 */
    showControls: () => void;
    /** 4秒后隐藏控制条 */
    hideControls: () => void;
    /** 改变label位置 */
    showmoveLabel: (offsetX: number) => void;
    /** 隐藏label */
    hidemoveLabel: () => void;
    /** 进度条变粗大 */
    progressHover: (isHover: boolean) => void;
}
