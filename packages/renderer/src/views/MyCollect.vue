<template>
  <div
    v-masonry
    class="cardParent"
    transition-duration="0.3s"
    item-selector=".item"
  >
    <n-card
      v-for="(e) in imgData.imgList"
      :key="e.title"
      v-masonry-tile
      class="item"
      hoverable
      @click="showAlbum(e)"
    >
      <template #header>
        {{ e.title }}
      </template>
      <template #cover>
        <img :src="e.href[0]">
      </template>
    </n-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
// import pagination from '../components/pagination/PagiNation.vue';
// import imgData from './imgData/index';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store';
import type { IData } from '/@/type';
export default defineComponent({
  name: 'PageComponent',
  components: {
    // card
    //  actool

    // pagination,
  },

  setup() {

    const store = useStore();
    const router = useRouter();
    function showAlbum(e: IData) {
      store.commit('SET_ALBUM', {
        hrefs: e.href,
        title: e.title,
      });
      router.push('/album');
    }
    const pageN = ref(1);
    let imgData: {imgList:IData[]} = reactive({
      imgList:[],
    });

    function turnPage(n: number) {
      pageN.value = n;
    }

      window.ipcRenderer.send('getCollectImageData');
      window.ipcRenderer.on('collectData',(e,a)=>{
        imgData.imgList = a;
      });



    return {
      pageN,
      imgData,
      turnPage,
      showAlbum,
    };
  },
});
</script>
<style>
@media (prefers-color-scheme: dark) {
  .n-card .n-card-header {
    background: rgba(85, 85, 85, 0.8);
  }
}
@media (prefers-color-scheme: light) {
  .n-card .n-card-header {
    background: rgba(255, 255, 255, 0.8);
  }
}
.cardParent {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.n-card {
  margin: 0.3rem;
  overflow: hidden;
}
.n-card:hover .n-card-header {
  transform: translateY(50%);
  opacity: 1;
}
.n-card .n-card-header {
  position: absolute;
  bottom: 50%;
  transform: translateY(0%);
  opacity: 0;
  padding: 0.4rem;
  backdrop-filter: blur(22px);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.n-card .n-card__content {
  padding: 0;
  margin: 0;
}
.n-card img {
  width: 100%;
  height: auto;
}
@media only screen and (max-width: 450px) {
  .item {
    width: 98vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 1rem;
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (min-width: 450px) {
  .item {
    width: 48vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 2rem;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .item {
    width: 48vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 4rem;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .item {
    width: 24vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 6rem;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .item {
    width: 19.3vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 9rem;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .item {
    width: 16.1vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 12rem;
  }
}
@media only screen and (min-width: 1500px) {
  .item {
    width: 13.9vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 14rem;
  }
}
@media only screen and (min-width: 1800px) {
  .item {
    width: 10.8vw;
    margin: 2px;
  }
  .setting {
    padding: 2rem 15rem;
  }
}
</style>
