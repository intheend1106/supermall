<!--  -->
<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in swiperImages" :key="index">
        <img :src="item" alt />
        <!-- <h2>hhh</h2> -->
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';

export default {
  data() {
    return {};
  },
  props: {
    swiperImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style  scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
