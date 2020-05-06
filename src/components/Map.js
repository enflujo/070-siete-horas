import { Map } from 'mapbox-gl';
import { bounds, mapoxToken, mapboxStyle } from '../utls/config';
import data from '../utls/assetsData';
import { degToRad } from '../utls/helpers';

const features = [];
data.forEach((d) => {
  features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: d.coords,
    },
  });
});

export default class {
  constructor(content) {
    this.content = content;
    this.container = document.getElementById('map');
    this.stage = document.getElementById('stage');
    this.ctx = this.stage.getContext('2d');
    this.currentMarker;

    this.map = new Map({
      container: 'map',
      style: mapboxStyle,
      accessToken: mapoxToken,
      // zoom: 17.44,
      // center: [-74.108, 4.6355],
      bounds: bounds,
      interactive: false,
      attributionControl: true,
      fadeDuration: 0,
      preserveDrawingBuffer: true,
      customAttribution:
        '<a href="https://cerosetenta.uniandes.edu.co" target="_blank">070 Universidad de los Andes</a>',
    });

    this.setupMask();
  }

  setupMask() {
    this.maskCanvas = document.createElement('canvas');
    this.maskCtx = this.maskCanvas.getContext('2d');
    this.maskImg = new Image();
    this.maskImg.onload = () => {
      this.map.on('load', this.onMapLoaded);
      this.map.on('idle', this.applyMask);
      this.map.on('render', this.filter);
    };
    this.maskImg.src = '/imgs/cameraView.png';
    // document.body.appendChild(this.maskCanvas);
  }
  //
  applyMask = () => {
    if (!this.currentMarker) return;
    const d = this.currentMarker;
    const w = 306;
    const h = 302;
    const point = this.map.project(d.coords);

    let ctx = this.maskCtx;
    ctx.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(degToRad(d.r));
    ctx.drawImage(this.maskImg, 0, 0, w / d.sizeDivideBy, h / d.sizeDivideBy);
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(this.map._canvas, 0, 0);
    ctx.restore();

    ctx = this.ctx;
    ctx.save();
    // ctx.globalCompositeOperation = 'hard-light';
    // ctx.globalCompositeOperation = 'overlay';
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(this.maskCanvas, 0, 0);

    // ctx.drawImage(this.maskCanvas, 0, 0);
    ctx.restore();
  };

  onMapLoaded = () => {
    const map = this.map;

    map.addSource('points', {
      type: 'geojson',
      generateId: true,
      data: {
        type: 'FeatureCollection',
        features: features,
      },
    });

    map.addLayer({
      id: 'markers',
      type: 'circle',
      source: 'points',
      paint: {
        'circle-radius': 6,
        'circle-color': 'rgb(255,0,0)',
      },
    });

    map.on('mouseenter', 'markers', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const id = e.features[0].id;
      const d = data[id];
      const position = document.getElementById(`timePoint${id}`).getBoundingClientRect();
      const b = { x: position.x + position.width / 2, y: position.y + position.height / 2 };
      this.line.animate(this.getScreenCoordinates(d.coords), b, d.newBounds, d.coords);
      this.currentMarker = d;
      this.filter();
    });

    map.on('mouseleave', 'markers', (e) => {
      this.line.reset();
      map.getCanvas().style.cursor = '';
    });

    map.on('click', 'markers', (e) => {
      const id = e.features[0].id;
      this.content.open(id);
    });
  };

  bindLine(line) {
    this.line = line;
  }

  resetBounds() {
    this.map.fitBounds(bounds);
  }

  fitBounds(_bounds) {
    this.map.fitBounds(_bounds);
  }

  getScreenCoordinates(ltlang) {
    const point = this.map.project(ltlang);
    point.x += this.container.offsetLeft;
    return point;
  }

  filter = () => {
    const canvas = this.map.getCanvas();
    const ctx = this.ctx;
    this.stage.width = this.maskCanvas.width = this.container.clientWidth;
    this.stage.height = this.maskCanvas.height = this.container.clientHeight;

    ctx.drawImage(canvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const isMarkerPixel = data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0;
      if (isMarkerPixel) continue;

      // invertido
      // data[i] = data[i] ^ 255;
      // data[i + 1] = data[i + 1] ^ 255;
      // data[i + 2] = data[i + 2] ^ 255;
      // b&N

      const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray + 15;
      // invertido B&N
      // var grey = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      // data[i] = grey ^ 255;
      // data[i + 1] = grey ^ 255;
      // data[i + 2] = grey ^ 255;
    }
    ctx.putImageData(imgData, 0, 0, 0, 0, this.stage.width, this.stage.height);
    this.applyMask();
  };
}
