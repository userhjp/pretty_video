export declare class FullscreenBtn {
    el: HTMLElement;
    isFullscreen: boolean;
    constructor(videoEl: HTMLVideoElement);
    changeIcon(isFull: boolean): void;
    /** 全屏 */
    fullscreen(isFull: boolean, el: any): void;
}
