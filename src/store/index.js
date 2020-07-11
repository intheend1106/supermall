import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 2.创建Store对象 ,并挂载到Vue实例上
export default new Vuex.Store({
  state,
  // mutations里面最好功能单一点，只用来修改state的值
  mutations,
  //所以放进actions中，然后传给mutations
  actions,
  getters,
  modules: {}
})
