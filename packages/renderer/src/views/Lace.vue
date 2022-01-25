
<template>
  <page-component pages="Lace" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'LacePage',
  components: { pageComponent },
});
</script>
