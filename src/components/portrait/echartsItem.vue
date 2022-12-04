<template>
  <div class="item">
    <!-- 设置插槽 -->
    <slot></slot>
    <div class="item-footer"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.item {
  position: relative;
  height: 320px;
  border: 1px solid green;
  margin: 5px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    content: "";
  }
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    content: "";
  }
  .item-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
      content: "";
    }
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
      content: "";
    }
  }
}
</style>