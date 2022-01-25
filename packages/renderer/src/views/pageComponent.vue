<template>
  <div
    v-masonry
    class="cardParent"
    transition-duration="0.3s"
    item-selector=".item"
  >
    <n-card
      v-for="(e) in imgDatas.imgList"
      :key="e.title"
      v-masonry-tile
      class="item"
      hoverable
      @click="showAlbum(e)"
    >
      <template #action>
        <svg
          :class="e.collect ? 'collectstyled' : 'collectstyle'"
          @click.stop="collectMethod(e)"
        >
          <use xlink:href="#heart" />
        </svg>
        <div>
          <svg
            :class="e.download ? 'collectstyled' : downloadflag ? 'svgAnimate' : 'collectstyle'"
            @click.stop="downloadMethod(e)"
          >
            <use
              v-if="e.download"
              xlink:href="#check_circle"
            />
            <use
              v-else
              :xlink:href="downloadflag ? '#refresh' : '#download_circle'"
            />
          </svg>
          <svg
            :class="e.deleted ? 'collectstyled' : 'collectstyle'"
            @click.stop="deleteMethod(e)"
          >
            <use xlink:href="#trash" />
          </svg>
        </div>
      </template>
      <template #header>
        {{ e.title }}
      </template>
      <template #cover>
        <img
          :src="e.srcs.split(',')[0]"
        >
      </template>
    </n-card>
  </div>
  <pagination
    @turn-page="turnPage"
    @handle-btn="handleBtn"
  />
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted } from 'vue';
import pagination from '../components/pagination/PagiNation.vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store';
import type { IData } from '/@/type';
export default defineComponent({
  name: 'PageComponent',
  components: {
    pagination,
  },
  props: {
    pages: {
      type: String,
      default: 'Beauty',
    },
  },
  setup(props) {
    const pageName = computed(() => props.pages);
    const store = useStore();
    const router = useRouter();

    function showAlbum(e: IData) {
      store.commit('SET_ALBUM', {
        srcs: e.srcs.split(','),
        title: e.title,
      });
      router.push('/album');
    }
    // const pageN = ref(1);
    // const pageSize = ref(1);
    let imgDatas = reactive({imgList:[]});
    const collect = ref(false);
    function handleBtn(e: string) {
      if (e === 'my collect') {
        collect.value = true;
      } else {
        collect.value = false;
      }
    }
    function turnPage(n: number) {
      // pageN.value = n;
       imgDatas.imgList = [];
      window.ipcRenderer.send('getImageData', { tableName: pageName.value, pageNumber: n, collect: collect.value });
        store.commit('SET_PAGE', n);
    }
    // function turnPageSize(n: number) {
    //   pageSize.value = n;
    // }

    onMounted(() => {
      window.ipcRenderer.send('getImageData', { tableName: pageName.value, pageNumber: store.state.page, collect: collect.value });

    });

    // watch(pageSize, (n) => {

    // })
    watch(collect, (n) => {
      imgDatas.imgList = [];
      window.ipcRenderer.send('getImageData', { tableName: pageName.value, pageNumber: store.state.page, collect: n });

    });
    window.ipcRenderer.on('imagesData', (e: any, a) => {
      if(a){
        imgDatas.imgList = a;
      }else{
        router.push('/spider');
      }

      // console.log(pageN.value,a);
    });

    const downloadflag = ref(false);
    const collectflag = ref(false);
    const deletedflag = ref(false);
    function collectMethod(e) {
      console.log(e.collect);
      e.collect = !e.collect;
      window.ipcRenderer.send('change', {
        href: e.href,
        act: 'collect',
        value:e.collect,
        tableName: e.type,
      });
      window.ipcRenderer.on('collect-reply', (event, arg) => {
        // e.collect = arg
        console.log('collect:' + arg);
      });
    }

    function downloadMethod(e) {
      if (!e.download) {
        downloadflag.value = true;
        window.ipcRenderer.send('changee', {
          href: e.href,
          act: 'download',
          tableName: e.type,
        });
        window.ipcRenderer.on('download-reply', (event, arg) => {
          e.download = arg;
          console.log('download:' + arg);
        });
      }
    }
    function deleteMethod(e) {
      e.deleted = !e.deleted;
      window.ipcRenderer.send('changee', {
        href: e.href,
        act: 'deleted',
        value:e.deleted,
        tableName: e.type,
      });
      window.ipcRenderer.on('deleted-reply', (event, arg) => {
        // e.collect = arg
        console.log('delete:' + arg);
      });
    }
    function imgloaded() {
      console.log('i am loaded');
    }

    return {
      loading: ref(true),
      handleBtn,
      imgDatas,
      turnPage,
      showAlbum,
      collectMethod,
      downloadMethod,
      deleteMethod,
      downloadflag,
      deletedflag,
      collectflag,
      imgloaded,
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
.n-card:hover .n-card__action svg.collectstyle {
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
.n-card > .n-card__action {
  position: absolute;
  width: 45px;
  height: 98%;
  background: rgba(255, 255, 255, 0);
  /* top: 33%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.n-card > .n-card__action svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

@keyframes mymove {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.n-card > .n-card__action svg.svgAnimate {
  fill: rgba(255, 9, 103, 0.9);
  animation: mymove 1s infinite;
  -webkit-animation: mymove s infinite; /*Safari and Chrome*/
}
.n-card > .n-card__action svg.collectstyled {
  fill: rgba(255, 9, 103, 0.9);
}
.n-card > .n-card__action svg.collectstyle {
  opacity: 0;
  fill: White;
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
