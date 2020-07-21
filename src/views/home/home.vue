<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from './childComos/HomeSwiper';
import {getHomeMultidata} from 'network/home';



export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper
  },
  data(){
    return {
      banners: [],
      recommend:[]
    }
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(res =>{
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
 .home-nav{
   background-color:var(--color-tint);
   color: #fff;
 }
</style>
