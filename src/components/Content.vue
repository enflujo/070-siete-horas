<template>
  <section id="content" class="col1">
    <div id="videoWrapper" v-show="contentData">
      <video id="video" ref="video" class controls controlslist="nodownload" disablepictureinpicture>
        <source v-if="contentData" :src="`./videos/${contentData.id}/${contentData.id}.webm`" type="video/webm" />
        <source v-if="contentData" :src="`./videos/${contentData.id}/${contentData.id}.mp4`" type="video/mp4" />
        <source v-if="contentData" :src="`./videos/${contentData.id}/${contentData.id}.ogv`" type="video/ogg" />
      </video>
    </div>

    <div id="prose">
      <Intro v-if="showPage === 'intro'" />
      <Epilogue v-else-if="showPage === 'epilogue'" />
      <div v-else-if="contentData.id == 56">
        <p>{{ contentData.prose[0] }}</p>
        <img :src="contentData.imgs[1]" class="imgFull" alt="Marca del proyectil" />
        <img :src="contentData.imgs[0]" class="imgLeft" alt="Preso con proyectil en la mano" />
        <p>{{ contentData.prose[1] }}</p>
      </div>
      <div v-else-if="contentData.id == 49">
        <p>{{ contentData.prose[0] }}</p>
        <p>{{ contentData.prose[1] }}</p>
        <img :src="contentData.imgs[1]" class="imgFull" alt="Foto puerta" />
        <img :src="contentData.imgs[0]" class="imgFull" alt="Puerta con impactos de bala" />
      </div>
      <div v-else>
        <p v-for="(line, i) in contentData.prose" :key="i">{{ line }}</p>
        <img v-for="(img, i) in contentData.imgs" :key="`img${i}`" :src="img" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import Intro from './Intro.vue';
import Epilogue from './Epilogue.vue';

export default {
  name: 'Content',
  components: { Intro, Epilogue },
  props: {
    contentData: Object,
    showPage: String
  },

  mounted() {
    const v = this.$refs.video;
    v.oncanplay = e => this.$refs.video.play();
    v.onpause = e => {};
    v.onplay = e => {
      this.$emit('zoomToPlace');
    };
    v.onended = e => {
      this.$emit('playNext');
    };
  },

  watch: {
    contentData: function() {
      if (!this.contentData) {
        this.$refs.video.pause();
      }
    }
  },

  updated() {
    if (!this.contentData) return;
    this.$refs.video.load();
  },

  methods: {
    onNavClick(e) {
      this.$emit('setEventData', e.target.dataset.navto);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../scss/_variables.scss';

#videoWrapper {
  line-height: 0;
}

video {
  cursor: pointer;
  width: 100%;
  max-height: 50vh;

  &:focus {
    outline: 0;
  }
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

.imgFull {
  width: 100%;
  height: auto;
}

.imgLeft {
  float: left;
  padding-right: 1em;
}
</style>
