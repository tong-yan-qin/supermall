<template>
<div class="tab-control">
    <div v-for="(item,index) in titles"  :key="index"
    :class="{active: index === currentIndex}" class="tab-control-item"
   @click="itemClick(index)">
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
            default() {
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
}
.tab-control-item {
    flex:1;
    height: 40px;
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