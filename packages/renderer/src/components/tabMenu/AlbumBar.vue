<template>
  <div class="albumbar">
    <switchButton
      :items="items"
      :title="false"
      @handle="goback"
    />
    <p>{{ title }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '/@/store';
import { useRouter } from 'vue-router';
import switchButton from '/@/components/switchButton/SwitchButton.vue';
export default defineComponent({
  components: { switchButton },
  setup() {
    const store = useStore();
    const router = useRouter();
    const title = computed(() => store.state.albumTitle);
    const items = [
      {
        title: 'back',
        icon: '#arrowLeft',
        methods: () => {
          console.log('fuck you');
        },
      },
      {
        title: 'front',
        icon: '#arrowRight',
        methods: () => {
          console.log('fuck me');
        },
      },
    ];
    function goback(e: string) {
      if (e === 'back') {
        router.go(-1);
      } else {
        router.go(1);
      }
    }
    return {
      goback,
      title,
      items,
    };
  },
});
</script>
<style scoped>
@media (prefers-color-scheme: dark) {
}
@media (prefers-color-scheme: light) {
}

.albumbar {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.albumbar p {
  width: 80%;
  margin: 0;
  text-align: center;
}
</style>
