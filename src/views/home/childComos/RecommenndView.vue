<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="recommend-tit">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
      recommends:{
        type: Array,
        default(){
          return []
        }
      }
    }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
    width: 25%;
    padding: 10px;
  }
  .recommend-item img{width: 100%;}
  .recommend-tit{font-size: 12px;line-height: 24px;}
</style>
