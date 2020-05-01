import './scss/styles.scss';
import { Marker, Popup } from 'mapbox-gl';
import Map from './components/Map';
import data from './utls/assetsData';
import Line from './components/Line';
import { timelineWPercent, timeframe } from './utls/config';

const map = new Map();
const line = new Line(map);
const timelineWrapper = document.getElementById('timeline');
const timelinePoints = timelineWrapper.querySelector('#points');
const tStep = timelineWPercent / timeframe.length;

map.bindLine(line);
let timelinePointsD = [];

console.log(data);

const timelineInPx = (timelineWPercent / 100) * window.innerWidth;

data.forEach((d) => {
  const left = (new Date(d.date) - timeframe.start) * tStep;
  const leftInPx = (left / 100) * window.innerWidth;
});

// esto tiene que ser distinto para que se vea bien fuera de Colombia
function drawTimeline() {
  const clockStep = 1000 * 480;
  const wrapper = timelineWrapper.querySelector('#times');
  wrapper.innerHTML = '';

  for (let i = timeframe.start.getTime(); i < timeframe.end.getTime() + clockStep; i += clockStep) {
    const d = new Date(i);
    const min = document.createElement('span');
    min.className = 'timeRef';
    min.innerText = `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
    min.style.left = `${(d - timeframe.start) * tStep}%`;
    wrapper.appendChild(min);
  }
}

function createMarker(options, d, map) {
  return new Marker(options)
    .setLngLat(d.coords)
    .setPopup(
      new Popup({
        offset: 25,
      }).setHTML(
        `<h3>ID ${d.id}</h3><p class="markerTime">${new Date(d.date).toLocaleTimeString('es-CO')}</p><p>${d.desc}</p>`
      )
    )
    .addTo(map.map);
}

drawTimeline();

window.onresize = () => {
  map.resetBounds();
};

data.forEach((d, i) => {
  const options = d.hasOwnProperty('color') ? { color: d.color } : {};
  // createMarker(options, d, map);
  const timePoint = document.createElement('span');
  timePoint.className = 'timePoint';
  timePoint.id = `timePoint${i}`;
  timelinePoints.appendChild(timePoint);
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

  timePoint.onmouseenter = (e) => {
    const position = timePoint.getBoundingClientRect();
    const a = { x: position.x + position.width / 2, y: position.y + position.height / 2 };
    line.animate(a, map.getScreenCoordinates(d.coords), d.newBounds, d.coords);
  };

  timePoint.onmouseleave = () => {
    line.reset(d.newBounds);
  };
});
