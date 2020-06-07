<template>
<div class="tab-control">
    <div v-for="(item,index) in titles"  :key="index"
    :class="{active: index === currentIndex}" class="tab-control-item"
   @click="itemClick(index)"> 
   <!-- //选中哪个tab，哪一个tab文字的颜色变，下面的border-bottom同时进行展示 -->
        <span>{{item}}</span>
        </div>
</div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles:{
            type: Array,
            default() {//对象或者数组默认值default必须为函数
                return []
            }
        }
    },
    data() {
        return {
          currentIndex:0 //记录哪个文件被选中
        }
    },
    methods: {  //记录哪个下标被点击
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick',index) //子组件往父组件船只
        }

    }

}
    
</script>

<style>
.tab-control {
    display: flex;
    text-align: center;
    font-size: 12px;
    height: 40px;
    background-color: #fff;
}
.tab-control-item {
    flex:1;
    
    line-height: 40px;
}
.tab-control-item span {
    padding: 5px;
}
.active {
    color: var(--color-high-text);
   
}
.active span {
    border-bottom: 3px solid var(--color-tint);
}
</style>