<template>
  <section id="stage">
    <div ref="map" id="map"></div>
    <div id="markers">
      <span
        :id="`marker${i}`"
        class="marker"
        v-for="(event, i) in assetsData"
        :key="i"
        :ref="`marker${i}`"
        :data-index="i"
        @mouseenter="onMarkerEnter"
        @mouseleave="onMarkerLeave"
        @click="onMarkerClick"
      ></span>
    </div>
    <canvas id="filter" ref="filter"></canvas>
  </section>
</template>

<script>
import { Map } from 'mapbox-gl';
import { mapboxStyle, mapoxToken, bounds } from '../utils/config';
import assetsData from '../utils/assetsData';
import { degToRad } from '../utils/helpers';

const features = [];
assetsData.forEach(d => {
  features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: d.coords
    }
  });
});

export default {
  name: 'Stage',
  props: {
    eventData: Object,
    zoom: Boolean,
    assetsData: Array
  },

  mounted() {
    this.map = new Map({
      container: 'map',
      style: mapboxStyle,
      accessToken: mapoxToken,
      bounds: bounds,
      interactive: false,
      attributionControl: true,
      fadeDuration: 0,
      preserveDrawingBuffer: true,
      customAttribution:
        '<a href="https://cerosetenta.uniandes.edu.co" target="_blank">070 Universidad de los Andes</a>'
    });

    this.container = document.getElementById('stage');
    this.filterCanvas = this.$refs.filter;
    this.filterCtx = this.filterCanvas.getContext('2d');
    this.maskCanvas = document.createElement('canvas');
    this.maskCtx = this.maskCanvas.getContext('2d');
    this.resize();
    this.maskImg = new Image();
    this.maskImg.onload = () => {
      this.map.on('load', this.onMapLoaded);
      this.map.on('render', this.onMapRender);
    };
    this.maskImg.src = '/imgs/cameraView.png';
  },

  watch: {
    eventData: function() {
      this.filter();
    },
    zoom: function() {
      if (this.zoom) {
        this.map.fitBounds(this.eventData.bounds || bounds);
      } else {
        this.map.fitBounds(bounds);
      }
    }
  },

  methods: {
    resize() {
      this.filterCanvas.width = this.maskCanvas.width = this.container.clientWidth;
      this.filterCanvas.height = this.maskCanvas.height = this.container.clientHeight;
      this.assetsData.forEach((event, i) => {
        const marker = this.$refs[`marker${i}`][0];
        const coords = this.map.project(event.coords);
        marker.style.left = `${coords.x}px`;
        marker.style.top = `${coords.y}px`;
      });
    },

    onMapRender() {
      this.filter();
    },

    onMarkerEnter(e) {
      const id = e.target.dataset.index;
      const timelinePoint = document.getElementById(`timePoint${id}`);
      const timeCoords = timelinePoint.getBoundingClientRect();
      const markCoords = e.target.getBoundingClientRect();
      timelinePoint.classList.add('hover');
      this.$emit('setEventData', id);
      this.$emit('setLinePoints', {
        x1: markCoords.x + markCoords.width / 2,
        y1: markCoords.y + markCoords.height / 2,
        x2: timeCoords.x + timeCoords.width / 2,
        y2: timeCoords.y + timeCoords.height / 2
      });
    },

    onMarkerLeave(e) {
      const id = e.target.dataset.index;
      document.getElementById(`timePoint${id}`).classList.remove('hover');
      this.$emit('setEventData', null);
      this.$emit('setLinePoints', { x1: 0, y1: 0, x2: 0, y2: 0 });
    },

    onMarkerClick(e) {
      this.$emit('setEventData', e.target.dataset.index, true);
    },

    onMapLoaded() {
      this.$emit('bindMap', this.map);

      // const map = this.map;

      // map.addSource('points', {
      //   type: 'geojson',
      //   generateId: true,
      //   data: {
      //     type: 'FeatureCollection',
      //     features: features
      //   }
      // });

      // map.addLayer({
      //   id: 'markers',
      //   type: 'circle',
      //   source: 'points',
      //   paint: {
      //     'circle-radius': 6,
      //     'circle-color': 'rgb(255,0,0)'
      //   }
      // });

      // map.on('mouseenter', 'markers', e => {
      //   // map.getCanvas().style.cursor = 'pointer';
      //   // const id = e.features[0].id;
      //   // const d = assetsData[id];
      //   // const timelinePoint = document.getElementById(`timePoint${id}`);
      //   // const position = timelinePoint.getBoundingClientRect();
      //   // this.correspondingEle = timelinePoint;
      //   // timelinePoint.classList.add('hover');
      //   // this.$emit('setLinePoints', { x2: position.x + position.width / 2, y2: position.y + position.height / 2 });
      // });

      // map.on('mouseleave', 'markers', e => {
      //   // map.getCanvas().style.cursor = '';
      //   // this.correspondingEle.classList.remove('hover');
      //   // this.$emit('setLinePoints', { x1: 0, y1: 0, x2: 0, y2: 0 });
      // });

      // map.on('click', 'markers', e => {
      //   this.$emit('setEventData', e.features[0].id, true);
      // });

      // this.$emit('bindMap', map);
    },

    applyMask() {
      if (!this.eventData) return;
      const d = this.eventData;
      const maskW = 306;
      const maskH = 302;
      const point = this.map.project(d.coords);

      let ctx = this.maskCtx;
      ctx.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(degToRad(d.r));
      ctx.drawImage(this.maskImg, 0, 0, maskW / d.sizeDivideBy, maskH / d.sizeDivideBy);
      ctx.restore();
      ctx.save();
      ctx.globalCompositeOperation = 'source-atop';
      ctx.drawImage(this.map.getCanvas(), 0, 0);
      ctx.restore();

      ctx = this.filterCtx;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(this.maskCanvas, 0, 0);
      ctx.restore();
    },

    filter() {
      const map = this.map.getCanvas();
      const ctx = this.filterCtx;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.resize();
      ctx.drawImage(map, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      let data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const isMarkerPixel = data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0;
        if (isMarkerPixel) continue;

        const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray + 15;
      }
      ctx.putImageData(imgData, 0, 0, 0, 0, w, h);
      this.applyMask();
    }
  }
};
</script>

<style lang="scss">
@import '../scss/utils/_variables.scss';

#stage {
  width: $stageWidth;
  height: $stageHeight;
  // pointer-events: none;
}

#map {
  // pointer-events: all;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;

  canvas {
    &:focus {
      outline: 0;
    }
  }
}

#markers {
  width: 52%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  .marker {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: yellow;
    transform: translate(-50%, -50%);

    &:hover {
      cursor: pointer;
    }
  }
}

#filter {
  width: $stageWidth;
  height: $stageHeight;
  position: absolute;
  top: 0;
  right: 0;
}

.mapboxgl-control-container {
  display: none;
}

// #map,
// #mask {
//   z-index: 1;
//   // position: absolute;
//   right: 0;
// }
</style>
