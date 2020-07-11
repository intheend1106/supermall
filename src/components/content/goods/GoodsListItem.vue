<!--  -->
<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsitem.image || this.goodsitem.show.img;
    }
  },
  methods: {
    // 利用事件总线发射事件
    imageLoad() {
      this.$bus.$emit('itemImageLoad');
    },
    itemClick() {
      // console.log('itemClick');
      //  点击以后，路由跳转
      this.$router.push('/detail/' + this.goodsitem.iid);
    }
  }
};
</script>

<style  scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-item .goods-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
}
.goods-item .goods-info p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.collect::before {
  position: absolute;
  top: -1px;
  left: -15px;
  content: '';
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  /* background-color: blue 0 0 14px 14px; */
}
</style>
