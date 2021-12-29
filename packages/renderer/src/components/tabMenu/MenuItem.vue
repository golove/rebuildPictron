<template>
  <div class="tabmenu">
    <div
      id="over"
      class="over"
    />
    <div
      v-for="(menu, index) in menus"
      :id="'menu' + index"
      :key="menu.title"
      class="menu"
      :class="menu.path === stayPath ? 'active' : ''"
      @click="menuMethod(index, menu.path)"
    >
      {{ menu.title }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import {IMenu} from '/@/type'
// import windowTool from './windowTool.vue'
export default defineComponent({
  components: {
    // windowTool
  },
  setup() {
    const stayPath = ref('/');
    const menus = [
      { title: 'Beauty', path: '/', icon: '#beauty' },
      { title: 'Ustyle', path: '/ustyle', icon: '#female' },
      { title: 'Carton', path: '/carton', icon: '#carton' },
      { title: 'Lace', path: '/leisi', icon: '#foot' },
      { title: 'Selfie', path: '/selfie', icon: '#camera' },
      { title: 'Passion', path: '/passion', icon: '#tree' },
      { title: 'Collect', path: '/collect', icon: '#heart' },
      { title: 'Setting', path: '/setting', icon: '#setting' },
    ];
    const router = useRouter();

    function menuMethod(index: number, path: string) {
      router.push(path);
      stayPath.value = path;
      const over = document.getElementById('over');
      let moveLeft = 0;
      for (let i = 0; i < index; i++) {
        moveLeft += document.getElementById('menu' + i)!.offsetWidth;
      }
      const tab = document.getElementById('menu' + index);
      over!.style.width = `${tab!.offsetWidth}px`;
      over!.style.left = `${moveLeft}px`;
    }
    const route = useRoute();
    watch(route, (n) => {
      console.log(n.path);
      stayPath.value = n.path;
      const index = menus.findIndex((e) => e.path === n.path);
      if (index > -1) {
        menuMethod(index, n.path);
      } else {
        return;
      }


    });
    return {
      stayPath,
      menus,
      menuMethod,
    };
  },
});
</script>
<style scoped>
@media (prefers-color-scheme: dark) {
  .tabmenu {
    /* background-color: #b3b3b3; */
  }
  .tabmenu .menu {
    color: rgb(126, 126, 126);
  }
  .tabmenu .over {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .tabmenu .active {
    color: rgba(255, 9, 103, 0.9);
  }
}
@media (prefers-color-scheme: light) {
  .tabmenu {
    background-color: #e6e6e6;
  }
  .tabmenu .menu {
    color: rgb(168, 158, 161);
  }
  .tabmenu .over {
    background-color: rgba(255, 9, 103, 0.9);
  }
  .tabmenu .active {
    color: #ffffff;
  }
}

.tabmenu {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  font-weight: 500;
  position: sticky;
  top: 45px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.tabmenu .logo {
  width: 4rem;
  height: 31px;
  padding: 0;
  margin: 0;
  font-weight: bold;
  color: rgba(255, 0, 98, 1);
  /* background: url('/@/assets/logo.png') no-repeat; */
  /* background-size:contain;
  background-position: center; */
}
.tabmenu .menu {
  -webkit-app-region: no-drag;
  margin: 0rem;
  padding: 0.25rem 1rem;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s esse;
}
.tabmenu .over {
  position: absolute;
  height: 85%;
  margin-left: 1rem;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  transition: all 0.3s ease;
  backdrop-filter: brightness(460%);
}
</style>
