<template>
  <section id="stage" ref="stage" class="col2">
    <Legend />
    <div ref="map" id="map"></div>
    <div id="markers">
      <span
        :id="`marker${i}`"
        :class="{
          marker: true,
          herido: event.category === 'herido',
          muerto: event.category === 'muerto',
          estimatedLoc: event.estimatedLoc,
        }"
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
    <Places :map="map" :tick="tick"></Places>
  </section>
</template>

<script>
import { Map } from 'mapbox-gl';
import Places from './Places.vue';
import Legend from './Legend.vue';
import { mapboxStyle, mapoxToken, bounds } from '../utils/config';
import assetsData from '../utils/assetsData';
import { degToRad } from '../utils/helpers';
import img from '../imgs/cameraView.png';

export default {
  name: 'Stage',
  props: {
    eventData: Object,
    contentData: Object,
    zoom: Boolean,
    assetsData: Array
  },

  components: { Places, Legend },

  data() {
    return {
      preserve: false,
      map: null,
      tick: Date.now()
    };
  },

  mounted() {
    this.container = document.getElementById('stage');
    this.filterCanvas = this.$refs.filter;
    this.filterCtx = this.filterCanvas.getContext('2d');
    this.maskCanvas = document.createElement('canvas');
    this.maskCtx = this.maskCanvas.getContext('2d');

    this.maskImg = new Image();
    this.maskImg.onload = () => {
      this.map = new Map({
        container: 'map',
        style: mapboxStyle,
        accessToken: mapoxToken,
        interactive: false,
        // zoom: 17.44,
        // center: [-74.108, 4.6355],
        bounds: bounds,
        attributionControl: true,
        fadeDuration: 0,
        preserveDrawingBuffer: true,
        customAttribution:
          '<a href="https://cerosetenta.uniandes.edu.co" target="_blank">070 Universidad de los Andes</a>'
      });
      this.map.on('load', this.onMapLoaded);
      this.map.on('render', this.filter);
      this.map.on('moveend', () => (this.preserve = false));
      this.map.on('resize', () => this.resize);
    };
    this.maskImg.src = img;
  },

  watch: {
    eventData: function() {
      this.filter();
    },
    zoom: function(zoom) {
      if (zoom) {
        const boundCoords = this.contentData ? this.contentData.bounds : bounds;
        this.map.fitBounds(boundCoords);
      } else {
        this.map.fitBounds(bounds);
      }
    },
    contentData: function(d) {
      if (d) {
        this.map.fitBounds(d.bounds);
        this.$emit('setLinePoints', { x1: 0, y1: 0, x2: 0, y2: 0 });
      }
    }
  },

  methods: {
    resize() {
      const canvas = this.map.getCanvas();
      this.filterCanvas.width = this.maskCanvas.width = canvas.width;
      this.filterCanvas.height = this.maskCanvas.height = canvas.height;
    },

    adaptMarkers() {
      this.assetsData.forEach((event, i) => {
        const marker = this.$refs[`marker${i}`][0];
        const coords = this.map.project(event.coords);
        marker.style.left = `${coords.x}px`;
        marker.style.top = `${coords.y}px`;
      });
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
      if (this.preserve) return;
      const id = e.target.dataset.index;
      document.getElementById(`timePoint${id}`).classList.remove('hover');
      this.$emit('setEventData', null);
      this.$emit('setLinePoints', { x1: 0, y1: 0, x2: 0, y2: 0 });
    },

    onMarkerClick(e) {
      this.preserve = true;
      this.$emit('setEventData', e.target.dataset.index, true);
    },

    onMapLoaded() {
      this.$emit('bindMap', this.map);
    },

    applyMask() {
      const d = this.contentData || this.eventData;
      if (!d) return;
      const maskW = 306;
      const maskH = 302;
      const point = this.map.project(d.coords);
      const scale = window.devicePixelRatio || 1;

      let ctx = this.maskCtx;
      const canvas = this.maskCanvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.scale(scale, scale);
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
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    },

    filter() {
      this.resize();
      this.adaptMarkers();

      const map = this.map.getCanvas();
      const ctx = this.filterCtx;
      const w = map.width;
      const h = map.height;

      ctx.drawImage(map, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      let data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];

        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray + 15;
      }
      ctx.putImageData(imgData, 0, 0, 0, 0, w, h);
      this.applyMask();
      this.tick = Date.now();
    }
  }
};
</script>

<style lang="scss">
@import url(~mapbox-gl/dist/mapbox-gl.css);
@import '../scss/_variables.scss';

#map {
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  overflow: hidden;

  canvas {
    &:focus {
      outline: 0;
    }
  }
}

#markers {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  overflow: hidden;
  pointer-events: none;

  .marker {
    pointer-events: all;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $okColor;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);

    &:hover {
      cursor: pointer;
    }

    &.herido {
      background-color: $midColor;

      &.estimatedLoc {
        &::before {
          border-color: $midColor;
        }
      }
    }

    &.muerto {
      background-color: $dangerColor;

      &.estimatedLoc {
        &::before {
          border-color: $dangerColor;
        }
      }
    }

    &.estimatedLoc {
      width: 6px;
      height: 6px;
      &::before {
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border-style: solid;
        border-width: 1.5px;
        display: block;
        transform: translate(-32%, -31%);
        border-color: $okColor;
      }
    }
  }
}

#filter {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
}

.mapboxgl-control-container {
  display: none;
}
</style>
