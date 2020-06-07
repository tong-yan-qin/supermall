<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed">
    </tab-control>

   <scroll class="content" 
           ref="scroll" 
           :probe-type="3" 
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore"
          >
      <home-swiper :banners="banners" 
      @swiperImageLoad="swiperImageLoad">
      </home-swiper>

      <recommend-view 
      :recommends="recommends">
      </recommend-view>

      <feature-view></feature-view>

      <tab-control ref="tabControl2"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      >
      </tab-control>

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
import {debounce } from "common/utils"


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
        isShowBackTop: false,//个v-show有关
        taboffsetTop:0,
        isTabFixed: false,
        saveY:0

      }

    },
     computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求数据
     this.getHomeMultidata()
      //2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')

     

    // created中可能拿不到ref数据 3.监听item中的图片加载完成 xie
      // this.$bus.$on('itemImageLoad',() =>{
      //     this.$refs.scroll.refresh()
      // })
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh)

      this.$bus.$on('itemImageLoad',() => {
          // this.$refs.scroll.refresh() 这样使用刷新太频繁
          refresh()
      })
      //获取tabcontrol的offsettop
      // //所有的组件都有一个$el用于获取组件中的元素
      // this.taboffsetTop = this.$ref.tabControl.$el.offsetTop

    },
    //**记录离开home的位置开始
      activated(){
        this.$refs.scroll.scrollTo(0, this.saveY,0)
        this.$refs.scroll.refresh() //刷新一次
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY() 
        
       },
     //**记录离开home的位置结束


    methods: {
      //**/ 网络请求开始
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
    
          //上拉加载更多 因为srcoll只能加载一次
          this.$refs.scroll.finishPullUp()
     
        })
      },
      //**/ 网络请求结束




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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      
      },
    backClick () { 
        // 方法一//拿到scroll组件对象拿属性拿方法 ，通过ref来拿
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        //方法二
        this.$refs.scroll.scrollTo(0,0)
      },
    contentScroll(position) {
        //判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // console.log(position)

      // 2.决定tabcontrol是否吸顶 position：fixed
      this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
    loadMore() {
      //  console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      
      },
    swiperImageLoad () {
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

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
  color:#fff;

  /*浏览器原生滚动，现在使用scroll所以放弃*/
  /* color:white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:9999; */
  

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

/* .fixed {
  position:fixed;
  left: 0;
  right: 0;
  top:44px;
} */
.tab-control {
position:relative;
z-index: 9999;


}
</style>
