
<template>
  <page-component
    pages="Passion"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'PassionPage',
  components: { pageComponent },
});
</script>
