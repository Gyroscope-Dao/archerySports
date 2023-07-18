<template>
  <div class="allPage" :class="{ mainOpacity: mainOpacity }">
    <header>
      <h1>
        
      </h1>
    </header>
    <div class="container">
      <div class="left">
        <h2 @click="toBase">基本信息</h2>
        <div class="panel basisDesc">
          <ul class="details">
            <li class="tip"><span>AAA名称：</span>{{ basisData.supplierName }}</li>
            <li class="tip"><span>联系人：</span>{{ basisData.contact }}</li>
            <li class="tip"><span>联系电话：</span>{{ basisData.contactNum }}</li>
            <li class="tip"><span>税号：</span>{{ basisData.taxId }}</li>
            <li class="tip"><span>法定代表人：</span>{{ basisData.legalPerson }}</li>
            <li class="tip"><span>开户银行名称：</span>{{ basisData.bankName }}</li>
            <li class="tip"><span>开户账号：</span>{{ basisData.bankAccount }}</li>
            <li class="tip"><span>往来单位信息id：</span>{{ basisData.eptId }}</li>
            <!-- <div class="tip"><span>位置信息：</span>{{ basisData.bankName }}</div> -->
          </ul>

          <div class="panel_footer"></div>
        </div>
        <!-- <div class="panel panel_chart1">
          <h2>AAA物料响应时长分析</h2>
          <ECharts class="chart1" :option="option1"></ECharts>
          <div class="panel_footer"></div>
        </div> -->
        <div class="panel basisDesc1">
          <ul class="details">
            <li class="tip"><span>是否民营企业：</span>是</li>
            <li class="tip"><span>AAA的资质：</span>{{ basisData.certification }}</li>
            <li class="tip"><span>AAA地址：</span>{{ basisData.supplierAddress }}</li>
            <li class="tip"><span>CCC的物料：</span>{{ productData.productId }}</li>
            <li class="tip"><span>是否一级AAA：</span>{{ query.FirstSupplier === 1 ? '是' : '否' }}</li>
            <!-- <li class="tip"><span>BBB比例：</span>{{basisData}}</li> -->
            <li class="tip"><span>成品库存：</span>{{ productData.productStock }}</li>
            <li class="tip"><span>生成批量：</span>{{ productData.productionLot }}</li>
            <li class="tip"><span>日均产量：</span>{{ productData.dayProLot }}</li>
            <li class="tip"><span>日最大生成量：</span>{{ productData.maxDayProLot }}</li>
          </ul>
          <div class="panel_footer"></div>
        </div>
      </div>
      <div class="mid">
        <h2 @click="toCycle">BBB周期</h2>
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
        <div class="panel panel_chart3">
          <h2>BBB周期详情</h2>
          <ECharts class="chartOne" :option="optionOne"></ECharts>
          <div class="panel_footer"></div>
        </div>
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="end">
        <h2 class="quality" @click="toQuality">BBB质量</h2>
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

      <!-- 右边透明
      <div class="tab" @click="popMenu"></div>
      选择菜单
      <div class="menu" v-if="showMenu">
        <div class="drawer-bootom-button" v-show="!disableSubmit">
          <div class="basis">
            <ul>
              <li><input type="checkbox" />AAA名称</li>
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
      // 控制是否显示menu
      showMenu: false,
      // 控制是否全部透明
      mainOpacity: false,
      query: null,
      // 基本信息上边
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
      // 下边基本信息
      productData: {},
      // BBB周期
      dateData: {
        battleneckSupplier: 0,
        isProduct: 0,
        isPurchase: 0,
      },
      // 柱状图周期y轴的值
      dateImgY: [],
      // 折线图
      dataInspectionCycle: [],
      dataDateBarChart: [],
    }
  },
  methods: {
    // 跳转到显示质量的页面
    toQuality() {
      let routeData = this.$router.resolve({
        path: '/portrait/supplyQuality',
        query: {
          id: this.query.id,
          FirstSupplier: this.query.FirstSupplier,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 跳转到显示周期的页面
    toCycle() {
      let routeData = this.$router.resolve({
        path: '/portrait/supplyCycle',
        query: {
          id: this.query.id,
          FirstSupplier: this.query.FirstSupplier,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 跳转到显示基础信息的页面
    toBasis() {
      let routeData = this.$router.resolve({
        path: '/portrait/supplyBasis',
        query: {
          id: this.query.id,
          FirstSupplier: this.query.FirstSupplier,
        },
      })
      window.open(routeData.href, '_blank')
    },
    toBase() {
      let routeData = this.$router.resolve({
        path: '/portrait/supplyBase',
        query: {
          id: this.query.id,
          FirstSupplier: this.query.FirstSupplier,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 获取基本信息
    getBasis() {
      var url = '/portrayal/queryById'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        this.basisData = res.result
        this.productData = this.basisData.productList[0]
        // console.log(res)
      })
    },
    // 获取BBB周期
    getDateData() {
      var url = '/supplycycle/getDataOfSupplyCycle'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        // console.log(res)
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
    // 检验周期--折线图
    getInspectionCycle() {
      var url = '/supplycycle/inspectionCycle'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        if (res.result.length != 0) {
          this.dataInspectionCycle.push(res.result[0].checkTimeA)
          this.dataInspectionCycle.push(res.result[0].checkTimeB)
          this.dataInspectionCycle.push(res.result[0].checkTimeC)
          this.dataInspectionCycle.push(res.result[0].checkTimeD)
        }
      })
    },
    // BBB质量--DDD，ys，生成--柱状图
    getDateBarChart() {
      var url = '/supplycycle/getThreeCycle'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        const obj = res.result[0]
        if (res.result.length != 0) {
          for (let key in obj) {
            this.dataDateBarChart.push(obj[key])
          }
        }
      })
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
    // optionTwo() {
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
  },
  mounted() {
    this.getDateData()

    if (this.query.FirstSupplier === 1) {
      this.getDateData()
    }
    // console.log(this.query.FirstSupplier);
    this.getBasis()
    this.getDateImg()
    this.getInspectionCycle()
    this.getDateBarChart()
  },
  created() {
    this.query = this.$route.query
    console.log(this.$route.query)
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
    color: #fff;
    h2 {
      cursor: pointer;
      color: #fff;
      text-align: center;
    }
    .details {
      overflow: hidden;
      margin-left: 20px;
      margin-bottom: 22px;
      .tip {
        span {
          color: #02a6b5;
        }
        margin: 10px 0 0 10px;
        font-size: 16px;
      }
    }
  }
  .end {
    flex: 6;
    .quality {
      cursor: pointer;
      color: #fff;
      text-align: center;
    }
    .rightbox {
      display: flex;
      .right1 {
        flex: 1;
      }
      .right2 {
        flex: 1;
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

  .mid {
    position: relative;
    margin: 0 10px;
    flex: 3;
    color: #fff;
    h2 {
      cursor: pointer;
      color: #fff;
      text-align: center;
    }
    .details {
      margin-left: 10px;
      margin-bottom: 5px;
      .tip {
        margin: 10px 0 0 10px;
        font-size: 16px;
        span {
          color: #02a6b5;
        }
        .component {
          color: #fff;
          margin-right: 10px;
        }
      }
    }
    .chartOne {
      height: 415px;
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
    padding: 4px;
    margin: 4px;
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
  .menu {
    position: absolute;
    width: 360px;
    height: 100%;
    right: 0;
    bottom: 0;
    background-color: #fff;
    padding: 30px;
    ul {
      list-style: none;
    }
  }
}
// // 旋转动画
// @keyframes rotate1 {
//   from {
//     transform: translate(-50%, -50%) rotate(0deg);
//   }
//   to {
//     transform: translate(-50%, -50%) rotate(360deg);
//   }
// }
// // 箭头旋转动画
// @keyframes rotate2 {
//   from {
//     transform: translate(-50%, -50%) rotate(0deg);
//   }
//   to {
//     transform: translate(-50%, -50%) rotate(-360deg);
//   }
// }
</style>