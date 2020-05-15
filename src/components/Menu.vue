<template>
  <nav id="nav">
    <ul class="menu">
      <li class="menuItem" @click="onHomeClick">Introducción</li>
      <li class="menuItem" @click="onEpilClick">Epílogo</li>
    </ul>

    <ul class="nextPrev">
      <li :class="{ navBtn: true, prev: true, active: contentI > 0 }" @click="onPrevClick">Anterior</li>
      <li :class="{ navBtn: true, next: true, active: contentI < total - 1 }" @click="onPlayNext">Siguiente</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    contentI: Number,
    total: Number
  },

  methods: {
    onHomeClick() {
      this.$emit('goToPage', 'intro');
    },

    onPrevClick() {
      this.$emit('playPrev');
    },

    onPlayNext() {
      this.$emit('playNext');
    },

    onEpilClick() {
      this.$emit('goToPage', 'epilogue');
    }
  }
};
</script>

<style scoped lang="scss">
@import '../scss/_variables.scss';

.menu {
  margin: 0;
  padding: 0;
}

.nextPrev {
  position: fixed;
  margin: 0;
  padding: 0;

  .navBtn {
    margin: 0;
    padding: 0.5em;
    list-style: none;
    background-color: $highlightColor;
    display: inline-block;
    opacity: 0.4;

    &.active {
      opacity: 1;
      cursor: pointer;
    }
  }
}

.menuItem {
  background-color: $highlightColor;
  margin: 0;
  list-style: none;
  margin: 0 0 0.5em;
  padding: 0.5em;
  font-size: 0.8em;
  cursor: pointer;
  display: inline-block;

  &:hover {
    opacity: 0.8;
  }
}
</style>
