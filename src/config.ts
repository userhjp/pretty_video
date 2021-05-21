export default class Config {
  /** 视频加载是否自动播放 */
  autoplay? = false;
  /** 播放地址 */
  src?: string;
  /** 封面 */
  poster?: string;
  /** 是否自动隐藏控制栏 controls 为 true 有效*/
  autoHideControls? = false;
  /** 是否允许点击、拖动进度条跳转进度 默认true*/
  isFastForward? = true;
  /** 是否隐藏全屏按钮 默认fasle*/
  hideFullScreen? = false;
  /** 显示控制条 默认true */
  controls? = true;
  /** 视频结束是否循环播放 */
  loop? = false;
  /** 预加载 默认 auto*/
  preload?: 'auto' | 'meta' | 'none' = 'auto';
  debug? = false;
}
