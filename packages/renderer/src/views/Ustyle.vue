<template>
  <page-component
    pages="Ustyle"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'UstylePage',
  components: { pageComponent },
});
</script>
