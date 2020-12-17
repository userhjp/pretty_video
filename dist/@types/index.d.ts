import Config from './config';
import './index.less';
declare class PrettyVideo {
    /** 容器 */
    private containerElemelt;
    /** video播放器对象 */
    private video;
    /** 控制条 */
    private controls;
    /** 音量 */
    private volume;
    /** 全屏 */
    private fullscreenBtn;
    /** cover */
    private videoCover;
    private config;
    private envents;
    constructor();
    init(el: string | HTMLElement, config?: Config): void;
    /** 播放地址 */
    setUrl: (object: {
        src: string;
        poster?: string;
    }) => void;
    /** 重新加载视频 */
    reload: () => void;
    /** 开始播放 */
    play: () => Promise<void>;
    /** 是否暂停状态 */
    isPause(): boolean;
    /** 暂停播放 */
    pause: () => void;
    /** 设置音量 */
    setVolum: (value: number) => number;
    /** 销毁*/
    dispose: () => void;
    /** 获取当前播放时长 */
    getDuration: () => {
        currentSecond: number;
        durationSecond: number;
        currentText: string;
        durationText: string;
    };
    /**
     * 监听事件
     * @param eventName 事件名称
     * @param callback 回调
     */
    on(eventName: string, callback: Function): void;
    /**
     * 取消事件监听
     */
    unOn(eventName: string): void;
    /** 播放器配置 */
    private initConfig;
    private handleStateChange;
    /** 初始化控制条 */
    private initControls;
}
export default PrettyVideo;
