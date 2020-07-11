<!--  -->
<template>
  <div class="shopcartlist">
    <shopcart-list-item :list-item="item" v-for="(item,index) in cartList" :key="index"></shopcart-list-item>
  </div>
</template>

<script>
import ShopcartListItem from './ShopcartListItem';

import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {
    ShopcartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
};
</script>

<style  scoped>
</style>
