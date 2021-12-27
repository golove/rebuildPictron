<template>
  <page-component
    :pages="{
      name: 'Beauty',
      url: 'thread.php?fid=14',
    }"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'BeautyPage',
  components: { pageComponent },
});
</script>
