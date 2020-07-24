<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
             @scroll="contentScroll"
             :pull-up-load="true"
             @pullingUp="loadMore">
        <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComos/HomeSwiper'
import RecommendView from './childComos/RecommenndView'
import FeatureView from './childComos/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from '@/common/utils'

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners: [],
      recommends:[],
      titles:['流行','新款','经典'],
      goods: {
        'pop':{page: 0,list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType:'pop',
      isShowBackTop:false,
      taboffsetTop: 0,
      isTabFixed:false
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
   mounted() {
     //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh)
    this.$bus.$on('itemImagesLoad',()=>{
      refresh()
    })
  },
  methods: {
    /**事件监听相关的方法**/
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // //2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.taboffsetTop

    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      }).catch((e) => {})
    }
  }
}
</script>

<style scoped>
 #home{height: 100vh;position: relative;}
 .home-nav{
   background-color:var(--color-tint);
   color: #fff;
   z-index: 999;
 }

 .content{
   overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
 }
.tab-control{
  position: relative;
  z-index: 9;
}

</style>
