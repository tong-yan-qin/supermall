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

<style scoped>
.title{
    display: flex; 
}
.title-item{
    flex: 1;
}
.active{
    color: red;
}
.back img{
    margin-top: 12px;
}
</style>