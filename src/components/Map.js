import { Map } from 'mapbox-gl';
import { bounds, mapoxToken, mapboxStyle } from '../utls/config';
import data from '../utls/assetsData';

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
  constructor() {
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
      customAttribution:
        '<a href="https://cerosetenta.uniandes.edu.co" target="_blank">070 Universidad de los Andes</a>',
    });

    this.map.on('load', this.onMapLoaded);
  }

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
        'circle-color': '#B42222',
      },
    });

    map.on('mouseenter', 'markers', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const id = e.features[0].id;
      const position = document.getElementById(`timePoint${id}`).getBoundingClientRect();
      const b = { x: position.x + position.width / 2, y: position.y + position.height / 2 };
      this.line.animate(this.getScreenCoordinates(data[id].coords), b, data[id].newBounds, data[id].coords);
    });

    map.on('mouseleave', 'markers', (e) => {
      this.line.reset();
      map.getCanvas().style.cursor = '';
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

  getScreenCoordinates(point) {
    return this.map.project(point);
  }
}
