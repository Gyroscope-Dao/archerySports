<template>
  <div class="allPage">
    <header>
      <h1>供应商画像详细信息</h1>
    </header>
    <div class="container">
      <div class="left">
        <h2>基本信息</h2>
        <div class="panel basisDesc">
          <div class="details">
            <div class="tip"><span>供应商名称：</span>{{ basisData.bankName }}</div>
            <!-- <div class="tip"><span>供应商简称：</span>{{ basisData.supplierSimpleName }}</div> -->
            <div class="tip"><span>法定代表人：</span>{{ basisData.legalPerson }}</div>
            <div class="tip"><span>邮编：</span>{{ basisData.bankName }}</div>
            <div class="tip"><span>成立年份：</span>{{ basisData.postCode }}</div>
            <div class="tip"><span>联系人：</span>{{ basisData.contact }}</div>
            <div class="tip"><span>联系电话：</span>{{ basisData.contactNum }}</div>
            <!-- <div class="tip"><span>税号：</span>{{ basisData.taxId }}</div> -->
            <!-- <div class="tip"><span>位置信息：</span>{{ basisData.bankName }}</div> -->
          </div>

          <div class="panel_footer"></div>
        </div>
        <!-- <div class="panel panel_chart1">
          <h2>供应商产品响应时长分析</h2>
          <ECharts class="chart1" :option="option1"></ECharts>
          <div class="panel_footer"></div>
        </div> -->
        <div class="panel basisDesc1">
          <div class="details">
            <div class="tip"><span>是否民营企业：</span>是</div>
            <div class="tip"><span>供应商的资质：</span>xxxxxx</div>
            <div class="tip"><span>供应商地址：</span>xxxxxx</div>
            <div class="tip"><span>供应的产品：</span>xxxxxx</div>
            <div class="tip"><span>是否一级供应商：</span>xxxxxx</div>
            <div class="tip"><span>供货比例：</span>xxxxxx</div>
            <div class="tip"><span>成品库存：</span>xxxxxx</div>
            <div class="tip"><span>生成批量：</span>xxxxxx</div>
            <div class="tip"><span>日均产量：</span>xxxxxx</div>
            <div class="tip"><span>日最大生成量：</span>xxxxxx</div>
          </div>
          <div class="panel_footer"></div>
        </div>
      </div>
      <div class="mid">
        <h2>供货周期</h2>
        <div class="panel actDesc">
          <div class="details">
            <div class="tip"><span>是否一般供应商：</span>{{query.isFrist? '是':'否'}}</div>
            <div class="tip"><span>生产瓶颈供应商：</span>XX</div>
            <div class="tip"><span>采购瓶颈供应商：</span>XX</div>
            <div class="tip"><span>重点部件名称：</span>XX</div>
            <div class="tip"><span>重点部件现有量：</span>XX</div>
          </div>
          <div class="panel_footer"></div>
        </div>
        <div class="panel panel_chart3">
          <h2>供货周期详情</h2>
          <ECharts class="chartOne" :option="optionOne"></ECharts>
          <div class="panel_footer"></div>
        </div>
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="right">
        <h2>供货质量</h2>
        <div class="panel panel_chart2">
          <h2>供货产品质量</h2>
          <ECharts class="chartTwo" :option="optionTwo"></ECharts>
          <div class="panel_footer"></div>
        </div>
        <div class="panel panel_chart3">
          <h2>供货产品趋势分析</h2>
          <ECharts class="chartThree" :option="optionThree"></ECharts>
          <div class="panel_footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
import { color } from 'echarts'

export default {
  data() {
    return {
      query: null,
      basisData: {
        bankName: '',
        supplierSimpleName: '',
        legalPerson: '',
        postCode: '',
        estabYear: '',
        contact: '',
        contactNum: '',
        taxId: '',
      },
    }
  },
  methods: {
    hello() {
      var url = '/firstSupplierInf/firstSupplierInf/queryById'
      getAction(url, { id: '1597538842468958209' }).then((res) => {
        this.basisData = res.result
        // console.log(this.basisData)
      })
    },
  },
  computed: {
    // 雷达图
    // option1() {
    //   return {
    //     legend: {
    //       data: ['供应商1'],
    //       textStyle: {
    //         color: '#fff',
    //       },
    //     },
    //     radar: {
    //       center: ['50%', '60%'],
    //       //   shape: 'circle',
    //       indicator: [
    //         { name: '生成周期', max: 6500 },
    //         { name: '物流周期', max: 16000 },
    //         { name: '合格率', max: 30000 },
    //         { name: '军检时间', max: 38000 },
    //         { name: '供货周期', max: 52000 },
    //         { name: '采购提前期/天', max: 25000 },
    //       ],
    //     },
    //     color: {
    //       type: 'linear',
    //       x: 0,
    //       y: 0,
    //       x2: 0,
    //       y2: 1,
    //       colorStops: [
    //         {
    //           offset: 0,
    //           color: '#9EE081', // 0% 处的颜色
    //         },
    //         {
    //           offset: 1,
    //           color: '#9EE081', // 100% 处的颜色
    //         },
    //       ],
    //       global: false, // 缺省为 false
    //     },
    //     series: [
    //       {
    //         type: 'radar',
    //         data: [
    //           {
    //             value: [4200, 3000, 20000, 35000, 50000, 18000],
    //             name: '供应商1',
    //           },
    //         ],
    //         itemStyle: {
    //           // 折线拐点标志的样式。
    //           emphasis: {
    //             // 高亮时的样式
    //             focus: 'self',
    //           },
    //         },
    //         label: {
    //           // 单个拐点文本的样式设置
    //           normal: {
    //             show: true,
    //             // 单个拐点文本的样式设置。[ default: false ]
    //             position: 'top',
    //             // 标签的位置。[ default: top ]
    //             distance: 5,
    //             // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
    //             color: '#aaa',
    //             // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
    //             fontSize: 10,
    //             // 文字的字体大小
    //           },
    //         },
    //       },
    //     ],
    //   }
    // },
    // // 饼图
    // option2() {
    //   return {
    //     legend: {
    //       top: 'bottom',
    //       textStyle: {
    //         color: '#fff',
    //       },
    //     },
    //     // 提示框
    //     tooltip: {
    //       show: true,
    //     },
    //     series: [
    //       {
    //         type: 'pie',
    //         data: [
    //           { value: 1048, name: '好评' },
    //           { value: 735, name: '中评' },
    //           { value: 580, name: '差评' },
    //         ],
    //         radius: [10, 100],
    //         center: ['50%', '45%'],
    //         // roseType: "area",
    //         itemStyle: {
    //           borderRadius: 10,
    //         },
    //       },
    //     ],
    //   }
    // },
    optionOne() {
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
            data: [120, 200, 150, 80, 70, 110, 130],
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
    optionTwo() {
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
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
          },
        ],
      }
    },
    optionThree() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      }
    },
  },
  mounted() {
    this.hello()
    this.query = this.$route.query
    console.log(this.query);
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

.container {
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  padding: 10px 10px 0;
  display: flex;
  .left {
    flex: 3;
    color: #fff;
    h2 {
      color: #fff;
      text-align: center;
    }
    .details {
      margin-left: 20px;
      margin-bottom: 5px;
      .tip {
        span {
          color: #02a6b5;
        }
        margin: 10px 0 0 10px;
        font-size: 16px;
      }
    }
    .panel_chart1 {
      .chart1 {
        height: 270px;
      }
    }
  }
  .right {
    flex: 3;
    color: #fff;
    h2 {
      color: #fff;
      text-align: center;
    }
    .panel_chart2 {
      .chartTwo {
        height: 280px;
      }
    }
    .panel_chart3 {
      .chartThree {
        height: 280px;
      }
    }
  }

  .mid {
    position: relative;
    margin: 0 10px;
    flex: 3;
    flex: 3;
    color: #fff;
    h2 {
      color: #fff;
      text-align: center;
    }
    .details {
      margin-left: 20px;
      margin-bottom: 5px;
      .tip {
        span {
          color: #02a6b5;
        }
        margin: 10px 0 0 10px;
        font-size: 16px;
      }
    }
    .chartOne {
      height: 400px;
      z-index: 999;
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
    padding: 0.25rem;
    margin: 0.25rem;
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