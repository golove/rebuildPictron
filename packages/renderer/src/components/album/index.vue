<template>
  <n-space
    v-masonry
    transition-duration="0.3s"
    item-selector=".item"
    class="albums"
  >
    <div
      v-for="(e, index) in albums"
      :key="e"
      v-masonry-tile
      class="item"
      @click="showImg(index)"
    >
      <img
        :src="e"
        :alt="e"
      >
    </div>
    <!-- <n-image
        v-for="(item, index) in albums"
        :key="index"
        v-masonry-tile
        class="item"
        width="100"
        :src="item"
      />-->
  </n-space>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '/@/store';
import { useRouter } from 'vue-router';
// import { IData } from '/@/type'
export default defineComponent({
  name: 'PictronAlbum',
  setup() {
    const router = useRouter();
    const store = useStore();
    const albums = computed(() => store.state.album);

    function showImg(i:number){
       router.push('/carousel');
        store.commit('SET_IMGINDEX',i);
    }


    // onMounted(() => {
    //   if (albums.value[0] === '') {
    //     router.push('/');
    //   }
    // });

    return {
      albums,
      showImg,

    };
  },
});
</script>
<style>
.albums {
  width: 100%;
}
.item {
  border-radius: 12px;
  overflow: hidden;
}
img {
  height: auto;
  width: 100%;
  display: block;

  /* transition: all 0.3s ease-in-out; */
}

.n-image-preview-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  pointer-events: none;
  background: rgb(78, 78, 78);
  /* backdrop-filter: blur(19px); */
  /* margin: -115px; */
}
.n-image-preview {
  height: 100%;
  width: auto;
}
.n-image-preview-toolbar {
  background: rgba(73, 73, 73, 0.2);
  /* backdrop-filter: blur(7px); */
  margin: -30px;
}
</style>
