
<template>
  <page-component
    pages="Selfie"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'SelfiePage',
  components: { pageComponent },
});
</script>
