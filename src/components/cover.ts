export class VideoCover {
  el: HTMLElement; // 音量按钮容器
  err_cover: HTMLElement;
  loading_cover: HTMLElement;
  play_btn_cover: HTMLDivElement;

  play: () => void;

  constructor(private containerElemelt: HTMLDivElement) {
    this.el = document.createElement('div');
    this.el.className = 'video_cover';

    // 播放按钮
    const play_btn = document.createElement('div');
    play_btn.className = 'cover_content';
    play_btn.innerHTML = '<div class="cover_img play play_btn"></div>';
    play_btn.addEventListener('click', () => this.play && this.play());
    this.play_btn_cover = play_btn;

    // 错误
    const err = document.createElement('div');
    err.className = 'cover_content';
    err.innerHTML = `
            <div class="cover_img error"></div>
            <div class="tips_text tips_error">资源加载失败~</div>
        `;
    this.err_cover = err;

    // 加载中
    const loading = document.createElement('div');
    loading.className = 'cover_content';
    loading.innerHTML = `
            <div class="video_loading">
                <div>
                    <div class="spot"></div>
                    <div class="spot"></div>
                    <div class="spot"></div>
                    <div class="spot"></div>
                    <div class="spot"></div>
                </div>
                <div class="tips_text">正在加载...</div>
            </div>
        `;
    this.loading_cover = loading;
  }

  setState(state: 'play' | 'loading' | 'error' | '') {
    if (this.containerElemelt.contains(this.el)) {
      this.containerElemelt.removeChild(this.el);
    }
    this.el.innerHTML = '';
    switch (state) {
      case 'play':
        this.el.appendChild(this.play_btn_cover);
        break;
      case 'loading':
        this.el.appendChild(this.loading_cover);
        break;
      case 'error':
        this.el.appendChild(this.err_cover);
        break;
      default:
        break;
    }
    if (this.el.hasChildNodes()) {
      this.containerElemelt.appendChild(this.el);
    }
  }
}
