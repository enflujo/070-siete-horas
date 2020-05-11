import Video from './Video';
import assestsData from '../utils/assetsData';

export default class {
  constructor() {
    this.wrapper = document.getElementById('content');
    this.intro = this.wrapper.querySelector('#intro');
    this.prose = this.wrapper.querySelector('#prose');
    this.video = new Video();
  }

  open(index) {
    this.intro.classList.add('hidden');
    const data = assestsData[index];
    this.video.bindVideo(data.id);
    this.prose.innerText = '';

    data.prose.forEach(proseLine => {
      const p = document.createElement('p');
      p.innerText = proseLine;
      this.prose.appendChild(p);
    });
  }
}
