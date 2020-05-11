<template>
  <section id="content">
    <div id="videoWrapper" v-show="contentData">
      <video id="video" ref="video" class controls controlslist="nodownload" disablepictureinpicture muted>
        <source v-if="contentData" :src="`./videos/${contentData.id}/${contentData.id}.webm`" type="video/webm" />
        <source v-if="contentData" :src="`./videos/${contentData.id}/${contentData.id}.mp4`" type="video/mp4" />
        <source v-if="contentData" :src="`./videos/${contentData.id}/${contentData.id}.ogv`" type="video/ogg" />
      </video>
    </div>

    <div id="prose">
      <div class="introText" v-if="!contentData">
        <Intro />
      </div>
      <div v-else>
        <p v-for="(line, i) in contentData.prose" :key="i">{{ line }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import Intro from './Intro.vue';

export default {
  name: 'Content',
  components: { Intro },
  props: {
    contentData: Object
  },

  mounted() {
    const v = this.$refs.video;
    v.oncanplay = e => this.$refs.video.play();
    v.onpause = e => {
      this.$emit('resetZoom');
    };
    v.onplay = e => {
      this.$emit('zoomToPlace');
    };
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
@import '../scss/utils/_variables.scss';
#content {
  // position: absolute;
  width: $contentWidth;
  height: calc(100vh - #{$timelineHeight});
  z-index: 99;
  color: whitesmoke;
  overflow: auto;
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
