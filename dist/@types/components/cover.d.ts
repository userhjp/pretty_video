export declare class VideoCover {
    private containerElemelt;
    el: HTMLElement;
    err_cover: HTMLElement;
    loading_cover: HTMLElement;
    play_btn_cover: HTMLDivElement;
    play: () => void;
    constructor(containerElemelt: HTMLDivElement);
    setState(state: 'play' | 'loading' | 'error' | ''): void;
}
