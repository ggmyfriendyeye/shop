import "lib-flexible/flexible.js"

import Vue from 'vue'
import App from './App.vue'
import {
  Row,
  Col,
  Tab,
  Tabs,
  Toast
} from 'vant';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'

Vue.use(VueAxios, axios)
Vue.use(VueLazyload, {
  loading: require('./assets/timg.gif')
})
Vue.use(Row).use(Col).use(Tab).use(Tabs).use(Toast);

//导入路由
import router from './router/index.js'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')