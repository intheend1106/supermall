<!--  -->
<template>
  <div>
    <swiper>
      <!-- 动态绑定 -->
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// 引入轮播图;
import { Swiper, SwiperItem } from 'components/common/swiper';

export default {
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // console.log('-----');
      // 让其仅仅发出一次事件
      if (!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
};
</script>

<style  scoped>
</style>
