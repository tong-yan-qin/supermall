<template>
  <swiper>
     <swiper-item   :key="item.id" v-for="item in banners">
       <a :href="item.link">
         <img :src="item.image" alt="" @load="imageLoad">
       </a>
     </swiper-item>
   </swiper> 
</template>

<script>
import { Swiper,SwiperItem } from 'components/common/swiper'
export default {
   name: "HomeSwiper",
   props: {
       banners: {
           type: Array,
           default() {
               return []
           }
       }
   },
   data() {//只出现一次，而不是出现四次
     return {
       isLoad: false
     }
   },
   components: {
       Swiper,
       SwiperItem
   },
   methods: {
     imageLoad() {
       if(!this.isLoad){
        this.$emit('swiperImageLoad') 
        this.isLoad = true
       }
      
     }
   }
}
</script>

<style>

</style>