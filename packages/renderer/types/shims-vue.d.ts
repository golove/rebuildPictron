declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'vue-masonry'
declare module 'vue-masonry/src/masonry-vue3.plugin'