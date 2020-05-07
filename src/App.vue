<template>
  <main id="main">
    <Menu />
    <Content
      :eventData="eventData"
      :eventI="eventI"
      :setEventData="setEventData"
      :globalPlayer="globalPlayer"
    ></Content>
    <Map></Map>
    <Timeline
      :setEventData="setEventData"
      :setLinePoints="setLinePoints"
      :assetsData="assetsData"
      :eventI="eventI"
      :globalPlayer="globalPlayer"
      :setGlobalPlayer="setGlobalPlayer"
    ></Timeline>
    <Pointer :points="line"></Pointer>
  </main>
</template>

<script>
import Menu from './components/Menu.vue';
import Content from './components/Content.vue';
import Map from './components/Map.vue';
import Timeline from './components/Timeline.vue';
import Pointer from './components/Pointer.vue';
import assetsData from './utls/assetsData';

export default {
  name: 'Main',
  components: { Menu, Content, Map, Timeline, Pointer },
  data() {
    return {
      eventData: null,
      eventI: null,
      assetsData: assetsData,
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      globalPlayer: false
    };
  },
  mounted() {},
  updated() {},

  methods: {
    setEventData(i) {
      this.eventData = assetsData[i];
      this.eventI = +i;
    },

    setLinePoints(points) {
      this.line = points;
    },

    setGlobalPlayer(setTo) {
      this.globalPlayer = setTo;
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

  #map {
    flex-grow: 1;
  }
}

h2 {
  font-weight: 300;
  font-size: 2em;
  letter-spacing: 2px;
}
</style>
