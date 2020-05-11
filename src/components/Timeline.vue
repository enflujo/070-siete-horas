<template>
  <section id="timeline">
    <!-- <div id="playPause" ref="playPause" :class="{ playing: globalPlayer }" @click="onPlayPause">Ver en orden</div> -->
    <!-- <div id="times"></div> -->
    <div id="points" v-if="ready">
      <span
        v-for="(point, i) in assetsData"
        :key="i"
        :class="{ timePoint: true, active: eventI === i, current: currentI == i }"
        :id="`timePoint${i}`"
        :data-index="i"
        :ref="'timePoint' + i"
        @mouseenter="onPointEnter"
        @mouseleave="onPointerLeave"
        @click="onPointClick"
      >
        <span class="timePointNum" :data-index="i">{{ i + 1 }}</span>
      </span>
    </div>
    <div id="timelineNav" :class="{ visible: eventData }"></div>
  </section>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    ready: Boolean,
    assetsData: Array,
    eventI: Number,
    eventData: Object,
    globalPlayer: Boolean,
    setGlobalPlayer: Function,
    getScreenCoordinates: Function,
    zoom: Boolean
  },

  data() {
    return {
      currentI: null
    };
  },

  mounted() {},

  updated() {},

  methods: {
    onPlayPause(e) {
      const btn = this.$refs.playPause;
      this.setGlobalPlayer(!btn.classList.contains('playing'));
      if (!this.eventI) this.$emit('setEventData', 0);
    },

    onPointEnter(e) {
      const point = e.target;
      const i = point.dataset.index;
      const timeCoords = point.getBoundingClientRect();
      const markCoords = document.getElementById(`marker${i}`).getBoundingClientRect();
      this.$emit('setLinePoints', {
        x1: timeCoords.x + timeCoords.width / 2,
        y1: timeCoords.y + timeCoords.height / 2,
        x2: markCoords.x + markCoords.width / 2,
        y2: markCoords.y + markCoords.height / 2
      });
      this.$emit('setEventData', i);
    },

    onPointerLeave() {
      this.$emit('setEventData', null);
      this.$emit('setLinePoints', { x1: 0, y1: 0, x2: 0, y2: 0 });
    },

    onPointClick(e) {
      const i = e.target.dataset.index;
      this.currentI = i;
      this.$emit('setEventData', i, true);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../scss/utils/_variables.scss';

#timeline {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: $timelineHeight;
  background-color: black;
  z-index: 2;

  // #points,
  // #times {
  //   margin-left: 1%;
  //   position: absolute;
  //   width: 98%;
  //   height: 100%;
  //   bottom: 0;
  //   pointer-events: none;
  // }

  // #times {
  //   .timeRef {
  //     position: absolute;
  //     font-size: 0.7em;
  //     color: lightblue;
  //     bottom: 10px;
  //     opacity: 0.7;
  //   }
  // }
}

#playPause {
  color: white;
  display: inline-block;
  width: $playPauseSize;
  font-size: 0.75em;
  line-height: 1;
  text-align: center;
  margin: 1em;

  // &::before {
  //   content: '';
  //   display: inline-block;
  //   background-image: url(/imgs/play.svg);
  //   background-repeat: no-repeat;
  //   width: $playPauseSize;
  //   height: $playPauseSize;
  // }

  // &.playing {
  //   &::before {
  //     background-image: url(/imgs/pause.svg);
  //   }
  // }

  &:hover {
    cursor: pointer;
  }
}

#points {
  display: flex;
  flex-direction: row;
  padding: 10px 20px 0 20px;
}

.timePoint {
  // pointer-events: all;
  position: relative;
  flex-grow: 1;
  height: $timelineHeight / 2;
  // margin: 0 20px 0 20px;
  // position: absolute;
  // bottom: 50px;
  z-index: 5;
  transition: all 0.3s ease-in-out;
  opacity: 0.7;

  &.nextDay {
    border: 1px solid yellow;
  }

  &:hover {
    cursor: pointer;
  }

  &.active,
  &.current {
    opacity: 1;
    &::after {
      background-color: yellow;
    }
  }

  &:hover,
  &.hover {
    opacity: 0.9;
    &::after {
      background-color: yellow;
    }
  }

  &::after {
    content: '';
    transition: all 0.3s ease-in-out;
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    top: 15px;
    border-radius: 50%;
    border: 1px solid white;
    left: 50%;
    transform: translateX(-50%);
  }
}

.timePointNum {
  color: yellow;
  font-size: 0.75em;
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 0px;
}

.timePointTime {
  color: white;
  font-size: 0.6vw;
  font-family: Verdana, Geneva, sans-serif;
  text-align: center;
  position: absolute;
  top: 27px;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 0.1px;
}

#timelineNav {
  position: absolute;
  bottom: $timelineHeight;
  width: 80px;
  height: 0;
  background-color: yellow;
  transition: all 0.3s ease-in-out;

  &.visible {
    height: 50px;
  }
}
</style>
