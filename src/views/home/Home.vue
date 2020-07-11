<!--  -->
<template>
  <div id="home">
    <!-- nav-bar部分 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isFixed"
    ></tab-control>
    <!-- 引入scroll 滚动 -->
    <!-- 加：代表传入Number类型，不加则是String -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @contentScroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图部分 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐部分 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行部分 -->
      <feature-view></feature-view>
      <!-- 选项卡tabcontrol部分 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 引入backtop 回到顶部  组件点击需要加 .native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 引入公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backtop/BackTop';

// 引入子组件
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import { getHomeMultidata, getHomeGoods } from 'network/home';
import { debouce } from 'common/utils.js';
import { itemListenerMixin } from 'common/mixin.js';

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      // 保存数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    };
  },
  components: {
    NavBar,
    // getHomeMultidata,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    // getHomeGoods,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  // 生命周期函数
  //组件一旦创建完成，就执行
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求goods商品信息
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  // 当template被挂载在DOM树上时，回调该函数
  mounted() {
    // 3.监听item图片加载完成
    // 注意点：在created中想要获取$bus 等值，很可能获取不到，写在mounted中
    // const refresh = debounce(this.$refs.scroll.refresh);
    // this.$bus.$on('itemImageLoad', () => {
    //   // console.log('----');
    //   //  调用防抖动函数
    //   refresh();
    // });
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // 离开便销毁
  destroyed() {
    console.log('被销毁');
  },
  activated() {
    // console.log('活跃');
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    // console.log('不活跃');
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  methods: {
    //网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 将page+1
      const page = this.goods[type].page + 1;
      // console.log(page);
      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    // 事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 给backtop回到顶部添加点击事件
    backClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 通过页面滚动位置
    contentScroll(position) {
      // 1.给 backtop回到顶部 显示与隐藏 添加判断条件
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;

      // 2.判断tabControl固定
      this.isFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
    },
    // 等swiper加载完成，获取tabControl的offsetTop
    swiperImageLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    }
  }
};
</script>

<style  scoped>
#home {
  /* padding-top: 44px; */
  /* position: relative; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
  /* 固定位置 */
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 9; */
  /* 固定定位一定要有宽度 */
  /* width: 100%; */
}

/* 单独给tabcontrol 添加功能 */
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/* 给scroll 滚动设置一个高度 */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
</style>
