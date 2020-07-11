<!--  -->
<template>
  <div class="detail-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          :class="{active:currentIndex===index}"
          @click="itemClick(index)"
          v-for="(item,index) in detailTitles"
          :key="index"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
  data() {
    return {
      detailTitles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    backClick() {
      // 返回上一页
      this.$router.go(-1);
    },
    itemClick(index) {
      console.log(index);
      this.currentIndex = index;
      this.$emit('itemClick', index);
    }
  }
};
</script>

<style  scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.back {
  margin-top: 8px;
  margin-left: 10px;
}
.active {
  color: var(--color-tint);
}
</style>
