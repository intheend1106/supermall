<!--  -->
<template>
  <div class="cartlist-item">
    <div class="item-selector">
      <check-button :is-checked="listItem.checked" @click.native="buttonClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="listItem.image" alt />
    </div>
    <div class="item-bottom">
      <div class="item-title">{{listItem.title}}</div>
      <div class="item-desc">{{listItem.desc}}</div>
      <div class="item-price left">{{'¥'+listItem.price}}</div>
      <div class="item-count right">{{'x'+listItem.count}}</div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton';

export default {
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    buttonClick() {
      this.listItem.checked = !this.listItem.checked;
    }
  }
};
</script>

<style  scoped>
.cartlist-item {
  width: 100%;
  /* font-size: 0; */
  padding: 8px 4px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.item-selector {
  width: 14%;
  padding-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img img {
  width: 80px;
  height: 100px;
  /* margin-right: 8px; */
}
.item-bottom {
  position: relative;
  overflow: hidden;
  padding: 0 5px;
}
.item-title,
.item-desc {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-title {
  font-size: 16px;
}
.item-desc {
  margin: 10px 0;
}

.item-price,
.item-count {
  position: absolute;
  bottom: 12px;
}
.item-count {
  right: 10px;
}
.item-price {
  color: orangered;
}
</style>