<template>
  <div class="tab">
    <h2 class="logo">
      golove
    </h2>
    <g-menu v-if="falg" />
    
    <GAlbumbar v-else />
    <windowTool />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {  useRoute } from 'vue-router';
import GMenu from './MenuItem.vue';
import GAlbumbar from './AlbumBar.vue';
import windowTool from './windowTool.vue';
export default defineComponent({
  components: {
    windowTool,
    GMenu,
    GAlbumbar,
  },
  setup() {
    // const menus = [
    //   { title: "Beauty", path: "/", icon: "#beauty" },
    //   { title: "Ustyle", path: "/ustyle", icon: "#female" },
    //   { title: "Carton", path: "/carton", icon: "#carton" },
    //   { title: "Lace", path: "/leisi", icon: "#foot" },
    //   { title: "Selfie", path: "/selfie", icon: "#camera" },
    //   { title: "Passion", path: "/passion", icon: "#tree" },
    //   { title: "Collect", path: "/collect", icon: "#heart" },
    //   { title: "Setting", path: "/setting", icon: "#setting" },
    // ];
    const falg = ref(true);
    const route = useRoute();
    // function handleBack() {
    //   console.log("back");
    // }
    watch(route, (n) => {
      if (n.name === 'Album') {
        falg.value = false;
      }else{
        falg.value = true;
      }
    });
    return {
      falg,
    };
  },
});
</script>
<style scoped>
@media (prefers-color-scheme: dark) {
  .tab {
    /* background-color: #b3b3b3; */
  }
}
@media (prefers-color-scheme: light) {
  .tab {
    background-color: #e6e6e6;
  }
}

.tab {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  font-weight: 500;
  position: sticky;
  top: 45px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.tab .logo {
  width: 4rem;
  height: 31px;
  padding: 0;
  margin: 0;
  font-weight: bold;
  color: #ff0062;
}
</style>
