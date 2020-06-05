<template>
<!-- ref拿子组件 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
         <slot></slot>
      </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
 name: "Scroll",
 props: {
     probeType: {
         type:Number,
         default: 0
     },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
 },
 data() {
     return {
         scroll:null
     }
 },
 mounted() {
    // 1创建对象 document.querySelector('.wrapper')拿取的wrapper目标不明确
     this.scroll = new BScroll(this.$refs.wrapper,{
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad


     })
     //监听滚动的位置
     this.scroll.on('scroll', (position) => {
        //   console.log(position);
          this.$emit('scroll', position)
        })
   //监听上啦事件
     this.scroll.on('pullingUp', () => {
        //  console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
 },
 //监听滚动的位置
 methods: {
     scrollTo(x,y,time=500) {
         this.scroll.scrollTo(x,y,time)
     },
     finishPullUp() {
     this.scroll.finishPullUp()
      },
 }
}
</script>

<style>

</style>