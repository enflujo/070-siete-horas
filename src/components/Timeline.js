import data from '../utils/assetsData';
import { timeframe, tStep } from '../utils/config';
export default class {
  constructor(map, content, line) {
    this.map = map;
    this.content = content;
    this.line = line;
    this.wrapper = document.getElementById('timeline');
    this.points = this.wrapper.querySelector('#points');
    this.times = this.wrapper.querySelector('#times');
    const playPause = this.wrapper.querySelector('#playPause');

    playPause.onclick = e => {
      playPause.classList.toggle('playing');
    };

    this.buildPoints();
    this.drawTimeline();
  }

  buildPoints() {
    data.forEach((d, i) => {
      const timePoint = document.createElement('span');
      timePoint.className = 'timePoint';
      timePoint.id = `timePoint${i}`;
      this.points.appendChild(timePoint);
      const left = (new Date(d.date) - timeframe.start) * tStep;

      if (left < 100) {
        timePoint.style.left = `${left}%`;
      } else {
        timePoint.classList.add('nextDay');
        timePoint.style.left = '100%';
      }

      if (d.hasOwnProperty('pushY')) {
        timePoint.style.bottom = `${timePoint.offsetTop + timePoint.offsetHeight + d.pushY}px`;
      }

      timePoint.onmouseenter = e => {
        const position = timePoint.getBoundingClientRect();
        const a = { x: position.x + position.width / 2, y: position.y + position.height / 2 };
        this.line.animate(a, this.map.getScreenCoordinates(d.coords), d.newBounds, d.coords);
        this.map.currentMarker = d;
        this.map.filter();
      };

      timePoint.onmouseleave = () => {
        this.line.reset(d.newBounds);
      };

      timePoint.onclick = () => {
        this.content.open(i);
      };
    });
  }

  drawTimeline() {
    const clockStep = 1000 * 480;
    this.times.innerHTML = '';

    for (let i = timeframe.start.getTime(); i < timeframe.end.getTime() + clockStep; i += clockStep) {
      const d = new Date(i);
      const min = document.createElement('span');
      min.className = 'timeRef';
      min.innerText = `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
      min.style.left = `${(d - timeframe.start) * tStep}%`;
      this.times.appendChild(min);
    }
  }
}
