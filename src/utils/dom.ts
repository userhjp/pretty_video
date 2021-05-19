// dom操作
class Dom {
  nodes: { [key: string]: any } = {};
  constructor(selector: string | Element) {
    let el: NodeListOf<HTMLElement>;
    if (typeof selector === 'string') {
      el = document.querySelectorAll(selector);
      for (let i = 0; i < el.length; i++) {
        this.nodes[i] = el[i];
      }
      this.nodes.length = el.length;
    } else if (selector instanceof Node) {
      this.nodes = {
        0: selector,
        Length: 1,
      };
    }
  }

  /**
   * 遍历元素
   */
  each(callback: (el: HTMLElement) => void) {
    for (let i = 0; i < this.nodes.length; i++) {
      callback(this.nodes[i]);
    }
  }

  /**
   * 获取dom元素
   */
  get(index = 0) {
    return this.nodes[index];
  }

  /**
   * 判断class是否存在
   * @param cls class名称
   */
  hasClass(cls: string) {
    let bool = false;
    this.each((el) => {
      if (el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) bool = true;
    });
    return bool;
  }

  /**
   * 添加class
   * @param cls class
   */
  addClass(cls: string) {
    this.each((el) => {
      if (!this.hasClass(cls)) el.className += ' ' + cls;
    });
    return this;
  }

  /**
   * 删除class
   * @param obj dom对象
   * @param cls class
   */
  removeClass(cls: string) {
    this.each((el) => {
      const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    });
    return this;
  }

  /**
   * 切换class 有则删除，无则添加
   * @param obj dom对象
   * @param cls class
   */
  toggleClass(cls: string) {
    if (this.hasClass(cls)) {
      this.removeClass(cls);
    } else {
      this.addClass(cls);
    }
    return this;
  }

  /**
   * 创建dom元素
   * @param tag 标签 例如div
   */
  createElemt(tag: string) {
    return document.createElement(tag);
  }

  /** 设置html */
  html(html: string) {
    this.each((el) => {
      return (el.innerHTML = html);
    });
    return this;
  }

  /** 设置text */
  text(text: string) {
    this.each((el) => {
      return (el.innerText = text);
    });
    return this;
  }

  /**
   * 设置属性
   */
  setAttr(key: string, value: string) {
    this.each((el) => {
      el.setAttribute(key, value);
    });
    return this;
  }

  /**
   * 设置样式属性
   * @param event
   * @param fun
   */
  setStyle(name: string, value: string) {
    this.each((el: any) => {
      el.style[name] = value;
    });
    return this;
  }

  /**
   * 显示
   */
  show() {
    this.each((el: any) => {
      el.style['display'] = 'block';
    });
    return this;
  }

  /**
   * 隐藏
   */
  hide() {
    this.each((el: any) => {
      el.style['display'] = 'none';
    });
    return this;
  }

  /**
   * 监听事件
   */
  on(event: string, fun: (e) => void) {
    this.each((el) => {
      el.addEventListener(event, fun, false);
    });
    return this;
  }

  /**
   * 监听鼠标按下事件
   */
  onmousedown(callback: (ev: MouseEvent | any) => any) {
    this.each((el) => {
      el.onmousedown = callback;
    });
  }
}

export default function (selector: Element | string) {
  // const ela = new Dom(selector);
  return new Dom(selector);
}
