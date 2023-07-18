<template>
  <div class="allPage">
    <h2>AAA质量分析</h2>
    <div class="Basis">
      <div class="rightbox">
        <div class="right1 right">
          <div class="panel panel_chart2">
            <h2>检验周期趋势</h2>
            <ECharts class="chartTwo" :option="InspectionCycle"></ECharts>
            <div class="panel_footer"></div>
          </div>
          <div class="panel panel_chart3">
            <h2>DDD周期趋势</h2>
            <ECharts class="chartThree" :option="buyCycle"></ECharts>
            <div class="panel_footer"></div>
          </div>
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
        <div class="right2 right">
          <div class="panel panel_chart2">
            <h2>ys周期趋势</h2>
            <ECharts class="chartTwo" :option="transCycle"></ECharts>
            <div class="panel_footer"></div>
          </div>
          <div class="panel panel_chart3">
            <h2>生产周期趋势</h2>
            <ECharts class="chartThree" :option="productCycle"></ECharts>
            <div class="panel_footer"></div>
          </div>
        </div>
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
      // 折线图数据
      dataInspectionCycle: [],
      // 柱状图数据
      dataDateBarChart: [],
      data: [{ name: '太原市', value: [112.46, 36.92, 4367] }],
    }
  },
  computed: {
    // 检验周期 InspectionCycle
    InspectionCycle() {
      return {
        xAxis: {
          type: 'category',
          data: ['A组', 'B组', 'C组', 'D组'],
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
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        series: [
          {
            data: this.dataInspectionCycle,
            type: 'line',
            lineStyle: {
              // 设置线条的style等
              normal: {
                color: '#BB2649', // 折线线条颜色:红色
              },
            },
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              normal: {
                color: '#BB2649',
              },
            },
          },
        ],
      }
    },
    // DDD周期 buyCycle
    buyCycle() {
      return {
        xAxis: {
          type: 'category',
          data: ['DDD周期', '生产周期', 'ys周期'],
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
            data: this.dataDateBarChart,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            itemStyle: {
              normal: {
                color: 'blue',
              },
            },
          },
        ],
      }
    },
    // ys周期 transCycle
    transCycle() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            lineStyle: {
              // 设置线条的style等
              normal: {
                color: 'green', // 折线线条颜色:红色
              },
            },
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              normal: {
                color: 'green',
              },
            },
          },
        ],
      }
    },
    // 生产周期 productCycle
    productCycle() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            lineStyle: {
              // 设置线条的style等
              normal: {
                color: '#1684b9', // 折线线条颜色:红色
              },
            },
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              normal: {
                color: '#1684b9',
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
    // 检验周期--折线图
    async getInspectionCycle() {
      var url = '/supplycycle/inspectionCycle'
      await getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        if (res.result.length != 0) {
          this.dataInspectionCycle.push(res.result[0].checkTimeA)
          this.dataInspectionCycle.push(res.result[0].checkTimeB)
          this.dataInspectionCycle.push(res.result[0].checkTimeC)
          this.dataInspectionCycle.push(res.result[0].checkTimeD)
        }
      })
    },
    // BBB质量--DDD，ys，生成--柱状图
    async getDateBarChart() {
      var url = '/supplycycle/getThreeCycle'
      await getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        const obj = res.result[0]
        if (res.result.length != 0) {
          for (let key in obj) {
            this.dataDateBarChart.push(obj[key])
          }
        }
      })
    },
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.china')) //这里是为了获得容器所在位置
    console.log(document.querySelector('.china'))
    this.query = this.$route.query
    // console.log(this.query)
    this.getInspectionCycle()
    this.getDateBarChart()
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
    .quality {
      cursor: pointer;
      color: #fff;
      text-align: center;
    }
    .rightbox {
      display: flex;
      .right1 {
        flex: 2;
      }
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
      .right2 {
        flex: 2;
      }
      .right {
        color: #fff;
        h2 {
          color: #fff;
          text-align: center;
        }
        .panel_chart2 {
          .chartTwo {
            height: 279px;
          }
        }
        .panel_chart3 {
          .chartThree {
            height: 279px;
          }
        }
      }
    }
  }
}
.panel {
  position: relative;
  // height: 100px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  padding: 10px;
  margin: 20px 30px 0 20px;
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