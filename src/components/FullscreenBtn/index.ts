import { Utils } from '../../utils';
import './index.less';

export class FullscreenBtn {
  el: HTMLElement;
  isFullscreen = false;

  constructor(videoEl: HTMLVideoElement) {
    this.el = document.createElement('i');
    this.el.className = 'button_img full';

    this.el.addEventListener('click', () => {
      this.fullscreen(this.isFullscreen, videoEl);
    });
  }

  changeIcon(isFull: boolean) {
    if (isFull) {
      Utils.addClass(this.el, 'scale');
    } else {
      Utils.removeClass(this.el, 'scale');
    }
  }

  /** 全屏 */
  fullscreen(isFull: boolean, el: any) {
    if (isFull) {
      if (document['exitFullscreen']) {
        document['exitFullscreen']();
      } else if (document['webkitCancelFullScreen']) {
        document['webkitCancelFullScreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      } else if (document['webkitEnterFullscreen']) {
        return;
      }
      this.isFullscreen = false;
      this.changeIcon(false);
    } else {
      const requestMethod =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen ||
        el.webkitEnterFullscreen ||
        el.enterFullScreen;
      if (requestMethod) {
        requestMethod.call(el);
        if (el.webkitEnterFullscreen || el.enterFullScreen) return;
        this.isFullscreen = true;
        this.changeIcon(true);
      } else {
        alert('该浏览器不支持全屏');
      }
    }
  }
}
