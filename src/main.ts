// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Request from './api/request'

import 'nprogress/nprogress.css'
import './utils/adaptive'
import './assets/css/reset.scss'

Vue.config.productionTip = false

// 设置全局函数
Vue.prototype.$http = new Request();

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
