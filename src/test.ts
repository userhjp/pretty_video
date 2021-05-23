declare let PrettyVideo: any;

const obj = {
  one: {
    url: 'https://1251605855.vod2.myqcloud.com/de5144f0vodtranscq1251605855/625d5e105285890805262076936/v.f30.mp4?t=5f867ee3&exper=180&us=4d90a17646f344d5aaf1c8ce56490c15&sign=167c9091c6c4ace78c255c0617961306',
    poster: 'https://mjobh5.12582.cn/Uploads/2020/4/09dfcbe8-a2cb-4059-b7ea-ee3f96325845.jpg',
  },
  two: {
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    poster: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg',
  },
};

function initVideo() {
  //   const res = await import(/* webpackChunkName: 'video.min' */ './index');
  PrettyVideo.init('PrettyVideo', {
    // src: obj['one'].url,
    // poster: obj['one'].poster,
    autoplay: false,
    controls: true,
    autoHideControls: true,
    hideFullScreen: false,
  });
  changeurl('one');
}

function changeurl(type) {
  PrettyVideo.setUrl({
    src: obj[type].url,
    poster: obj[type].poster,
  });
}
window.onload = () => initVideo();
