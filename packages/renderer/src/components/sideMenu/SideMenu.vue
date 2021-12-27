<template>
  <!-- <n-switch v-model:value="collapsed" /> -->

  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="65"
    :width="120"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue';
import type {DefineComponent} from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import {
  Book,
  Wine,
  Settings,
  Woman,
  Bonfire,
  CameraSharp,
  Star,
  Footsteps,
} from '@vicons/ionicons5';

function renderIcon(icon:DefineComponent) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label:  () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Beauty',
            params: {
              lang: 'zh-CN',
            },
          },
        },
        { default: () => '唯美' },
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(Wine),
  },
  {
    label: '欧美',
    key: 'pinball-1973',
    icon: renderIcon(Woman),
   
  },
  {
    label: '漫画',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(Book),
  },
  {
    label: '美腿',
    key: 'Footsteps-Footsteps-dance',
   icon: renderIcon(Footsteps),
   
  },
   {
    label: '自拍',
    key: 'CameraSharp-CameraSharp-CameraSharp',
   icon: renderIcon(CameraSharp),
   
  },
   {
    label: '露出',
    key: 'Bonfire-Bonfire-dance',
   icon: renderIcon(Bonfire),
   
  },
   {
    label: '收藏',
    key: 'Star-Star-Star',
   icon: renderIcon(Star),
   
  },
   {
    label: '设置',
    key: 'Settings-Settings-Settings',
   icon: renderIcon(Settings),
   
  },
];

export default defineComponent({
  setup() {
    return {
      activeKey: ref(null),
      collapsed: ref(true),
      menuOptions,
    };
  },
});
</script>
