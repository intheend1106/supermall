<!--  -->
<template>
  <div class="goodslist">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsitem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';

export default {
  components: {
    GoodsListItem
  },
  data() {
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style  scoped>
.goodslist {
  display: flex;
  /* 设置子元素换行 */
  flex-wrap: wrap;
  /* 平分剩余空间 */
  justify-content: space-around;
}
</style>
