<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  //组件创建后调用
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 注意：button 可以不设置true，但是div 必须设置true，click才有效
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 2.监听scroll滚动的位置
    this.scroll.on('scroll', position => {
      // console.log(position);
      this.$emit('contentScroll', position);
    });
    // 3上拉加载更多
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp');
    });
  },
  methods: {
    // 回到顶部的函数
    scrollTo(x, y, time = 300) {
      // 加&&是为了保证scroll存在，以防bug出错
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 一次加载更多以后，想继续加载更多，则需要
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 每加载完成一张图片 刷新一次
    refresh() {
      this.scroll && this.scroll.refresh();
      console.log('----');
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style  scoped>
</style>
