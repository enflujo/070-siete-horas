import './scss/styles.scss';
import Map from './components/Map';
import data from './utls/assetsData';
import Line from './components/Line';
import { timelineWPercent, timeframe, tStep } from './utls/config';
import Content from './components/Content';
import Timeline from './components/Timeline';
import Debug from './utls/Debug';
const content = new Content();
const map = new Map(content);
const line = new Line(map);
const timeline = new Timeline(map, content, line);
const debug = new Debug(map);
debug.printMouseCoords();
map.bindLine(line);

let timelinePointsD = [];

console.log(data);

const timelineInPx = (timelineWPercent / 100) * window.innerWidth;

data.forEach((d) => {
  const left = (new Date(d.date) - timeframe.start) * tStep;
  const leftInPx = (left / 100) * window.innerWidth;
});

window.onresize = map.resetBounds();
