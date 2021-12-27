<template>
  <div class="pagination">
    <n-pagination
      v-model:page="page"
      :page-count="pagecount"
    />
    <switchButton />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import switchButton from '/@/components/switchButton/SwitchButton.vue';
export default defineComponent({
  components: { switchButton },
  props: {
    pageCount: {
      type: Number,
      default: 8,
    },
  },
  setup(props, _emit) {
    const pagecount = computed(() => props.pageCount);
    const page = ref(1);
    const active = ref(false);
    watch(page, (n) => {
      _emit.emit('turnPage', n);
      // console.log(page.value)
    });

    return {
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
</style>
