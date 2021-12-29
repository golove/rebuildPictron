
<template>
  <page-component
    pages="Carton"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'CartonPage',
  components: { pageComponent },
});
</script>
