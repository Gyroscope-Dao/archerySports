<template>
  <div class="allPage">
    <h2>AAABBB周期</h2>
    <div class="Basis">
      <div class="panel actDesc">
        <ul class="details">
          <li class="tip"><span>是否一般AAA：</span>{{ dateData.battleneckSupplier === 1 ? '是' : '否' }}</li>
          <li class="tip"><span>是否生产瓶颈AAA：</span>{{ dateData.isProduct === 1 ? '是' : '否' }}</li>
          <li class="tip"><span>是否DDD瓶颈AAA：</span>{{ dateData.isPurchase === 1 ? '是' : '否' }}</li>
          <li class="tip">
            <span>重点EEE名称：</span>
            <span class="component" v-for="item in dateData.components" :key="item.componentName">{{
              item.componentName
            }}</span>
          </li>
          <li class="tip">
            <span>重点EEE现有量：</span>
            <span class="component" v-for="item in dateData.components" :key="item.componentName">{{
              item.stockQuantity
            }}</span>
          </li>
        </ul>
        <div class="panel_footer"></div>
      </div>
      <div class="mid">
        <ECharts class="china" :option="option" ref="myEchart"></ECharts>
        <!-- <Map></Map> -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="panel panel_chart">
        <h2>BBB周期详情</h2>
        <ECharts class="chartOne" :option="optionOne"></ECharts>
        <div class="panel_footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/portrait/china.js'
import * as echarts from 'echarts'
import { getAction } from '@/api/manage'

export default {
  data() {
    return {
      // 存放传递页面的参数
      query: null,
      // 基础信息
      basisData: null,
      //  组件数据
      productData: null,
      // BBB周期
      dateData: {
        battleneckSupplier: 0,
        isProduct: 0,
        isPurchase: 0,
      },
      // 柱状图周期y轴的值
      dateImgY: [],
      data: [
        { name: '太原市', value: [112.46, 36.92, 4367] },
      ],
    }
  },
  computed: {
    optionOne() {
      return {
        xAxis: {
          type: 'category',
          data: ['DDD周期', '检验周期', 'ys周期', '生产周期'],
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1,
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1,
            },
          },
        },
        tooltip: {
          // 鼠标悬浮提示框显示数据
          trigger: 'axis',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: {
            // 文字提示样式
            color: '#fff',
            fontSize: '12',
          },
          axisPointer: {
            // 坐标轴虚线
            type: 'none',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        series: [
          {
            barWidth: 39,
            data: this.dateImgY,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            itemStyle: {
              normal: {
                color: 'orange',
              },
            },
          },
        ],
      }
    },
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
          text: 'AAA地图分布',
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
    // 获取BBB周期
    getDateData() {
      var url = '/supplycycle/getDataOfSupplyCycle'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        console.log(res)
        // console.log( typeof(this.query.FirstSupplier));
        if (this.query.FirstSupplier == 1 && res.result.length != 0) {
          this.dateData = res.result[0]
          // console.log(this.dateData);
        } else {
          this.dateData = res.result
        }
        // if (res.result.length != 0) {
        //   this.dateData = res.result
        // }
      })
    },
    // 获取BBB周期详情-柱状图
    getDateImg() {
      var url = '/supplycycle/getDataOfSupplyCycleBarChart'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        console.log(res)
        if (this.query.FirstSupplier == 1) {
          this.dateImgY.push(res.result[0].productionCycle)
          this.dateImgY.push(res.result[0].purchaseLeadTime)
          this.dateImgY.push(res.result[0].transportTime)
          this.dateImgY.push(res.result[0].transportTimeDescription)
        } else {
          this.dateImgY.push(res.result.productionCycle)
          this.dateImgY.push(res.result.purchaseLeadTime)
          this.dateImgY.push(res.result.transportTime)
          this.dateImgY.push(res.result.transportTimeDescription)
        }
      })
    },
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.china')) //这里是为了获得容器所在位置
    console.log(document.querySelector('.china'))
    this.query = this.$route.query
    console.log(this.query)
    this.getDateData()
    this.getDateImg()
  },
}
</script>

<style lang="less" scoped>
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
  h2 {
    color: #fff;
    text-align: center;
    font-size: 24px;
  }
  .Basis {
    margin: 0 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    .mid {
      // background-color: aquamarine;
      position: relative;
      flex: 3;
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
    .actDesc {
      flex: 2;
      .details {
        margin-left: 20px;
        margin-bottom: 5px;
        .tip {
          margin: 10px 0 0 10px;
          font-size: 24px;
          span {
            color: #02a6b5;
          }
          .component {
            color: #fff;
            margin-right: 10px;
          }
        }
      }
    }

    .panel_chart {
      flex: 2;
      .chartOne {
        width: 500px;
        height: 300px;
      }
    }
  }
}
.panel {
  position: relative;
  // height: 100px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  padding: 20px;
  margin-left: 20px;
  margin-right: 30px;
  margin-top: 150px;
  margin-bottom: 100px;
  width: 500px;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
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
      bottom: 0;
      left: 0;
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
</style>