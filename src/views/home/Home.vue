<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <scroll class="content" 
           ref="scroll" 
           :probe-type="3" 
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore"
          >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <!-- 组件是无法直接监听事件的，只有通过.native -->
   <back-top @click.native="backClick" 
   v-show="isShowBackTop"></back-top>
 </div>
 
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import NavBar from 'components/common/navbar/NavBar'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata,getHomeGoods} from 'network/home';

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data () {
      return { //用来保存请求过来的数据
          banners: [],
          recommends: [],
         goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',//默认pop
        isShowBackTop: false//个v-show有关

      }

    },
     computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求数据
     this.getHomeMultidata()
      //请求商品数据
     this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      // 网络请求
      getHomeMultidata(){
       getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
       
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)//新数组中压入数组并且保存
          this.goods[type].page += 1
    //上拉加载更多
          this.$refs.scroll.finishPullUp()
     
        })
      },
      //事件监听
    tabClick(index) {
        switch (index) {
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
      
      },
      backClick () { 
        // 方法一//拿到scroll组件对象拿属性拿方法 ，通过ref来拿
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        //方法二
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
      // console.log(position)
      },
      loadMore() {
      //  console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      //重新刷新更新
      this.$refs.scroll.scroll.refresh()
      }

    }

           
  }
</script>

<style scoped>
#home {
  /* padding-top:44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint) ;
  color:white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:9999;
  color: #fff;

}
.tab-control {
  position: sticky;
  top:44px;
  z-index:9999;
}

/* 滚动条距离两种方式 cala计算和定位 */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content { 
 overflow: hidden;
 position: absolute;
 top:44px;
 bottom: 49px;
 left:0;
 right: 0;

}
</style>
