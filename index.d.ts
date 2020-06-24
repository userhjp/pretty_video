
export interface Config {
    /** 视频加载是否自动播放 */
    autoplay?: boolean;
    /** 播放地址 */
    src?: string;
    /** 封面 */
    poster?: string;
    /** 是否自动隐藏控制栏 controls 为 true 有效*/
    autoHideControls?: boolean;
    /** 是否允许点击、拖动进度条跳转进度 默认true*/
    isFastForward?: boolean; 
    /** 是否隐藏全屏按钮 默认fasle*/
    hideFullScreen?: boolean;
    /** 显示控制条 默认true */
    controls?: boolean;
    /** 视频结束是否循环播放 */
    loop?: boolean;
    /** 预加载 默认 auto*/
    preload?: 'auto' | 'meta' | 'none';
}

export default class PrettyVideo {
    /** 初始化 */
    init(el: string | HTMLElement, config: Config): void;
    /** 获取当前播放时长和总时长 */
    getDuration(): { currentSecond: number, durationSecond: number, currentText: string, durationText: string };
    /** 修改config */
    setupConfig(newConfig: Config): void;
    /** 修改播放地址 */
    setUrl(obj: { src: string, poster?: string }): void;
    /** 重置播放 */
    reload(): void;
    /** 播放 */
    play(): void;
    /** 暂停 */
    pause(): void;
     /** 是否暂停状态 */
    isPause(): boolean;
     /** 设置音量 0-1 */
    setVolum(num: number): void;
    /** 监听事件 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'playing' | 'ended' | 'error' | 'seeked' | 'loadedmetadata' */
    on(eventName: string, callback: () => {}): void;
    /** 取消事件监听 */
    unOn(eventName: string): void
    /** 销毁video包括dom元素 */
    dispose(): void
}