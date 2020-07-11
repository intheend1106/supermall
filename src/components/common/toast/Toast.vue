<!--  -->
<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style  scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  color: #fff;
}
</style>
