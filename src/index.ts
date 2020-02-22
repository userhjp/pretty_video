import Video from './video';

window.onload = function () {
    const video = document.getElementById('MyVideo');
    const obj = new Video();
    obj.init({
        el: video,
        src: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4',
        poster: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg',
    });
}