
<template>
  <page-component pages="Leisi" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageComponent from './pageComponent.vue';
export default defineComponent({
  name: 'LeisiPage',
  components: { pageComponent },
});
</script>
