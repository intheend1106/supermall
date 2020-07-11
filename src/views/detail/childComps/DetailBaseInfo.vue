<!--  -->
<template>
  <div v-if="Object.keys(goods).length!==0">
    <div class="goods-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 注意写法 -->
    <div class="info-service">
      <span v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style  scoped>
.goods-title {
  color: black;
  font-size: 16px;
}
.info-price {
  position: relative;
  margin: 10px 0;
}
.n-price {
  color: var(--color-tint);
  font-size: 20px;
}
.o-price {
  font-size: 12px;
  color: gray;
  margin-left: 4px;
  text-decoration: line-through;
}
.discount {
  position: absolute;
  top: 0;
  left: 124px;
  font-size: 14px;
  background-color: var(--color-tint);
  color: #fff;
  padding: 0 3px;
  border-radius: 6px;
}
.info-other {
  margin: 10px 0;
  font-size: 12px;
  color: gray;
  display: flex;
  justify-content: space-between;
}

.info-service {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.info-service img {
  width: 10px;
}
</style>
