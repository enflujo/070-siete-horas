<template>
  <nav id="nav">
    <ul>
      <li>Home</li>
      <li>Autoplay</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Menu'
};
</script>

<style scoped lang="scss">
@import '../scss/utils/_variables.scss';

#nav {
  width: $menuWidth;
  height: $viewHeight;
  // position: fixed;
  // left: 0;
  // top: 0;
  background-color: yellow;
}
</style>
