<template>
  <section id="legend">
    <div class="ele muertos">Muertos</div>
    <div class="ele aprox">
      <span></span>Ubicación aprox.
    </div>
    <div class="ele edificio">Edificios</div>
    <div class="ele garita">Garitas</div>
    <div class="ele estructura">Estructuras</div>
    <div class="ele guayana">Guayana</div>
  </section>
</template>

<script>
export default {
  name: 'Legend'
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.ele {
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 2em;
    height: 2em;
  }
}

.muertos {
  &::before {
    background-image: url(../imgs/star.svg);
    left: -1.8em;
    top: -0.3em;
  }
}

.aprox {
  span {
    display: block;
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: whitesmoke;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
    left: -1em;
    top: 0.5em;
    &::before {
      content: '';
      width: 13px;
      height: 13px;
      border-radius: 50%;
      border-style: solid;
      border-width: 1px;
      display: block;
      transform: translate(-32%, -31%);
      border-color: whitesmoke;
    }
  }
}

.edificio {
  &::before {
    border: 1px solid $placeColor;
    width: 0.8em;
    height: 0.8em;
    left: -1.2em;
    top: 0.3em;
  }
}

.garita {
  &::before {
    border: 1px solid $placeColor;
    border-radius: 50%;
    width: 0.8em;
    height: 0.8em;
    left: -1.2em;
    top: 0.3em;
  }
}

.estructura {
  &::before {
    border: 1px solid $placeColor3;
    width: 0.8em;
    height: 0.8em;
    left: -1.2em;
    top: 0.3em;
  }
}

.guayana {
  &::before {
    border: 1px solid $placeColor2;
    width: 0.8em;
    height: 0.8em;
    left: -1.2em;
    top: 0.3em;
  }
}
</style>
