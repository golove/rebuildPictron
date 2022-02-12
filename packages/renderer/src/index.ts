import {createApp} from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import { store, key } from './store';
import naive from 'naive-ui';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

import { VueMasonryPlugin } from 'vue-masonry';
// import mitt from 'mitt';
// const emitter = mitt();

const app = createApp(App);
// app.config.globalProperties.emitter = emitter;
app.use(router)
   .use(store, key)
   .use(VueMasonryPlugin)
   .use(naive)
   .mount('#app');
