<template>
  <div class="pagination">
    <n-pagination
      v-model:page="page"
      :page-count="pagecount"
      :page-slot="7"
    />
    <switchButton @handle="handle" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted} from 'vue';
import { useStore } from '/@/store';
import switchButton from '/@/components/switchButton/SwitchButton.vue';
export default defineComponent({
  components: { switchButton },
  props: {
    pageCount: {
      type: Number,
      default: 8,
    },
  },
emits: ['handleBtn', 'turnPage'],
  setup(props, _emit) {
    const store = useStore();
    const pagecount = computed(() => props.pageCount);
    const page = ref(1);
    // const pageSize = ref(48);
    const active = ref(false);
    function handle (e:string){
      _emit.emit('handleBtn',e);
    }
    // watch(pageSize,(n)=>{
    //   _emit.emit('turnPageSize',n);
    // });
    watch(page, (n) => _emit.emit('turnPage', n));
    onMounted(()=>{
      page.value = store.state.page;
    });

    return {
      handle,
      pagecount,
      active,
      page,
    };
  },
});
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .pagination {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
  }
}
@media (prefers-color-scheme: light) {
  .pagination {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(6px);
  }
}
.pagination {
  width: 60%;
  padding: 0.8rem 1rem;
  border-radius: 25px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.n-pagination {
  width: 40%;
}
.n-input {
  display: flex;
  flex-wrap: nowrap;
}
</style>
