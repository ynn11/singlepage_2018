// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

// import VueEmoji from 'emoji-vue'
// import 'emoji-vue/src/lib/css/emoji.css'
// Vue.use(VueEmoji)

// 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '79a27c0d33c55628a9df768b9b9b85fc',
  // 插件集合
  plugin: ['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});


import  'swiper/dist/css/swiper.css';

Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
