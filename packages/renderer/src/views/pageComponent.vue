<template>
  <div
    v-masonry
    transition-duration="0.3s"
    item-selector=".item"
    class="cardParent"
  >
    <imgcard
      v-for="(e,i) in imgDatas.imgList"
      :key="e.title+i"
      v-masonry-tile
      class="item"
      :collectflag="collect"
      :item="e"
      @filter-data="filterData"
    />
  </div>
  <pagination
    @turn-page="turnPage"
    @handle-btn="handleBtn"
  />
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted } from 'vue';
import pagination from '../components/pagination/PagiNation.vue';
import type { IData } from '/@/type';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store';
import imgcard from '../components/GCard.vue';
export default defineComponent({
  name: 'PageComponent',
  components: {
    pagination,
    imgcard,
  },
  props: {
    pages: {
      type: String,
      default: 'Beauty',
    },
  },
  setup(props) {
    const router = useRouter();
   const store = useStore();
    const pageName = computed(() => props.pages);
    const imgDatas = reactive({imgList:[]});
    // const cardData: IData[] = reactive([]);

    function turnPage(n: number) {
      // cardData.length = 0;
       imgDatas.imgList = [];
      window.ipcRenderer.send('getImageData', { tableName: pageName.value, pageNumber: n, collect: collect.value });
        store.commit('SET_PAGE', n);
    }
    onMounted(() => {
      window.ipcRenderer.send('getImageData', { tableName: pageName.value, pageNumber: store.state.page, collect: collect.value });

    });


    // switch my picture or my collect button methods
    const collect = ref(false);
      function handleBtn(e: string) {
      e === 'my collect'?collect.value = true:collect.value = false;
    }
    watch(collect, (n) => {
      imgDatas.imgList = [];
      window.ipcRenderer.send('getImageData', { tableName: pageName.value, pageNumber: store.state.page, collect: n });

    });
    window.ipcRenderer.on('imagesData', (e: any, a) => {
      a?imgDatas.imgList = a:router.push('/spider');
    });

    function filterData(href:string){
      imgDatas.imgList.splice(imgDatas.imgList.findIndex((e:IData)=>e.href === href),1);
    }

    return {
      handleBtn,
      imgDatas,
      collect,
      turnPage,
      filterData,
    };
  },
});
</script>
<style>

/* .cardParent {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap;
  transition: all .3s ease; */




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
