import { ADD_CONUTER, ADD_TO_CART } from './mutation-type'

export default {
    [ADD_CONUTER](state, payload) {

        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}