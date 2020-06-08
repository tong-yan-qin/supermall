<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" :key="index"
              class="title-item" :class="{active: index === currentIndex}"
              @click="titleClick(index)">
              {{item}}
              </div>
           </div>
        </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
 name: "DetailNavBar",
  components: {
      NavBar
      },
      data() {
          return {
              titles: ['商品','详情', '评论', '推荐'],
              currentIndex:0
          }
      },
    methods:{
        titleClick(index) {
              this.currentIndex = index;
              //联动发生点击
              this.$emit('itemClick', index);
          },
          backClick() {
              this.$router.back()//返回首页

          }
      }
}
</script>

<style>
.nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.title {
    display: flex;
    font-size: 12px;
}
.title-item {
    flex: 1;
}
.active {
    color: var (--color-high-text);
}
.back img {
  margin-top: 10px;
    
}
</style>