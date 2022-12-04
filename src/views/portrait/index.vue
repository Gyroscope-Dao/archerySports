<template>
  <div class="allPage">
    <header>
      <h1>大数据可视化平台</h1>
    </header>
    <div class="container">
      <!-- 主体左边 -->
      <div class="left">
        <echartsItem>
          <item1></item1>
        </echartsItem>
        <echartsItem>
          <item2></item2>
        </echartsItem>
      </div>
      <!-- 主体中间 -->
      <div class="mid">
        <mapItem></mapItem>
        <!-- <Map></Map> -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <!-- 主体右边 -->
      <div class="right">
        <echartsItem>
          <item3></item3>
        </echartsItem>
        <echartsItem>
          <!-- <item4></item4> -->
          <item5></item5>
        </echartsItem>
      </div>
    </div>
  </div>
</template>

<script>
import echartsItem from '@/components/portrait/echartsItem.vue'
import item1 from '@/components/portrait/item1.vue'
import item2 from '@/components/portrait/item2.vue'
import item3 from '@/components/portrait/item3.vue'
import item5 from '@/components/portrait/item5.vue'
import mapItem from '@/components/portrait/mapItem.vue'

export default {
  data() {
    return {}
  },
  components: {
    echartsItem,
    item1,
    item2,
    item3,
    item5,
    mapItem,
  },
  mounted() {},
}
</script>

<style lang='less' scoped>
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotate2 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
// 清空所有样式
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.allPage {
  background: url('../../assets/portrait/bg.jpg') center center no-repeat;
  height: 100%;
  width: 100%;
  background-size: 100%;
  background-attachment: fixed;
}

header {
  height: 50px;
  width: 100%;
  background-color: rgba(0, 0, 250, 0.1);
  text-align: center;
  line-height: 50px;
  h1 {
    color: #fff;
  }
}

.container {
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  padding: 10px 10px 0;
  display: flex;
  .left,
  .right {
    flex: 3;
  }
  .mid {
    // background-color: aquamarine;
    position: relative;
    flex: 5;
    height: 650px;
    padding: 10px;
    margin: 20px;
    .map {
      .map1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 430px;
        height: 430px;
        background: url('../../assets/portrait/map.png');
        background-size: 100%;
        opacity: 0.3;
      }
      .map2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 490px;
        height: 490px;
        background: url('../../assets/portrait/lbx.png');
        background-size: 100%;
        opacity: 0.6;
        animation: rotate1 15s linear infinite;
      }
      .map3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 470px;
        height: 470px;
        background: url('../../assets/portrait/jt.png');
        background-size: 100%;
        opacity: 0.6;
        animation: rotate2 10s linear infinite;
      }
    }
  }
}
</style>