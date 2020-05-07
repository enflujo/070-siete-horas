<template>
  <section id="content">
    <div id="videoWrapper" v-show="eventData">
      <video id="video" ref="video" class="" controls controlsList="nodownload" disablePictureInPicture>
        <source v-if="eventData" :src="'./videos/' + eventData.id + '/' + eventData.id + '.webm'" type="video/webm" />
        <source v-if="eventData" :src="'./videos/' + eventData.id + '/' + eventData.id + '.mp4'" type="video/mp4" />
        <source v-if="eventData" :src="'./videos/' + eventData.id + '/' + eventData.id + '.ogv'" type="video/ogg" />
      </video>
    </div>

    <div id="nav" v-if="eventData">
      <span class="navBtn prev" v-if="eventI > 0" @click="onNavClick" :data-navto="eventI - 1"
        >Anterior (#{{ eventI }})</span
      >
      <span class="navBtn next" v-if="eventI < 26" @click="onNavClick" :data-navto="eventI + 1"
        >Siguiente (#{{ eventI + 2 }})</span
      >
    </div>

    <div id="prose">
      <div class="introText" v-if="!eventData">
        <h2>Título</h2>
        <p>
          El pasado 21 de marzo, cientos de internos de la cárcel La Modelo de Bogotá se amotinaron y desencadenaron una
          reacción brutal de la guardia, el ejército y la policía. 24 reclusos murieron y casi un centenar resultaron
          heridos de gravedad, según el conteo oficial. Los internos hablan de más. Usando imágenes de fuentes abiertas,
          análisis visual y los testimonios de presos y guardias reconstruimos lo que ocurrió esa trágica noche.
        </p>
        <p class="highlight center">(Atención: material sensible)</p>
      </div>
      <div v-else>
        <p v-for="(line, i) in eventData.prose" :key="i">{{ line }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Content',
  props: {
    eventData: Object,
    eventI: Number,
    setEventData: Function
  },

  mounted() {
    this.$refs.video.oncanplay = e => {
      this.$refs.video.play();
    };
  },

  updated(e) {
    if (!this.eventData) return;
    this.$refs.video.load();
  },

  methods: {
    onNavClick(e) {
      this.setEventData(e.target.dataset.navto);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../scss/utils/_variables.scss';
#content {
  position: absolute;
  width: 40%;
  height: calc(100vh - #{$timelineHeight});
  z-index: 99;
  color: whitesmoke;
  overflow: auto;
}

#intro {
  padding: 3em 1.5em;
}

#prose {
  padding: 2em;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.introText {
  font-size: 1.2em;
}

#videoWrapper {
  line-height: 0;
}

video {
  cursor: pointer;
  width: 100%;
  max-height: 50vh;
  // display: none;

  &:focus {
    outline: 0;
  }

  // &.visible {
  //   display: block;
  // }
}

#nav {
  display: flex;
  text-align: center;
}

.navBtn {
  cursor: pointer;
  flex-grow: 0.48;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5em;
  font-size: 0.8em;
  transition: opacity 0.3s ease-in-out;

  &.next {
    margin-left: auto;
  }
  &.prev {
    margin-right: auto;
  }

  &:hover {
    opacity: 0.7;
  }
}
</style>
