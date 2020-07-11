export default {
  addCart(context, payload) {
    // payload新添加的商品
    // 判断cartList中是否已经有
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      // 判断oldProduct
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前数量+1')
      } else {
        // 先给payload加一个count属性
        payload.count = 1
        context.commit('addToCart', payload)
        // context.state.cartList.push(payload);
        resolve('添加了新的商品')
      }
    })

  }

}
