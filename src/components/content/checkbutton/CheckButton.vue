<!--  -->
<template>
  <div class="checkbutton" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style  scoped>
.checkbutton {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}
.checked {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
