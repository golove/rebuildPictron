
<template>
  <page-component
    pages="Cartoon"
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
