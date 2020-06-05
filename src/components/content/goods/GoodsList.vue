<template>
  <div class="goods">
   
      <goods-list-item v-for="item in goods" :key="item" :goods-item="item"></goods-list-item>
  </div>
</template>


<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: "GoodsList",
  components: {
      GoodsListItem
  },
  props: {//从home中拿出数据
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }

}
</script>

<style>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; /* 均等分 */

    padding: 2px;
  }
</style>