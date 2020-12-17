export declare type VideoState = 'loadstart' | 'canplay' | 'play' | 'pause' | 'waiting' | 'timeupdate' | 'playing' | 'ended' | 'error' | 'seeked' | 'loadedmetadata' | 'canplaythrough' | 'durationchange' | 'progress' | 'x5videoenterfullscreen' | 'x5videoexitfullscreen';
export declare class Video {
    onEvent: (eventName: VideoState, e: any) => void;
    el: HTMLVideoElement;
    posterEl: HTMLImageElement;
    constructor();
    setCurrentTime(time: number): void;
    /** 播放地址 */
    setUrl(object: {
        src: string;
        poster?: string;
    }): void;
    private setState;
    showPoster(): void;
    hidePoster(): void;
    get duration(): number;
    get currentTime(): number;
    createPosterEl(): void;
    createVideoEl(): void;
    private initEvent;
}
