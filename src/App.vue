<template>
  <main id="main">
    <Legend />
    <Menu
      :contentI="contentI"
      :total="assetsData.length"
      @goToPage="goToPage"
      @playPrev="playPrev"
      @playNext="playNext"
    ></Menu>
    <Content
      :contentData="contentData"
      @setEventData="setEventData"
      @zoomToPlace="zoomToPlace"
      @resetZoom="resetZoom"
      @playNext="playNext"
      :showPage="showPage"
    ></Content>
    <Stage
      @bindMap="bindMap"
      @setEventData="setEventData"
      @setLinePoints="setLinePoints"
      :assetsData="assetsData"
      :eventData="eventData"
      :zoom="zoom"
      :contentData="contentData"
    ></Stage>
    <Timeline
      :ready="ready"
      @setEventData="setEventData"
      @setLinePoints="setLinePoints"
      :assetsData="assetsData"
      :eventI="eventI"
      :contentI="contentI"
      :eventData="eventData"
      :zoom="zoom"
    ></Timeline>
    <Pointer v-if="map" :points="line" :map="map" :eventData="eventData"></Pointer>
  </main>
</template>

<script>
import Content from './components/Content.vue';
import Stage from './components/Stage.vue';
import Timeline from './components/Timeline.vue';
import Pointer from './components/Pointer.vue';
import Menu from './components/Menu.vue';
import Legend from './components/Legend.vue';
import assetsData from './utils/assetsData';
// import { Findcoords } from './utils/helpers';

export default {
  name: 'Main',
  components: { Content, Stage, Timeline, Pointer, Menu, Legend },
  data() {
    return {
      ready: false,
      eventData: null,
      contentData: null,
      eventI: null,
      contentI: null,
      zoom: false,
      assetsData: assetsData,
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      map: null,
      showPage: 'intro'
    };
  },

  methods: {
    setEventData(i, setContent) {
      this.eventData = assetsData[i];
      this.eventI = i === null ? i : +i;

      if (setContent) {
        this.showPage = '';
        this.contentData = assetsData[i];
        this.contentI = +i;
      }
    },

    goToPage(page) {
      this.contentData = null;
      this.zoom = false;
      this.contentData = null;
      this.contentI = null;
      this.eventData = null;
      this.eventI = null;
      this.showPage = page;
    },

    zoomToPlace() {
      this.zoom = true;
    },

    resetZoom() {
      this.zoom = false;
    },

    playNext() {
      if (this.contentI === null) {
        this.setEventData(0, true);
      } else if (this.contentI < assetsData.length - 1) {
        this.setEventData(this.contentI + 1, true);
      }
    },

    playPrev() {
      if (this.contentI > 0) {
        this.setEventData(this.contentI - 1, true);
      }
    },

    setLinePoints(points) {
      this.line = points;
    },

    bindMap(map) {
      this.map = map;
      this.ready = true;
      // const debug = new Findcoords(map);
    }
  }
};
</script>

<style lang="scss">
@import './scss/_variables.scss';
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

::selection {
  background: rgba(255, 255, 0, 0.3);
}

html,
body {
  margin: 0;
  padding: 0;
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
}

.title {
  margin-top: 0;
  letter-spacing: 0.4em;
  font-size: 2.5em;
  font-weight: bold;
  line-height: 1.1;
  font-family: 'Share Tech Mono', monospace;
}

h3 {
  font-family: 'Share Tech Mono', monospace;
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.1em;
}

p {
  font-size: 1.1em;
  line-height: 1.8;
}

.col1,
.col2 {
  position: relative;
  z-index: 1;
}

.col1 {
  color: whitesmoke;
  overflow: auto;
  font-size: 1.2em;
}

.col2 {
  overflow: hidden;
}

#nav {
  position: absolute;
  top: 0;
  left: $contentWidth;
  z-index: 9;
}

#timeline {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: $timelineHeight;
  z-index: 2;
}

.nextPrev {
  bottom: 0;
  bottom: $timelineHeight;
}

#prose {
  padding: 1em 6em 6em;
  font-size: 0.8em;
  letter-spacing: 1px;
}

@media (orientation: portrait) {
  #main {
    flex-direction: column;
  }

  #nav {
    left: 0;
  }

  .nextPrev {
    bottom: 0;
  }

  .col1,
  .col2 {
    width: 100vw;
  }

  .col1 {
    height: 65vh;
    font-size: 1em;
  }

  .col2 {
    height: 35vh;
  }

  #timeline {
    display: none;
  }

  #prose {
    padding: 1em 2em 5em;
    font-size: 0.8em;
    letter-spacing: 1px;
  }
}

@media (orientation: landscape) {
  .col1 {
    width: $contentWidth;
    height: calc(100vh - #{$timelineHeight});
  }

  .col2 {
    width: $stageWidth;
    height: $viewHeight;
  }
}
</style>
