<template>
<!-- ref拿子组件 -->
  <div ref="wrapper">
      <div >
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
      pullUpLoad: { //外界决定传入的值
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
   if (!this.$refs.wrapper) return
  this.scroll = new BScroll(this.$refs.wrapper,{
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad //监听滚到底部
     })

     //监听滚动的位置
     if(this.probeType === 2|| this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
        //   console.log(position);
          this.$emit('scroll', position)
        })
     }
    
  //  //监听上啦事件
    if(this.pullUpLoad) {
         this.scroll.on('pullingUp', () => {
             //监听滚动到底部
        //  console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
    }
  
 },
 //监听滚动的位置
 methods: {
     scrollTo(x,y,time=500) {
       this.scroll && this.scroll.scrollTo(x,y,time)
     },
     finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
     refresh() {
        // console.log('1111');//防抖测试
       this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
 },
//      watch: {
//     data() {
//       setTimeout(this.refresh, 20)
//     }  
//  }
}
</script>

<style>

</style>