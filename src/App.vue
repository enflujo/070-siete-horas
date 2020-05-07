<template>
  <main>
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
import Content from './components/Content.vue';
import Map from './components/Map.vue';
import Timeline from './components/Timeline.vue';
import Pointer from './components/Pointer.vue';
import assetsData from './utls/assetsData';

export default {
  name: 'Main',
  components: { Content, Map, Timeline, Pointer },
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
main {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
}

h2 {
  font-weight: 300;
  font-size: 2em;
  letter-spacing: 2px;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ced9e4;
}
</style>
