<template>
  <page-component :pages="'Beauty'" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'BeautyPage',
  components: { pageComponent },
});
</script>
