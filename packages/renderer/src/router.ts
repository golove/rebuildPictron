import {createRouter, createWebHashHistory} from 'vue-router';
// import Home from '/@/components/Home.vue';
import Beauty from '/@/views/Beauty.vue';
const routes = [
  // {path: '/', name: 'Home', component: Home},
  // {path: '/about', name: 'About', component: () => import('/@/components/About.vue')},
  { path: '/', name: 'Beauty', component: Beauty },
  { path: '/ustyle', name: 'Ustyle', component: () => import('/@/views/Ustyle.vue') }, // Lazy load route component
  { path: '/carton', name: 'Carton', component: () => import('/@/views/Carton.vue') },
  { path: '/leisi', name: 'Leisi', component: () => import('/@/views/Leisi.vue') },
  { path: '/selfie', name: 'Selfie', component: () => import('/@/views/Selfie.vue') },
  { path: '/passion', name: 'Passion', component: () => import('/@/views/Passion.vue') },
  { path: '/collect', name: 'Collect', component: () => import('/@/views/MyCollect.vue') },
  { path: '/album', name: 'Album', component: () => import('/@/components/album/index.vue') },
  { path: '/setting', name: 'Setting', component: () => import('./views/PictronSetting.vue') },

];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
