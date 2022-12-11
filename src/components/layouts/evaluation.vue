<template>
  <div class="allpage">
    <div class="topNav">供应商评价分析管理</div>
    <div class="main">
      <div class="leftNav">
        <div class="navItem" :class="{ currentItem: currentIndex == 1 }" @click="toNav1">供应商评价</div>
        <div class="navItem" :class="{ currentItem: currentIndex == 2 }" @click="toNav2">供应商订单评价</div>
        <div class="navItem" :class="{ currentItem: currentIndex == 3 }" @click="toNav3">一级供应商周期评价</div>
        <div class="navItem" :class="{ currentItem: currentIndex == 4 }" @click="toNav4">二级供应商周期评价</div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
    }
  },
  methods: {
    toNav1() {
      this.currentIndex = 1
      this.$router.push({ path: 'index' })
      console.log('1')
    },
    toNav2() {
      this.currentIndex = 2
      console.log('2')
      this.$router.push({ path: 'order' })
    },
    toNav3() {
      this.currentIndex = 3
      this.$router.push({ path: 'firstCycle' })
      console.log('3')
    },
    toNav4() {
      this.currentIndex = 4

      this.$router.push({ path: 'secondCycle' })
      console.log('4')
    },
  },
}
</script>

<style lang='less' scoped>
.allpage {
  height: 100%;
  background-color: #edeff2;
  .topNav {
    display: flex;
    height: 8%;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background-color: #1890ff;
  }
  .main {
    height: 92%;
    display: flex;
    .leftNav {
      height: 100%;
      width: 14rem;
      background-color: #fff;
      text-align: left;
      .navItem {
        height: 50px;
        line-height: 50px;
        width: 100%;
        cursor: pointer;
        padding-left: 2rem;
        font-size: 1rem;
      }
      .navItem:hover {
        background-color: #f2f2f2;
      }
      .currentItem {
        color: #1890ff;
      }
    }
    .content {
      width: 83%;
    }
  }
}
</style>