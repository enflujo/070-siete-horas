<template>
  <main id="main">
    <Content
      :contentData="contentData"
      @setEventData="setEventData"
      :globalPlayer="globalPlayer"
      @zoomToPlace="zoomToPlace"
      @resetZoom="resetZoom"
    ></Content>
    <Stage
      @bindMap="bindMap"
      @setEventData="setEventData"
      @setLinePoints="setLinePoints"
      :assetsData="assetsData"
      :eventData="eventData"
      :zoom="zoom"
    ></Stage>
    <Timeline
      :ready="ready"
      @setEventData="setEventData"
      @setLinePoints="setLinePoints"
      :getScreenCoordinates="getScreenCoordinates"
      :assetsData="assetsData"
      :eventI="eventI"
      :eventData="eventData"
      :globalPlayer="globalPlayer"
      :setGlobalPlayer="setGlobalPlayer"
      :offX="offX"
      :zoom="zoom"
    ></Timeline>
    <Pointer v-if="map" :points="line" :map="map" :eventData="eventData" :offX="offX"></Pointer>
  </main>
</template>

<script>
import Content from './components/Content.vue';
import Stage from './components/Stage.vue';
import Timeline from './components/Timeline.vue';
import Pointer from './components/Pointer.vue';
import assetsData from './utils/assetsData';
import { Findcoords } from './utils/helpers';

export default {
  name: 'Main',
  components: { Content, Stage, Timeline, Pointer },
  data() {
    return {
      ready: false,
      eventData: null,
      contentData: null,
      eventI: null,
      zoom: false,
      assetsData: assetsData,
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      globalPlayer: false,
      map: null,
      offX: 0
    };
  },

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.offX = +document.getElementById('stage').offsetLeft;
  },

  updated() {},

  methods: {
    onResize(e) {
      this.offX = +document.getElementById('stage').offsetLeft;
    },

    setEventData(i, setContent) {
      this.eventData = assetsData[i];
      this.eventI = +i;

      if (setContent) {
        this.contentData = assetsData[i];
      }
    },

    zoomToPlace() {
      this.zoom = true;
    },

    resetZoom() {
      this.zoom = false;
    },

    setLinePoints(points) {
      this.line = points;
    },

    setGlobalPlayer(setTo) {
      this.globalPlayer = setTo;
    },

    bindMap(map) {
      this.map = map;
      this.ready = true;
      const debug = new Findcoords(map);
    },

    getScreenCoordinates(ltlang) {
      const point = this.map.project(ltlang);
      point.x += this.offX;
      return point;
    }
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
  background-color: #222;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  margin: 0;
  padding: 0;
}

.highlight {
  color: rgb(211, 201, 68);
}

.center {
  text-align: center;
}

.hidden {
  display: none;
}

#main {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  display: flex;

  #content {
    flex-grow: 1;
  }

  #stage {
    flex-grow: 1;
  }
}

h2 {
  font-weight: 300;
  font-size: 2em;
  letter-spacing: 2px;
}
</style>
