<!--  -->
<template>
  <div v-if="Object.keys(goodsParams).length!==0" class="params-info">
    <table class="params-rule">
      <tr v-for="(tr,index) in goodsParams.rule.tables[0]" :key="index">
        <td v-for="(td,indey) in tr" :key="indey">{{td}}</td>
      </tr>
    </table>
    <table class="params-info">
      <tr v-for="(item,indez) in goodsParams.info.set" :key="indez">
        <td class="params-info-key">{{item.key}}</td>
        <td class="params-info-value">{{item.value}}</td>
      </tr>
    </table>

    <div class="params-img" v-if="goodsParams.info.images">
      <img :src="goodsParams.info.images[0]" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style  scoped>
.params-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.params-info table {
  width: 100%;
  border-collapse: collapse;
}
/* .params-rule,
.params-info {
  width: 100%;
  border-collapse: collapse;
} */
.params-info tr,
.params-rule tr {
  height: 42px;
}
.params-rule td,
.params-info td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.params-info-value {
  color: var(--color-tint);
}
.params-info-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
</style>
