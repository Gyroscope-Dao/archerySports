<template>
  <div class="allPage">
    <header>
      <h1>大数据可视化平台</h1>
    </header>
    <div class="container">
      <!-- 主体左边 -->
      <!-- <div class="left">
        <echartsItem>
          <item1></item1>
        </echartsItem>
        <echartsItem>
          <item2></item2>
        </echartsItem>
      </div> -->
      <!-- 主体中间 -->
      <div class="mid">
        <ECharts class="china" :option="option" ref="myEchart"></ECharts>
        <!-- <Map></Map> -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <!-- 主体右边 -->
      <!-- <div class="right">
        <echartsItem>
          <item3></item3>
        </echartsItem>
        <echartsItem>
          <item5></item5>
        </echartsItem>
      </div> -->
      <div class="right">
        <div class="panel">
          <h2 class="supplyShow">供应商列表展示</h2>
          <h3>一级</h3>
          <ul class="supplyList" v-if="haveFirstList">
            <li v-for="item in firstList" :key="item.id">
              <div class="top">
                <span>{{ item.supplierName }}</span>
                <button class="btn" @click="look(item.id, item.isFirstSupply)"><span>供应商画像</span></button>
                <button class="btn" @click="lookScore(item.id, item.isFirstSupply)"><span>评价</span></button>
              </div>
              <div class="bottom">{{ item.supplierAddress }}</div>
            </li>
          </ul>
          <h2 class="noSupply" v-else>该地区没有一级供应商!</h2>
          <h3>二级</h3>
          <ul class="supplyList" v-if="haveSecondList">
            <li v-for="item in secondList" :key="item.id">
              <div class="top">
                <span>{{ item.supplierName }}</span>
                <button class="btn" @click="look(item.id, item.isFirstSupply)"><span>供应商画像</span></button>
                <button class="btn" @click="lookScore(item.id, item.isFirstSupply)"><span>评价</span></button>
              </div>
              <div class="bottom">{{ item.supplierAddress }}</div>
            </li>
          </ul>
          <h2 class="noSupply" v-else>该地区没有二级供应商!</h2>
          <div class="panel_footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/portrait/china.js'
import * as echarts from 'echarts'
import echartsItem from '@/components/portrait/echartsItem.vue'
import item1 from '@/components/portrait/item1.vue'
import item2 from '@/components/portrait/item2.vue'
import item3 from '@/components/portrait/item3.vue'
import item5 from '@/components/portrait/item5.vue'
import mapItem from '@/components/portrait/mapItem.vue'
import { getAction } from '@/api/manage'

export default {
  data() {
    return {
      haveFirstList: false,
      haveSecondList: false,
      firstList: null,
      secondList: null,
      data: [
        { name: '北京', value: [116.46, 39.92, 4367], id: '1597538842468958209', FirstSupplier: true },
        { name: '上海', value: [121.48, 31.22, 8675], id: '1593837632480722946', FirstSupplier: true },
        { name: '深圳', value: [114.07, 22.62, 2461], id: '789123456' },
        { name: '西安', value: [108.45, 34, 3421], id: '23456789' },
        { name: '广州', value: [113.23, 23.16, 187], id: '3456789' },
      ],
    }
  },
  components: {
    echartsItem,
    item1,
    item2,
    item3,
    item5,
    mapItem,
  },
  computed: {
    option() {
      return {
        geo: {
          map: 'china',
          itemStyle: {
            areaColor: '#0099ff',
            borderColor: '#00ffff',
            shadowColod: 'rgba(230,130,70, 0.1)',
            shadowBlur: 30,
          },
        },
        title: {
          text: '供应商地图分布',
          left: '45%',
          textStyle: {
            color: '#fff',
            fontSize: 20,
            textShadowBlur: 10,
            textShadowColor: '#33ffff',
          },
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          type: 'continuous',
          min: 100,
          max: 5000,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d'],
          },
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            type: 'scatter',
            itemStyle: {
              color: 'red',
            },
            coordinateSystem: 'geo',
            data: this.data,
          },
        ],
      }
    },
  },
  methods: {
    lookScore(id, isFirstSupply) {
      let routeData = this.$router.resolve({
        path: '/portrait/score',
        query: {
          id: id,
          FirstSupplier: isFirstSupply,
        },
      })
      window.open(routeData.href, '_blank')
    },
    look(id, isFirstSupply) {
      let routeData = this.$router.resolve({
        path: '/portrait/supply',
        query: {
          id: id,
          FirstSupplier: isFirstSupply,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 获取一级供应商
    getFirstSupply(name) {
      var url = '/supply/getFirstSupply'
      getAction(url, { supplierAddress: name }).then((res) => {
        if (res.result.length != 0) {
          this.haveFirstList = true
          this.firstList = res.result
        } else {
          this.haveFirstList = false
          this.firstList = []
        }
        // console.log(this.firstList);
      })
    },
    // 获取二级供应商
    getSecondSupply(name) {
      var url = '/supply/getSecondSupply'
      getAction(url, { supplierAddress: name }).then((res) => {
        // console.log(this.secondList)
        if (res.result.length != 0) {
          this.haveSecondList = true
          this.secondList = res.result
        } else {
          this.haveSecondList = false
          this.secondList = []
        }
      })
    },
    // 点击地图事件
    bindClick() {
      const _this = this
      _this.getFirstSupply('山西')
      _this.getSecondSupply('山西')
      // this.myChart.off('click')
      this.myChart.on('click', function (res) {
        // console.log(res.name)
        _this.getFirstSupply(res.name)
        _this.getSecondSupply(res.name)
        // if (res.componentSubType === 'scatter') {
        //   let routeData = _this.$router.resolve({
        //     path: '/portrait/supply',
        //     query: {
        //       id: res.data.id,
        //       FirstSupplier: res.data.FirstSupplier,
        //     },
        //   })
        //   window.open(routeData.href, '_blank')
        // }
      })
    },
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.china')) //这里是为了获得容器所在位置
    this.bindClick()
  },
}
</script>

<style lang='less' scoped>
@font-face {
  font-family: 'shuai';
  src: url('../../assets/fonts/DS-DIGIT.TTF');
}
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
    height: 600px;

    // 左边两图时候的flex
    // flex: 3;
    flex: 2;
    .supplyShow {
      color: #fff;
      text-align: center;
    }
    h3 {
      color: #fff;
      margin-left: 20px;
      font-size: 20px;
    }
    .supplyList {
      color: #fff;
      margin-left: 20px;
      .top {
        span {
          color: #02a6b5;
          margin-right: 20px;
        }
        .btn {
          cursor: pointer;
          padding: 0 10px;
          margin-right: 10px;
          background-color: orange;
          // opacity: 0.6;
          border-radius: 5px;
          span {
            margin: 0;
            color: #fff;
          }
        }
      }
    }
    .noSupply {
      color: #02a6b5;
      margin-left: 20px;
    }
  }
  .mid {
    // background-color: aquamarine;
    position: relative;
    flex: 6;
    height: 650px;
    padding: 10px;
    margin: 20px;
    .china {
      z-index: 999;
      width: 100%;
      height: 95%;
    }
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
  .panel {
    overflow: auto;
    overflow-x: hidden;
    height: 99%;
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    padding: 4px;
    margin: 4px;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
      content: '';
    }
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
      content: '';
    }
    .panel_footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
        content: '';
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
        content: '';
      }
    }
  }
}
</style>