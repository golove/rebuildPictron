<template>
  <div class="galbum">
    <div
      class="gbox"
      :class="bigflag ? 'gboxx' : 'biggbox'"
    >
      <svg @click="trunleft">
        <use xlink:href="#arrowLeft" />
      </svg>
      <svg @click="trunright">
        <use xlink:href="#arrowRight" />
      </svg>

      <div
        ref="gsbox"
        class="gsbox"
      >
        <div
          v-for="(e) in images"
          :key="e"
          class="carouselItem"
          @click="bigflag = !bigflag"
        >
          <img :src="e">
        </div>
      </div>
    </div>

    <div
      ref="gmbox"
      class="gsmbox"
      :class="bigflag ? 'showsmbox' : 'fadesmbox'"
    >
      <div class="gmbox">
        <div
          v-for="(e, i) in images"
          :key="e"
          @click="show(i)"
        >
          <img
            v-show="bigflag"
            :class="imgIndex == i ? 'imgoutline' : ''"
            :src="e"
          >
        </div>
      </div>
    </div>
  </div>
  <svg
    style="display: none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <symbol
      id="arrowLeft"
      viewBox="0 0 1024 1024"
    >
      <path
        d="M567.00928 608.60416A61.44 61.44 0 0 0 512 669.71648v132.15744c0 9.70752-3.91168 19.0464-10.91584 26.07104a40.96 40.96 0 0 1-56.0128 1.31072L141.312 553.0624a54.90688 54.90688 0 0 1 0-82.1248L445.07136 194.74432c7.3728-6.69696 17.16224-10.42432 27.32032-10.42432C494.26432 184.32 512 201.25696 512 222.12608V354.304a61.44 61.44 0 0 0 55.00928 61.11232l272.9984 28.73344a68.23936 68.23936 0 0 1 0 135.74144l-272.9984 28.73344z"
      />
    </symbol>
    <symbol
      id="arrowRight"
      viewBox="0 0 1024 1024"
    >
      <path
        d="M456.99072 608.60416l-272.9984-28.73344a68.23936 68.23936 0 0 1 0-135.74144l272.9984-28.73344A61.44 61.44 0 0 0 512 354.28352v-132.15744C512 201.23648 529.73568 184.32 551.60832 184.32c10.15808 0 19.94752 3.72736 27.32032 10.4448L882.688 470.91712a54.90688 54.90688 0 0 1 0 82.1248L578.92864 829.25568a40.96 40.96 0 0 1-56.0128-1.31072A36.90496 36.90496 0 0 1 512 801.87392V669.696a61.44 61.44 0 0 0-55.00928-61.11232z"
      />
    </symbol>
  </svg>
</template>
<script lang="ts">
import { ref, computed, defineComponent, watch } from 'vue';
import { useStore } from '/@/store';
// import { useRouter } from 'vue-router';
export default defineComponent({

  setup() {
    // const images = computed(() => props.srcs);
    const gsbox = ref(null);
    const gmbox = ref(null);
    const imgIndex = computed(() => store.state.imgIndex);
    const bigflag = ref(true);
    // const router = useRouter();
    const store = useStore();
    const images = computed(() => store.state.album);

    function show(i: number) {
      gsbox.value.style.cssText = `transform:translateX(${i * (-100)}vw)`;
      const step = (gmbox.value.scrollWidth) / (images.value.length);
      // console.log(step);
      if (i > imgIndex.value) {
        gmbox.value.scrollTo(step * (i - (images.value.length / 4)), 0);
      } else {
        gmbox.value.scrollTo(step * (i - (images.value.length / 4)), 0);
      }

      store.commit('SET_IMGINDEX', i);
    }
    function trunleft() {
      if (imgIndex.value === 0) {
        store.commit('SET_IMGINDEX', images.value.length);
      }

      store.commit('SET_IMGINDEX', imgIndex.value - 1);
    }
    function trunright() {


      store.commit('SET_IMGINDEX', imgIndex.value + 1);

      if (imgIndex.value === images.value.length) {

        store.commit('SET_IMGINDEX', 0);
      }

    }
    watch(imgIndex, (n) => {
      show(n);
    });

    const autoplay = ref(false);
    document.onkeydown = function (e) {
      // console.log(e)
      if (e.code === 'ArrowRight') {
        trunright();
      } else if (e.code === 'ArrowLeft') {
        trunleft();
      } else if (e.code === 'Enter' || e.code === 'Space') {
        autoplay.value = !autoplay.value;

        const SIT = setInterval(() => {
          autoplay.value ? trunright() : clearInterval(SIT);
        }, 1000);





      }

    };



    return {
      images,
      imgIndex,
      show,
      gsbox,
      gmbox,
      trunleft,
      trunright,
      imagesLength: images.value.length,
      bigflag,
    };
  },
});

</script>
<style>
body {
  margin: 0;
}
.galbum {
  position: relative;
  width: auto;
  height: calc(100vh - 31px);
  background: rgb(23, 25, 27);
}
.gbox {
  position: relative;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
}
.gboxx {
  height: 89%;
}
.biggbox {
  /* position: absolute; */
  height: 99%;

  /* background: rgb(23, 25, 27); */
}
.gbox .arrowIcon {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.gbox svg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 100%;
  fill: rgba(141, 141, 141, 0.1);
  padding: 0 2rem;
  transition: all 0.3s ease;
  z-index: 2;
}
.gbox svg:nth-child(1) {
  left: 0px;
}
.gbox svg:nth-child(2) {
  right: 0px;
}
.gbox svg:nth-child(1):hover {
  fill: rgba(228, 228, 228, 0.8);
  background: linear-gradient(
    -90deg,
    rgba(23, 25, 27, 0.2),
    rgba(163, 163, 163, 0.3)
  );
}
.gbox svg:nth-child(2):hover {
  fill: rgba(228, 228, 228, 0.8);
  background: linear-gradient(
    90deg,
    rgba(23, 25, 27, 0.2),
    rgba(163, 163, 163, 0.3)
  );
}

.gbox .gsbox {
  position: absolute;
  width: calc(v-bind(imagesLength) * 100vw);
  height: 100%;
  display: flex;
  transition: transform 0.3s ease;
}

.gbox .gsbox .carouselItem {
  position: relative;
  width: 100vw;
  height: 100%;
  padding: .2rem 0;
}
.gbox .gsbox .carouselItem img {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: auto;
  margin: 0 auto;
  user-select: none;
}

.gsmbox {
  width: 100%;

  overflow: auto;
  scroll-behavior: smooth;
  transition: all 0.3s ease;
}
.showsmbox {
  margin-top: 5px;
  height: 10%;
}
.fadesmbox {
  margin-top: 0px;
  height: 1%;
}
/* .gsmbox::-webkit-scrollbar-button{ */
/* 滚动条上的按钮（箭头） */
/* width:12px;
height:8px;background:red;
border-radius:8px 0 0 8px;
} */
.gsmbox::-webkit-scrollbar {
  /* 整个滚动条 */

  height: 4px;
  transition: all 0.3s ease;
}
.gsmbox::-webkit-scrollbar-thumb {
  /* 滚动条上的滚动滑块 */
  transition: all 0.3s ease;
  border-radius: 4px;
  background: #ff0066;
  /* -webkit-box-shadow: inset 0 0 6px rgba(145, 145, 145, 0.3);   */
}
.gsmbox::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
/* .gsmbox::-webkit-scrollbar-track-piece{ */
/* 滚动条没有滑块的轨道部分 */
/* } */
/* .gsmbox::-webkit-scrollbar-corner{ */
/* 当同时有垂直和水平滚动条时交汇的部分 */
/* } */
/* .gsmbox::-webkit-resizer{ */
/* 某些元素的交汇部分的部分样式（类似textarea的可拖动按钮） */
/* } */
.gsmbox .gmbox {
  display: flex;
  width: 100%;
  height: 100%;
}
.gsmbox .gmbox div {
  /* padding:  0.3rem .1rem; */
  margin: 2.5px 0.1rem;
  height: 95%;
  width: auto;
}
.gsmbox .gmbox .imgoutline {
  outline: #ff0066 2px solid;
}
.gsmbox .gmbox div img {
  height: 100%;
  width: auto;
}
</style>
