<template>
  <div class="cart-list">
  <scroll class="content" ref="scroll"> 
   <cart-list-item v-for="(item,index) in cartList" 
   :key="index.id" :item-info="item"></cart-list-item>
</scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import cartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
name: 'CartList',
components: {
  Scroll,
  cartListItem
},
 computed: {
     ...mapGetters(['cartList'])
    },
activated() {
     this.$refs.scroll.refresh()
 }
}
</script>

<style scoped>
.cart_list{
   height: calc(100% - 44px -49px - 50px);
  }
  .content {
overflow: hidden;
 position: absolute;
 top:0;
 bottom: 49px;
 left:0;
 right: 0;

  }
</style>

