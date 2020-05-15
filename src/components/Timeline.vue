<template>
  <section id="timeline">
    <span :class="{ section: true, section0: true, active: activeSection == 0 }"
      ><span class="sectionLabel">Entre 8 y 9 pm</span></span
    >
    <span :class="{ section: true, section1: true, active: activeSection == 1 }"
      ><span class="sectionLabel">Entre 9 y 10 pm</span></span
    >
    <span :class="{ section: true, section2: true, active: activeSection == 2 }"
      ><span class="sectionLabel">Entre 10 y 11 pm</span></span
    >
    <span :class="{ section: true, section3: true, active: activeSection == 3 }"
      ><span class="sectionLabel">+ 11pm</span></span
    >
    <div id="points" v-if="ready">
      <span
        v-for="(point, i) in assetsData"
        :key="i"
        :class="{
          timePoint: true,
          active: contentI !== null && contentI === i,
          current: contentI === i,
          herido: point.category === 'herido',
          muerto: point.category === 'muerto'
        }"
        :id="`timePoint${i}`"
        :data-index="i"
        :data-section="point.section"
        :ref="'timePoint' + i"
        @mouseenter="onPointEnter"
        @mouseleave="onPointerLeave"
        @click="onPointClick"
      >
        <span class="timePointNum" :data-index="i">{{ i + 1 }}</span>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    ready: Boolean,
    assetsData: Array,
    eventI: Number,
    contentI: Number,
    eventData: Object,
    zoom: Boolean
  },

  data() {
    return {
      activeSection: null
    };
  },

  methods: {
    onPointEnter(e) {
      const point = e.target;
      const i = point.dataset.index;
      const timeCoords = point.getBoundingClientRect();
      const markCoords = document.getElementById(`marker${i}`).getBoundingClientRect();
      this.$emit('setLinePoints', {
        x1: timeCoords.x + timeCoords.width / 2,
        y1: timeCoords.y + timeCoords.height / 1.35,
        x2: markCoords.x + markCoords.width / 2,
        y2: markCoords.y + markCoords.height / 2
      });
      this.$emit('setEventData', i);
      this.activeSection = point.dataset.section;
    },

    onPointerLeave() {
      this.$emit('setEventData', null);
      this.$emit('setLinePoints', { x1: 0, y1: 0, x2: 0, y2: 0 });
      this.activeSection = null;
    },

    onPointClick(e) {
      const i = e.target.dataset.index;
      this.$emit('setEventData', i, true);
    },

    onIntroClick() {
      this.$emit('goHome');
    },

    onEpilClick() {
      //
    }
  }
};
</script>

<style scoped lang="scss">
@import '../scss/_variables.scss';

#points {
  display: flex;
  flex-direction: row;
  padding: 7px 0;
}

.timePoint {
  position: relative;
  flex-grow: 1;
  height: $timelineHeight - 27px;
  z-index: 5;
  transition: all 0.3s ease-in-out;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
  }

  &.active,
  &.current {
    opacity: 1;
    &::after {
      background-color: $okColor;
    }
  }

  &:hover,
  &.hover {
    opacity: 0.9;
    &::after {
      background-color: $okColor;
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
    border: 2px solid $okColor;
    left: 50%;
    transform: translateX(-50%);
  }

  &.page {
    &::after {
      border-radius: 0;
      background-color: white;
      border: none;
    }

    .timePointNum {
      color: white;
    }
  }
}

.herido {
  &::after {
    border-color: $midColor;
  }

  &:hover,
  &.hover,
  &.active,
  &.current {
    &::after {
      background-color: $midColor;
    }
  }

  .timePointNum {
    color: $midColor;
  }
}

.muerto {
  &::after {
    border-color: $dangerColor;
  }

  &:hover,
  &.hover,
  &.active,
  &.current {
    &::after {
      background-color: $dangerColor;
    }
  }

  .timePointNum {
    color: lighten($dangerColor, 15%);
  }
}

.timePointNum {
  color: $okColor;
  font-size: 0.75em;
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 0px;
}

.timePoint::before {
  pointer-events: none;
}

.sectionLabel {
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 5px;
}

.section {
  position: absolute;
  color: white;
  font-size: 0.7em;
  width: 113px;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
  height: $timelineHeight;
  background: rgb(40, 94, 106);

  &.section0 {
    width: 10.3vw;
    background: linear-gradient(90deg, rgba(40, 110, 124, 1) 0%, rgba(40, 94, 106, 1) 100%);
  }

  &.section1 {
    left: 10.3vw;
    width: 15.4vw;
    background: linear-gradient(90deg, rgba(40, 94, 106, 1) 0%, rgba(40, 73, 81, 1) 100%);
  }

  &.section2 {
    left: 25.7vw;
    width: 69.1vw;
    background: linear-gradient(90deg, rgba(40, 73, 81, 1) 0%, rgba(41, 28, 31, 1) 100%);
  }

  &.section3 {
    left: 94.8vw;
    width: 5.2vw;
    background: linear-gradient(90deg, rgba(41, 28, 31, 1) 0%, rgba(133, 55, 55, 1) 100%);
  }

  &.active {
    color: white;
    opacity: 1;
  }
}

.timePoint {
  &:nth-child(4) {
    border-right: 2px solid white;
  }

  &:nth-child(10) {
    border-right: 2px solid white;
  }

  &:nth-child(37) {
    border-right: 2px solid white;
  }
}
</style>
