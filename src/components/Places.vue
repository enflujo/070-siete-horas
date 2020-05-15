<template>
  <div>
    <div id="placesLabel" :class="labelClass" ref="label" :style="{ left: `${label.x}px`, top: `${label.y}px` }">
      {{ labelText }}
    </div>
    <div id="places" ref="container">
      <svg ref="svg" height="100%" width="100%">
        <polygon
          v-for="(p, i) in patios"
          :class="p.type"
          :key="i"
          :points="`${p.p1.x},${p.p1.y} ${p.p2.x},${p.p2.y} ${p.p3.x},${p.p3.y} ${p.p4.x},${p.p4.y}`"
          :data-name="p.name"
          :data-type="p.type"
          @mouseenter="onPlaceEnter"
          @mouseleave="onPlaceLeave"
        />
      </svg>

      <span
        class="deadMarker"
        v-for="(m, i) in muertos"
        :key="`m${i}`"
        :style="{ left: `${m.x}px`, top: `${m.y}px` }"
      />

      <div
        v-for="(place, i) in garitas"
        :key="i"
        class="garitas"
        :style="{ left: place.left, top: place.top }"
        :data-name="place.name"
        :data-type="place.type"
        @mouseenter="onPlaceEnter"
        @mouseleave="onPlaceLeave"
      ></div>
    </div>
  </div>
</template>

<script>
import { garitas, patios, muertos } from '../utils/placesData';
export default {
  name: 'Places',

  props: {
    map: Object,
    tick: Number
  },

  data() {
    return {
      garitas: [],
      patios: [],
      muertos: [],
      label: { x: -99, y: 99 },
      labelText: '',
      labelClass: ''
    };
  },

  watch: {
    tick: function() {
      this.onMove();
    }
  },

  methods: {
    onMove() {
      if (!this.map) return;
      garitas.forEach((d, i) => {
        const px = this.map.project(d.coords);
        d.left = `${px.x}px`;
        d.top = `${px.y}px`;
      });

      patios.forEach((patio, i) => {
        patio.p1 = this.map.project(patio.coords.nw);
        patio.p2 = this.map.project(patio.coords.ne);
        patio.p3 = this.map.project(patio.coords.se);
        patio.p4 = this.map.project(patio.coords.sw);
      });

      muertos.forEach((muerto, i) => {
        const loc = this.map.project(muerto.coords);
        muerto.x = loc.x;
        muerto.y = loc.y;
      });

      this.garitas = garitas;
      this.patios = patios;
      this.muertos = muertos;
    },

    onPlaceEnter(e) {
      const d = e.target.dataset;
      const rect = this.$refs.container.getBoundingClientRect();
      this.labelText = d.name;
      this.label = { x: e.clientX - rect.left, y: e.clientY };
      this.labelClass = d.type;
    },

    onPlaceLeave() {
      this.labelText = '';
      this.label = { x: -99, y: -99 };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
#places {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
}

.garitas {
  pointer-events: all;
  cursor: pointer;
  position: absolute;
  width: 25px;
  height: 25px;
  border: 2px solid $placeColor;
  border-radius: 50%;
  transform: translate(-50%, -50%);

  .placeName {
    transform: translate(-30%, -25px);
    color: black;
    background-color: $placeColor;
    position: absolute;
    width: 55px;
    font-size: 0.75em;
    letter-spacing: 0.5px;
    text-align: center;
    display: none;
  }

  &:hover {
    .placeName {
      display: block;
    }
  }
}

.patio {
  pointer-events: all;
  cursor: pointer;
  fill: transparent;
  stroke: $placeColor;
  stroke-width: 2px;

  &:hover {
    fill: $placeColorOpacity;
  }
}

.guayana {
  pointer-events: all;
  cursor: pointer;
  fill: transparent;
  stroke: $placeColor2;
  stroke-width: 2px;

  &:hover {
    fill: $placeColor2Opacity;
  }
}

.estructura {
  pointer-events: all;
  cursor: pointer;
  fill: transparent;
  stroke: $placeColor3;
  stroke-width: 2px;

  &:hover {
    fill: $placeColor3Opacity;
  }
}

#placesLabel {
  position: absolute;
  color: black;
  transform: translate(-50%, -35px);
  font-size: 0.75em;
  letter-spacing: 0.5px;
  padding: 0.3em;
  text-align: center;
  z-index: 999;

  &.patio,
  &.garita {
    background-color: $placeColor;
  }

  &.guayana {
    background-color: $placeColor2;
  }

  &.estructura {
    background-color: $placeColor3;
    color: white;
  }
}

.deadMarker {
  position: absolute;
  width: 25px;
  height: 25px;
  background-image: url(../imgs/star.svg);
  transform: translate(-50%, -50%);
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
