<template>
 <div class="cart">
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>

   <cart-list>
   </cart-list>

   <cart-button-bar></cart-button-bar>


 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'

import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
  components:{
    NavBar,
    CartList,
    CartButtonBar

  },
  computed: {
    cartLength() {
      return this.$store.getters.cartLength
    }
    // ...mapGetters(['cartLength'])
    //  ...mapGetters({ 
    //   length:'cartLength'
    // })

  }
  }
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-weight: 700;
}
.cart{
  height: 100vh;
}
 .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
