export class Utils {
  /**
   * 判断class是否存在
   * @param el dom对象
   * @param cls class名称
   */
  static hasClass(el: HTMLElement, cls: string) {
    return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  /**
   * 添加class
   * @param el dom对象
   * @param cls class
   */
  static addClass(el: HTMLElement, cls: string) {
    // if (!this.hasClass(el,cls)) el.className += ' ' + cls;
    if (!this.hasClass(el, cls)) el.classList.add(cls);
  }

  /**
   * 删除class
   * @param el dom对象
   * @param cls class
   */
  static removeClass(el: HTMLElement, cls: string) {
    if (this.hasClass(el, cls)) {
      // var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      // el.className = el.className.replace(reg, ' ');
      el.classList.remove(cls);
    }
  }

  /**
   * 切换class 有则删除，无则添加
   * @param el dom对象
   * @param cls class
   */
  static toggleClass(el: HTMLElement, cls: string) {
    if (this.hasClass(el, cls)) {
      if (this.hasClass(el, cls)) {
        this.removeClass(el, cls);
      } else {
        this.addClass(el, cls);
      }
    }
  }

  /** 是否是PC端 */
  static isPC() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']; // 判断用户代理头信息
    let flag = true;
    for (const i in Agents) {
      if (userAgentInfo.indexOf(Agents[i]) !== -1) {
        flag = false;
        break;
      }
    }
    return flag; // true为pc端，false为非pc端
  }

  /** 时间秒转换为时分秒
   * @param value 秒
   */
  static formatSeconds(value): string {
    let secondTime = parseInt(value); // 秒
    let minuteTime = 0; // 分
    let hourTime = 0; // 小时
    if (secondTime >= 60) {
      minuteTime = Math.floor(secondTime / 60);
      secondTime = Math.floor(secondTime % 60);
      if (minuteTime >= 60) {
        hourTime = Math.floor(minuteTime / 60);
        minuteTime = Math.floor(minuteTime % 60);
      }
    }
    let joinDate = `${this.PrefixInteger(minuteTime)}:${this.PrefixInteger(secondTime)}`;
    if (hourTime > 0 || value >= 3600) joinDate = `${this.PrefixInteger(hourTime)}:${joinDate}`;
    return joinDate;
  }

  /**
   * utils 数字向下取整
   * @param num 数字
   * @param len 长度
   */
  static PrefixInteger(num: number, len = 2) {
    num = isNaN(num) ? 0 : Math.floor(num); // 向下取整
    return (Array(len).join('0') + num).slice(-len);
  }
}
