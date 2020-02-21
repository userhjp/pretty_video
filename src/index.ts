import Video from './video';

window.onload = function () {
    const video = document.getElementById('MyVideo');
    const obj = new Video();
    obj.init(video);
}