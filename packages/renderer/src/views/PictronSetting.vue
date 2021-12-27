<template>
  <div class="setting">
    <h2>Appearance</h2>
    <div class="appearance">
      <n-card>
        <n-space>
          <n-switch
            v-model:value="themeFlag"
            @update:value="handleChange"
          >
            <template #checked>
              深色
            </template>
            <template #unchecked>
              浅色
            </template>
          </n-switch>
          <n-button @click="toggleThemeMode()">
            跟随系统
          </n-button>
        </n-space>
      </n-card>
    </div>
    <h2>ChangeUrl</h2>
    <div class="changeurl">
      <input
        v-model="rootUrl"
        type="text"
        placeholder="new url"
      >
      <button
        :class="rootUrl === '' ? 'btndisabledstyle' : 'loadMoreBtnStyle'"
        :disabled="rootUrl === ''"
        @click="ChangeUrl"
      >
        Change Url
      </button>
    </div>
    <h2>Download</h2>
    <div class="download">
      <p>
        download fold:
        <span class="lightfont">default fold to save download picture</span>
      </p>
      <span>
        <input
          V-model="dirPath"
          type="file"
          webkitdirectory
          directory
        >
        <button
          :class="rootUrl === '' ? 'btndisabledstyle' : 'loadMoreBtnStyle'"
          disabled="true"
          @click="changePath"
        >
          change fold
        </button>
      </span>
    </div>
    <h2 id="versions">
      Lib versions
    </h2>
    <div>
      <ul aria-labelledby="versions">
        <li
          v-for="(version, lib) in versions"
          :key="lib"
        >
          <strong>{{ lib }}</strong>: v{{ version }}
        </li>
      </ul>
    </div>
    <h2>Comment</h2>
    <div class="comment">
      <div>
        <input
          type="text"
          placeholder="nikname"
        >
        <input
          type="email"
          placeholder="xxx@xx.com"
        >
      </div>

      <textarea
        id="comment"
        name="comment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,computed } from 'vue';
import {useStore} from '/@/store';
export default defineComponent({
  setup() {
    const store = useStore();
    const dirPath = ref('');
    const rootUrl = ref('');
    function changePath(): void {
      console.log(dirPath.value);
      window.ipcRenderer.send('changePathOrUrl', `path=${dirPath.value}`);
    }
    function ChangeUrl(): void {
      window.ipcRenderer.send('changePathOrUrl', `url='${rootUrl.value}'`);
    }
    const themeFlag = computed(() => store.state.darkTheme);
    async function toggleThemeMode() {
      store.commit('SET_DARKTHEME',await window.darkMode.system());
    }
    async function handleChange() {
      store.commit('SET_DARKTHEME',await window.darkMode.toggle());
    }

    return {
      themeFlag,
      changePath,
      dirPath,
      ChangeUrl,
      rootUrl,
      versions: window.versions,
      handleChange,
      toggleThemeMode,
    };
  },
});
</script>
