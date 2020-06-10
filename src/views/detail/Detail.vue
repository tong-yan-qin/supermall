<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick"
                    ref="nav"></detail-nav-bar>

    <scroll 
      class="content" 
      ref="scroll"
      :probe-type="3" 
      @scroll="contentScroll">   
       <!-- 有固定的高度 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>

      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list> 
    </scroll>
   <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
     <back-top @click.native="backTop" 
       v-show="isShowBackTop"></back-top>

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
 import DetailBottomBar from './childComps/DetailBottomBar'

import BackTop from 'components/content/backTop/BackTop'
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
      GoodsList,
      DetailBottomBar,
      BackTop
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
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop: false,
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
       console.log(this.detailInfo)
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
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
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
      backTop(){
        this.$refs.scroll.scrollTo(0,0)
        //监听点击事件
       
     },
     addToCart() {
        // 1.获取信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //添加购物npm车
      //  this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
     },
      contentScroll(position) {
         this.isShowBackTop = (-position.y) > 1000
        const positionY = -position.y
        const length = this.themeTopYs.length
      //   for(let i=0;i<this.themeTopYs.length;i++) {
      //      console.log(i)
      //   if(positionY >this.themeTopYs[i] &&positionY  <this.themeTopYs[i+1] ) {
      //     // console.log(i)
      //   }
      //  }
      // for( let i=0 ; i<length ;i++){
      //   if(this.currentIndex !== i 
      //   &&(i < length-1
      //   && positionY >this.themeTopYs[i]
      //   && positionY < this.themeTopYs[i+1])
      //   ||(i===length-1 && positionY >=this.themeTopYs[i])){          this.currentIndex = i
      //   //  console.log(i)
      //   this.$refs.nav.currentIndex = this.currentIndex
      // }
      // }
      for( let i=0 ; i<length-1 ;i++){
       if(this.currentIndex !== i &&(positionY >=this.themeTopYs[i]&& positionY < this.themeTopYs[i+1])){
         this.currentIndex = i
        //  console.log(this.currentIndex)
         this.$refs.nav.currentIndex = this.currentIndex


        }
       
      }

     },
     
  }
 }
</script>

<style scoped>
 #detail {
  height: 100vh;
  position: relative;
  }

  .content {
  overflow: hidden;
 position: absolute;
 top:44px;
 bottom: 49px;
 left:0;
 right: 0;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>