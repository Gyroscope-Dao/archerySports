<template>
  <div class="allPage" :class="{ mainOpacity: mainOpacity }">
    <header>
      <h1>供应商评分系统</h1>
    </header>
    <div class="container">
      <div class="left">
        <div class="panel panel_chart1">
          <h2>检验周期趋势</h2>
          <ECharts class="chart" :option="option1"></ECharts>
          <div class="panel_footer"></div>
        </div>
        <div class="panel panel_chart2">
          <h2>检验周期趋势</h2>
          <ECharts class="chart" :option="option1"></ECharts>
          <div class="panel_footer"></div>
        </div>
      </div>
      <div class="mid">
        <div class="score">
          <h2 class="score_title">供应商评价指数</h2>
          <h1 class="score_num">{{score}}</h1>
        </div>
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="end">
        <div class="panel panel_chart3">
          <h2>检验周期趋势</h2>
          <ECharts class="chart" :option="option2"></ECharts>
          <div class="panel_footer"></div>
        </div>
        <div class="panel panel_chart4">
          <h2>检验周期趋势</h2>
          <ECharts class="chart" :option="option2"></ECharts>
          <div class="panel_footer"></div>
        </div>
      </div>

      <!-- 右边透明
      <div class="tab" @click="popMenu"></div>
      选择菜单
      <div class="menu" v-if="showMenu">
        <div class="drawer-bootom-button" v-show="!disableSubmit">
          <div class="basis">
            <ul>
              <li><input type="checkbox" />供应商名称</li>
              <li><input type="checkbox" />联系人</li>
              <li><input type="checkbox" />联系电话</li>
              <li><input type="checkbox" />税号</li>
              <li><input type="checkbox" />法定代表人</li>
              <li><input type="checkbox" />开户银行名称</li>
              <li><input type="checkbox" />开户账号</li>
              <li><input type="checkbox" />往来单位信息id</li>
            </ul>
          </div>
          <div class="date"></div>
          <a-popconfirm title="确定放弃编辑？" @confirm="back" okText="确定" cancelText="取消">
            <a-button style="margin-right: 0.8rem">取消</a-button>
          </a-popconfirm>
          <a-button @click="back" type="primary" :loading="confirmLoading">确定</a-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
// import { color } from 'echarts'

export default {
  data() {
    return {
        // 评价分数
        score: 98,
      // 控制是否显示menu
      showMenu: false,
      // 控制是否全部透明
      mainOpacity: false,
      query: null,
      data1: null,
      data2: null,
      data3: null,
      data4: null,
    }
  },
  methods: {
    send() {
      console.log(this.data1, this.data2, this.data3, this.data4)
    },
    clear() {
      this.data1 = null
      this.data2 = null
      this.data3 = null
      this.data4 = null
    },
    // 弹出菜单
    popMenu() {
      this.showMenu = true
      this.mainOpacity = true
    },
    back() {
      this.showMenu = false
      this.mainOpacity = false
    },
  },
  computed: {
    optionOne() {
      return {
        xAxis: {
          type: 'category',
          data: ['采购周期', '检验周期', '运输周期', '生产周期'],
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
    //   return {
    //     xAxis: {
    //       type: 'category',
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',
    //           width: 1,
    //         },
    //       },
    //     },
    //     yAxis: {
    //       type: 'value',
    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',
    //           width: 1,
    //         },
    //       },
    //     },
    //     tooltip: {
    //       // 鼠标悬浮提示框显示数据
    //       trigger: 'axis',
    //       backgroundColor: 'rgba(32, 33, 36,.7)',
    //       borderColor: 'rgba(32, 33, 36,0.20)',
    //       borderWidth: 1,
    //       textStyle: {
    //         // 文字提示样式
    //         color: '#fff',
    //         fontSize: '12',
    //       },
    //       axisPointer: {
    //         // 坐标轴虚线
    //         type: 'none',
    //         label: {
    //           backgroundColor: '#6a7985',
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         data: [120, 200, 150, 80, 70, 110, 130],
    //         type: 'bar',
    //         showBackground: true,
    //         backgroundStyle: {
    //           color: 'rgba(180, 180, 180, 0.2)',
    //         },
    //       },
    //     ],
    //   }
    // },
    // optionThree() {
    //   return {
    //     tooltip: {
    //       trigger: 'axis',
    //     },
    //     legend: {
    //       data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    //       textStyle: {
    //         color: '#fff',
    //       },
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true,
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {},
    //       },
    //     },
    //     xAxis: {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',
    //           width: 1,
    //         },
    //       },
    //     },
    //     yAxis: {
    //       type: 'value',
    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',
    //           width: 1,
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: 'Email',
    //         type: 'line',
    //         stack: 'Total',
    //         data: [120, 132, 101, 134, 90, 230, 210],
    //       },
    //       {
    //         name: 'Union Ads',
    //         type: 'line',
    //         stack: 'Total',
    //         data: [220, 182, 191, 234, 290, 330, 310],
    //       },
    //       {
    //         name: 'Video Ads',
    //         type: 'line',
    //         stack: 'Total',
    //         data: [150, 232, 201, 154, 190, 330, 410],
    //       },
    //       {
    //         name: 'Direct',
    //         type: 'line',
    //         stack: 'Total',
    //         data: [320, 332, 301, 334, 390, 330, 320],
    //       },
    //       {
    //         name: 'Search Engine',
    //         type: 'line',
    //         stack: 'Total',
    //         data: [820, 932, 901, 934, 1290, 1330, 1320],
    //       },
    //     ],
    //   }
    // },

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
    // 柱状
    option1() {
      return {
        xAxis: {
          type: 'category',
          data: ['数据', '数据', '数据', '数据', '数据'],
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
            data: [10, 30, 20, 25, 35],
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
    // 折线
    option2() {
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
  },
  mounted() {},
  created() {
    this.query = this.$route.query
    console.log(this.query)
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
}
// 声明字体
@font-face {
  font-family: 'shuai';
  src: url('../../assets/fonts/DS-DIGIT.TTF');
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
.mainOpacity {
  opacity: 0.5;
}

.container {
  position: relative;
  min-width: 1200px;
  max-width: 2048px;
  height: 100%;
  margin: 0 auto;
  padding: 10px 10px 0;
  display: flex;
  .tab {
    width: 30px;
    height: 100%;
    right: 0;
    bottom: 0;
    position: absolute;
    opacity: 0.01;
  }
  .tab:hover {
    opacity: 0.6;
    background-color: #aaa;
  }
  .left {
    flex: 3;
    h2 {
      color: #fff;
      text-align: center;
    }
    .chart {
      height: 280px;
    }
  }
  .end {
    flex: 3;
    h2 {
      color: #fff;
      text-align: center;
    }
    .chart {
      height: 280px;
    }
  }
  .mid {
    margin: 0 10px;
    flex: 3;
    .score {
      width: 430px;
      height: 430px;
      //   border: 1px solid red;
      border-radius: 50%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .score_title {
        text-align: center;
        color: #09f8e0;
        font-size: 26px;
      }
      .score_num {
        text-align: center;
        color: #09f8e0;
        font-size: 100px;
        font-family: 'shuai';
      }
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
    position: relative;
    // height: 100px;
    border: 1px solid rgba(25, 186, 139, 0.17);
    padding: 4px;
    margin: 15px 0;
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
}
// 旋转动画
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
// 箭头旋转动画
@keyframes rotate2 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>