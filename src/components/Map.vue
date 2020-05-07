<template>
  <section id="map">Mapa</section>
</template>

<script>
export default {
  name: 'Map'
};
</script>

<style scoped lang="scss">
@import '../scss/utils/_variables.scss';
#map,
#stage,
#mask {
  width: $stageWidth;
  height: calc(100vh - #{$timelineHeight - 50px});
  z-index: 1;
  // position: absolute;
  right: 0;
}
</style>
