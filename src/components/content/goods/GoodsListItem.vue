<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {//从goodlist拿数据
      goodsItem: {
        type: Object,
        default() {
          return {
          }
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }

    },
    //监听图片的加载
    methods:{
      imageLoad () {
        //要拿到scroll的东西即非父子之间的通信，不可以直接要间接的拿方法一
        this.$bus.$emit('itemImageLoad')
        //因为$bus是空的东西，所以需要加东西，而加东西则是需要通过原型
        //方法二是通过vuex来拿

      },
      //监听事件的点击 路由跳转 并且拿到id
     itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
        // this.$router.push({
        //   path: '/detail',
        //   query: {
            
        //   }
        // })
      } 
    }
}
</script>

<style>
.goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>