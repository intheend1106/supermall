<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="button" :is-checked="isAllChecked" @click.native="checkClick"></check-button>
    </div>
    <span class="all">全选</span>
    <span class="total">合计：{{totalPrice}}</span>
    <div class="computed">去计算({{countLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton';

import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    ...mapActions(['addCart']),
    totalPrice() {
      return (
        '¥' +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((prevalue, item) => {
            return prevalue + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    countLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    isAllChecked() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      if (this.isAllChecked) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    }
  }
};
</script>

<style  scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  align-items: center;
  /* z-index: 9; */
}
.check-content {
  padding: 0 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.total {
  margin: 0 20px;
}
.computed {
  width: 100px;
  line-height: 40px;
  position: absolute;
  right: 0;
  background-color: orangered;
  text-align: center;
  color: #fff;
}
</style>
