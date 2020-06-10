import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
    cartList: []
}
const store = new Vuex.Store({
    // state: {
    //     cartList: []
    // },
    state,
    mutations,
    actions,
    getters
    // mutations {


    //     addCounter(state,payload){
    //         payload.count ++
    //     },
    //     addToCart(state,payload){
    //         state.cartList.push(payload)
    //     }
    //     // addCart(state, payload) {
    //     //     // let oldProduct = null
    //     //     // for(let item of state.cartList){
    //     //     //     if(item.iid === payload.iid){
    //     //     //         oldProduct = item
    //     //     //     }
    //     //     // }
    //     //     // if(oldProduct){
    //     //     //     payload.count +=1
    //     //     // }else {
    //     //     //     playload.count = 1 
    //     //     //     state.cartList.push(payload)
    //     //     // }
    //     //     let product = state.cartList.find(item => item.iid === payload.iid)
    //     //     if (product) {
    //     //         product.count += 1
    //     //     } else {
    //     //         payload.count = 1
    //     //         state.cartList.push(payload)
    //     //     }
    //     // }

    // },


})
export default store