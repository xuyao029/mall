import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

const Home =() => import('../views/home/home')
const Cart =() => import('../views/cart/cart')
const Category =() => import('../views/category/category')
const Profile =() => import('../views/profile/profile')

Vue.use(Router)
// 【添加代码】解决vue-router在3.0版本以上重复点路由报错
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};


const routes =[
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/me',
    component:Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})



export default router
