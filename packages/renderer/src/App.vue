<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <n-global-style />
    <n-layout position="absolute">
      <n-layout-header bordered>
        <tab-menu />
      </n-layout-header>
      <n-layout
        ref="content"
        position="absolute"
        style="top: 31px"
        content-style="padding: 4px;"
        :native-scrollbar="false"
      >
        <router-view />
      </n-layout>
    </n-layout>
  </n-config-provider>
  <svgview />
</template>

<script lang="ts">
import tabMenu from './components/tabMenu/TabMenu.vue';
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { darkTheme } from 'naive-ui';
import type {GlobalThemeOverrides} from 'naive-ui';
import { useStore } from '/@/store';
import svgview from './SvgIcon.vue';
export default defineComponent({
  name: 'App',
  components: {
    // sideMenu,
    // AppNavigation,
    svgview,
    tabMenu,
  },
  setup() {
    const store = useStore();
    const theme: null | unknown = ref(null);
    const themeFlag = computed(() => store.state.darkTheme);

    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: '#ff0062FF',
        primaryColorHover: '#FF488EFF',
        primaryColorPressed: '#D90053FF',
        primaryColorSuppl: '#ff0062FF',
      },
      Button: {
        textColor: '#ff0062FF',
      },
      Select: {
        peers: {
          InternalSelection: {
            textColor: '#ff0062FF',
          },
        },
      },
    };
    watch(themeFlag, (n) => {
      n ? (theme.value = darkTheme) : (theme.value = null);
    });
    onMounted(async () => {
      const flag = await window.darkMode.system();
      console.log(flag);
      store.commit('SET_DARKTHEME', flag);
    });
    return {
      themeOverrides,
      theme,
    };
  },
});
</script>
