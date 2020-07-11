<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @itemClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @contentScroll="contentScroll">
      <detail-swiper :swiper-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
      <detail-goods-params :goods-params="goodsParams" ref="params"></detail-goods-params>
      <detail-comment-info :comment-info="commentInfo" ref="comments"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast class="toast" :message="message" :isShow="isShow"></toast>
  </div>
</template>

<script>
// 引入子组件
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailGoodsParams from './childComps/DetailGoodsParams';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import { mapActions } from 'vuex';

// 引入backTop
import BackTop from 'components/content/backtop/BackTop';

import Toast from 'components/common/toast/Toast';

// 引入GoodsList组件
import GoodsList from 'components/content/goods/GoodsList';

// 引入BScroll
import Scroll from 'components/common/scroll/Scroll';

import { getDetail, Goods, Shop, getRecommend } from 'network/detail';
import { itemListenerMixin } from 'common/mixin.js';
import { debouce } from 'common/utils.js';

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      message: '',
      isShow: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    // getDetail,
    // Goods,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  mixins: [itemListenerMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    this.getDetail(this.iid);
    // 3.获取推荐数据
    this.getRecommend();
    // 4.给getThemeTopY赋值 加一个防抖函数
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 200);
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  methods: {
    // 2.获取请求数据
    getDetail() {
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        // 1.获取轮播图的图片轮播数据
        // this.topImages.push(res.result.itemInfo.topImages);
        this.topImages = data.itemInfo.topImages;
        // console.log(this.topImages);
        // 注：2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        console.log(this.goods);

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 4.获取商品详情信息
        this.detailInfo = data.detailInfo;
        // 5.获取商品参数信息
        this.goodsParams = data.itemParams;
        // 6.获取商品评论信息
        // 添加一个判断
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    imagesLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    // 3.请求推荐数据
    getRecommend() {
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list;
      });
    },
    // 4.点击标题,到对应内容位置
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // 5.监听scroll的位置
    contentScroll(position) {
      // console.log(position.y);
      // 根据位置与themeTopYs的参数大小 判断index值
      const y = -position.y;
      const length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length - 1 && y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1]) || (i === length - 1 && y >= this.themeTopYs[i]))) {
      //     // console.log(i);
      //     this.currentIndex = i;
      //     this.$refs.navbar.currentIndex = this.currentIndex;
      //   }
      // }
      //  给上面做一个简化，给this.themeTopYs再push 一个值
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && i < length - 1 && y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1]) {
          // console.log(i);
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    // 6.点击backTop回到顶部
    backClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 添加购物车弹窗,引入actions中addCart,映射过来
    ...mapActions(['addCart']),
    // 6.购物车需要展示的商品信息
    addToCart() {
      // 1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      // 商品的iid一定要传
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // 方法1
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // });
      // 方法2
      this.addCart(product).then(res => {
        this.isShow = true;
        this.message = res;
        // console.log(res);
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, 1500);
      });
    }
  }
};
</script>

<style  scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  /* height: calc(100% - 44px); */
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
