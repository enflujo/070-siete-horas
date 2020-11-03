<template>
  <svg id="line" height="100%" width="100%">
    <defs>
      <filter id="f3" x="0" y="0" width="150%" height="150%">
        <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <line id="lineEle" ref="line" filter="url(#f3)" :x1="points.x1" :y1="points.y1" :x2="points.x2" :y2="points.y2" />
  </svg>
</template>

<script>
export default {
  name: 'Pointer',
  props: {
    points: Object,
    eventData: Object,
    map: Object
  },

  updated() {
    let points = this.points;
    const line = this.$refs.line;

    if (points.x1 === 0) {
      line.style.animation = 'none';
      line.style.strokeDasharray = 0;
      line.style.strokeDashoffset = 0;
    } else {
      const distance = Math.hypot(points.x2 - points.x1, points.y2 - points.y1);
      line.style.animation = 'move .3s linear forwards';
      line.style.strokeDasharray = `${distance} ${distance}`;
      line.style.strokeDashoffset = distance;
    }
  }
};
</script>

<style lang="scss">
#line {
  position: fixed;
  z-index: 8;
  pointer-events: none;
  top: 0;
  left: 0;

  #lineEle {
    stroke: rgb(238, 237, 237);
    stroke-width: 2;
  }
}

@keyframes move {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
