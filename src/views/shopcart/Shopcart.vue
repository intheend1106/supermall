<!--  -->
<template>
  <div class="shopcart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content">
      <shopcart-list></shopcart-list>
    </scroll>
    <shopcart-bottom-bar></shopcart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import ShopcartList from './childComps/ShopcartList';
import ShopcartBottomBar from './childComps/ShopcartBottomBar';

import Scroll from 'components/common/scroll/Scroll.vue';

import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    ShopcartList,
    Scroll,
    ShopcartBottomBar
  },
  computed: {
    // 写法1
    ...mapGetters(['cartLength'])
    // 写法2
    // ...mapGetters({
    //   length: 'cartLength'
    // })
  }
};
</script>

<style  scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  text-align: center;
}
.shopcart {
  height: 100vh;
  /* z-index: 9; */
}
.shopcart .content {
  height: calc(100%-44px);
  /* position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden; */
}
</style>
