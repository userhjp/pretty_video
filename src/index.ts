import Video from './main';

window.onload = function () {
    const video = document.getElementById('MyVideo');
    const obj = new Video();
    obj.init(video);
}