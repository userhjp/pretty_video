import { Utils } from '../../utils';

export class FullscreenBtn {
    el: HTMLElement;
    isFullscreen: boolean = false;
    
    constructor(controlsEl: HTMLElement) {
        this.el = document.createElement('i');
        this.el.className = 'button_img full';

        this.el.addEventListener('click', () => {
            this.changeIcon(!this.isFullscreen);
            this.fullscreen(this.isFullscreen, controlsEl);
          })
    };

    changeIcon(isFull: boolean) {
        if (isFull) {
            Utils.addClass(this.el, 'scale');
          } else {
            Utils.removeClass(this.el, 'scale')
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
            } else {
                return;
            }
            this.isFullscreen = false;
        } else {
            const requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            if (requestMethod) {
                requestMethod.call(el);
                this.isFullscreen = true;
            } else {
                alert('该浏览器不支持全屏')
            }
        }
    }
}