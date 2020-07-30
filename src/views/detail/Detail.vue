<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"/>
  <Scroll class="content"
          ref="scroll"
          @scroll="contentScroll"
          :probe-type="3">
    <detail-swiper :top-images="topImages" class="detail-set-scroll"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-images-info :detail-info="detailInfo"  @imageLoad="imgLoad"/>
    <detail-param-info :param-info="paramInfo" class="detail-set-scroll"/>
    <detail-comment-info  :comment-info="commentInfo" class="detail-set-scroll"/>
    <goods-list :goods="recommendList" :is-recommend="true" class="detail-set-scroll"/>
  </Scroll>

  <!-- 回到顶部,监听组件的原生事件必须要用native修饰符变成原生组件 -->
    <transition name="scroll">
      <back-top @click.native="backTop" v-show="curPosition >= 1500" />
    </transition>

    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImagesInfo from './childComps/DetailImagesInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from "components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import { backTopMixin, itemImgListenerMixin } from "@/common/mixin";


export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,

  },
  data() {
    return {
      iid:null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList:[],
      detailClassList: []
    }
  },
  // vue重复代码的混入
  mixins: [ itemImgListenerMixin, backTopMixin],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.query.iid;
    // 发送网络请求
    this.getDetail();
    this.getRecommend();
  },

  methods: {
    // 请求详情数据
    getDetail() {
      //2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      //1.获取顶部的图片轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3.创建店铺信息的对像
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

       // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      })
    },
    imgLoad(){
      this.refresh();
      this.getClassList()
    },
    // 请求推荐数据
     getRecommend() {
      getRecommend().then(res => {
        this.recommendList = res.data.list;
      })
    },
   titleClick(index){
    // 根据数组下标滚动到对应的元素内容位置
      this.$nextTick(() => {
        let el = document.getElementsByClassName("detail-set-scroll");
        this.$refs.scroll.scrollToElement(el[index], 300);
      });
    },
    // 获取classList
    getClassList() {
      // Array.from() 将伪数组转换成纯数组
      this.detailClassList = [];
      this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
      let maxValue = 10000000;
      this.detailClassList.push({ offsetTop: maxValue });
    },

     // 监听详情页滚动事件,并动态设置navBar的index
    contentScroll(position) {
     let detailPosition = position ? -position.y : 0;
      this.curPosition = detailPosition;

      for (let i = 0; i < this.detailClassList.length - 1; i++) {
        if (
          detailPosition >= this.detailClassList[i].offsetTop &&
          detailPosition < this.detailClassList[i + 1].offsetTop
        ) {
          if (this.detailIndex !== i) {
            this.detailIndex = i;
            this.$refs.detailNavBar.currentIndex = this.detailIndex;
          }
          break;
        }
      }
    },
    // 添加购物车
    addToCart() {
      // 1.获取需要展示到购物车的商品信息
      const obj = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        id: this.detailId
      };

      // 2.将商品数据传到购物车页面
      this.$store.dispatch("setCateGoryData", obj);
    }

  },
  destroyed() {
     this.$bus.$off("imgLoad", this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 101;
    background: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 102;
    background: #fff;
    }
  .content{
    width: 100%;
    height: calc(100% - 44px);
  }
</style>
