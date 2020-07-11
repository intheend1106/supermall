<!--  -->
<template>
  <!-- 所有item结构一样，写一个结构就好了 -->
  <!-- 给tabbar 添加点击事件，并与router 一一对应 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // 父组件向子组件传递
  props: {
    // 传路径
    path: String,
    // 传颜色动态设置
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      // 比如当前活跃的对象那个路径是/home，则看传过来的path是不是就是/home，如果是则不等于-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // 可后退，则push； 不可后退，则用replace
      this.$router.replace(this.path);
    }
  }
};
</script>

<style  scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* 一般tabbar高度都是49px */
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;

  /* 图片位置 */
  vertical-align: middle;
}
</style>
