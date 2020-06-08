<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick"
                    ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll">   
       <!-- 有固定的高度 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods=" goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    
    </scroll>

  </div>
</template>

<script>
 import DetailNavBar from './childComps/DetailNavBar'
 import DetailSwiper from './childComps/DetailSwiper'
 import DetailBaseInfo from './childComps/DetailBaseInfo'
 import DetailShopInfo from './childComps/DetailShopInfo'
 import DetailGoodsInfo from './childComps/DetailGoodsInfo'
 import DetailParamInfo from './childComps/DetailParamInfo'
 import DetailCommentInfo from './childComps/DetailCommentInfo'
 import GoodsList from 'components/content/goods/GoodsList'
 import {debounce} from "common/utils"

 import Scroll from 'components/common/scroll/Scroll'


 import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";


 export default {
  name: "Detail",
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
      },
 data() {
   //保存id
     return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailImages: [],
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY:null
     }
    
     
 },
 created() {
     this.iid = this.$route.params.iid
     getDetail(this.iid).then(res => {
       const data=res.result
       this.topImages =  data.itemInfo.topImages
       //获取商品信息
       this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       this.shop = new Shop(data.shopInfo)
       this.detailInfo = data.detailInfo
       this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
       //取评论信息
       if(data.rate.cRate !== 0){
         this.commentInfo = data.rate.list[0]
       }
     })

     getRecommend().then(res => {
      //  console.log(res)
       this.recommends =res.data.list
     })

       //给getThemeTopY 赋值
        this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // this.themeTopYs.push(Number.MAX_SAFE_INTEGER);

        console.log(this.themeTopYs);
      },100)
   
 },
  methods: {
       imageLoad() {
        this.$refs.scroll.refresh()
       //给getThemeTopY 赋值
       this.getThemeTopY()
      
       },
        itemClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
        
 },

     },
     
}
</script>

<style>
 #detail{
   position: relative;
   background-color: #fff;
    height: 100vh;
    z-index: 9;
 }
 .content {
  height: calc(100% - 44px);
  background-color: #fff;
 }
 .detail-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
</style>