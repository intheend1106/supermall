<!--  -->
<template>
  <div class="bottom-bar">
    <div class="left">
      <div>
        <span class="kf icon"></span>
        <span>客服</span>
      </div>
      <div>
        <span class="dp icon"></span>
        <span>店铺</span>
      </div>
      <div>
        <span class="sc icon"></span>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="shopcart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

    <!-- 工具栏 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addToCart() {
      this.$emit('addToCart');
    }
  }
};
</script>

<style  scoped>
.bottom-bar {
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* bottom: 49px; */
  /* z-index: 9; */
  background-color: #fff;
  display: flex;
  text-align: center;
  /* padding-top: 6px; */
  font-size: 14px;
  overflow: hidden;
}
.left {
  flex: 1;
  display: flex;
  padding-top: 6px;
}
.left > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  /* flex: 1; */
  width: 22px;
  height: 22px;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 0 0/100%;
}
.dp {
  background-position: 0 -98px;
}
.kf {
  background-position: 0 -54px;
}
.right {
  flex: 1;
  display: flex;
}
.right > div {
  flex: 1;
  line-height: 49px;
}
.shopcart {
  background-color: #ffe817;
  color: #333;
}
.buy {
  background-color: #f69;
}
</style>
