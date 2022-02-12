<template>
  <n-card
    v-if="flag &&imgItem.collect && !imgItem.deleted "
    hoverable
    @click="showAlbum"
  >
    <template #action>
      <n-button
        :loading="colloading"
        :type="imgItem.collect ? 'primary' : 'info'"
        :focusable="false"
        text
        @click.stop="actionMethod('collect')"
      >
        <template #icon>
          <n-icon>
            <heart />
          </n-icon>
        </template>
      </n-button>
      <div>
        <n-button
          :loading="delloading"
          :type="imgItem.deleted ? 'primary' : 'info'"
          :focusable="false"
          text
          @click.stop="actionMethod('deleted')"
        >
          <template #icon>
            <n-icon>
              <trash />
            </n-icon>
          </template>
        </n-button>
        <n-button
          :loading="downloading"
          :type="imgItem.download ? 'primary' : 'info'"
          :focusable="false"
          text
          @click.stop="actionMethod('download')"
        >
          <template #icon>
            <n-icon>
              <cloud-download />
            </n-icon>
          </template>
        </n-button>
      </div>
    </template>
    <template #header>
      {{ imgItem.title }}
    </template>
    <template #cover>
      <img :src="imgItem.srcs.split(',')[0]">
    </template>
  </n-card>
    <n-card
    v-else-if="!flag && !imgItem.deleted"
    hoverable
    @click="showAlbum"
  >
    <template #action>
      <n-button
        :loading="colloading"
        :type="imgItem.collect ? 'primary' : 'info'"
        :focusable="false"
        text
        @click.stop="actionMethod('collect')"
      >
        <template #icon>
          <n-icon>
            <heart />
          </n-icon>
        </template>
      </n-button>
      <div>
        <n-button
          :loading="delloading"
          :type="imgItem.deleted ? 'primary' : 'info'"
          :focusable="false"
          text
          @click.stop="actionMethod('deleted')"
        >
          <template #icon>
            <n-icon>
              <trash />
            </n-icon>
          </template>
        </n-button>
        <n-button
          :loading="downloading"
          :type="imgItem.download ? 'primary' : 'info'"
          :focusable="false"
          text
          @click.stop="actionMethod('download')"
        >
          <template #icon>
            <n-icon>
              <cloud-download />
            </n-icon>
          </template>
        </n-button>
      </div>
    </template>
    <template #header>
      {{ imgItem.title }}
    </template>
    <template #cover>
      <img :src="imgItem.srcs.split(',')[0]">
    </template>
  </n-card>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store';
import { CloudDownload, Trash, Heart } from '@vicons/ionicons5';
export default defineComponent({
  components: { CloudDownload, Trash, Heart },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    collectflag:{
      type:Boolean,
      default:()=>false,
    },
  },
  emits: ['filterData'],
  setup(props,_emit) {
    const router = useRouter();
    const store = useStore();
    const imgItem = computed(() => props.item);
    const flag = computed(() => props.collectflag);
    function showAlbum() {
      store.commit('SET_ALBUM', {
        srcs: imgItem.value.srcs.split(','),
        title: imgItem.value.title,
      });
      router.push('/carousel');
    }

    const colloading = ref(false);
    const delloading = ref(false);
    const downloading = ref(false);
    function actionMethod(type: string) {
      if(type === 'deleted')_emit.emit('filterData',imgItem.value.href);
      if(flag.value&&type==='collect')_emit.emit('filterData',imgItem.value.href);
      imgItem.value[type] = !imgItem.value[type];
      [{ type: 'collect', flag: colloading }, { type: 'deleted', flag: delloading }, { type: 'download', flag: downloading }].map((e) => {
        if (e.type === type) e.flag.value = true;
      });
      window.ipcRenderer.send('change', {

        act: type,
        title: imgItem.value.title,
        type: imgItem.value.type,
        href: imgItem.value.href,
        value: imgItem.value[type],
        srcs: type === 'download' ? imgItem.value.srcs : '',

      });


      window.ipcRenderer.on(type + '-reply', (event, arg: boolean) => {
        // console.log('chante'+ type + ':' + arg);
        if (arg) {
          const ST = setTimeout(() => {
            [{ type: 'collect', flag: colloading }, { type: 'deleted', flag: delloading }, { type: 'download', flag: downloading }].map((e) => {
              if (e.type === type) {
                e.flag.value = false;
                clearTimeout(ST);
              }
            });
          }, 300);
        }




      });
    }


    function imgloaded() {
      console.log('i am loaded');
    }

    return {
      imgItem,
      showAlbum,
      actionMethod,
      imgloaded,
      colloading,
      delloading,
      downloading,
      flag,
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
.n-card {
  margin: 0.3rem;
  overflow: hidden;
}
.n-card:hover .n-card-header {
  transform: translateY(50%);
  opacity: 1;
}
/* .n-card:hover .n-card__action .n-button.collectstyle {
  opacity: 1;
} */
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

.n-card img {
  width: 100%;
  height: auto;
}
</style>
