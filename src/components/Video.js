export default class {
  constructor() {
    this.video = document.getElementById('video');
    document.getElementById('videoWrapper').appendChild(this.video);

    this.video.oncanplay = (e) => {
      this.video.play();
    };

    // this.video.onclick = (e) => {
    //   if (this.video.paused) {
    //     this.video.play();
    //   } else {
    //     this.video.pause();
    //   }
    // };
  }

  bindVideo(id) {
    this.video.classList.add('visible');
    this.video.pause();
    this.video.innerHTML = '';
    const mp4 = document.createElement('source');
    const webm = document.createElement('source');
    const ogv = document.createElement('source');

    mp4.src = `./videos/${id}/${id}.mp4`;
    mp4.setAttribute('type', 'video/mp4');
    webm.src = `./videos/${id}/${id}.webm`;
    webm.setAttribute('type', 'video/webm');
    ogv.src = `./videos/${id}/${id}.ogv`;
    ogv.setAttribute('type', 'video/ogg');
    this.video.appendChild(webm);
    this.video.appendChild(mp4);
    this.video.appendChild(ogv);
    this.video.load();
  }
}
