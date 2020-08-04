import Vue from 'vue'
import "./network/request";
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import Vant from'vant'
import "vant/lib/index.css";
import store from "./store";

Vue.use(Vant);

Vue.config.productionTip = false

// 全局实例化$bus事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueLazyload, {
  loading: require('@/assets/images/common/placeholder.png'),//加载中图片，一定要有，不然会一直重复加载占位图

});
