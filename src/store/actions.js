import { ADD_CONUTER, ADD_TO_CART } from './mutation-type'
export default {

    addCart(context, payload) {
        let product = context.state.cartList.find(item => item.iid === payload.iid)
        if (product) {
            // product.count += 1
            context.commit(ADD_CONUTER, product)
        } else {
            payload.count = 1
                // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
        }
    }

}