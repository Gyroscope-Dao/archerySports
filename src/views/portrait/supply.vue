<template>
  <div class="allPage" :class="{ mainOpacity: mainOpacity }">
    <header>
      <h1>供应商画像详细信息</h1>
    </header>
    <div class="container">
      <div class="left">
        <h2>基本信息</h2>
        <div class="panel basisDesc">
          <div class="details">
            <div class="tip"><span>供应商名称：</span>{{ basisData.supplierName }}</div>
            <div class="tip"><span>联系人：</span>{{ basisData.contact }}</div>
            <div class="tip"><span>联系电话：</span>{{ basisData.contactNum }}</div>
            <div class="tip"><span>税号：</span>{{ basisData.taxId }}</div>
            <div class="tip"><span>法定代表人：</span>{{ basisData.legalPerson }}</div>
            <div class="tip"><span>开户银行名称：</span>{{ basisData.bankName }}</div>
            <div class="tip"><span>开户账号：</span>{{ basisData.bankAccount }}</div>
            <div class="tip"><span>往来单位信息id：</span>{{ basisData.eptId }}</div>
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
            <div class="tip"><span>供应商的资质：</span>{{ basisData.certification }}</div>
            <div class="tip"><span>供应商地址：</span>{{ basisData.supplierAddress }}</div>
            <div class="tip"><span>供应的产品：</span>{{ productData.productId }}</div>
            <div class="tip"><span>是否一级供应商：</span>{{ query.FirstSupplier ? '是' : '否' }}</div>
            <!-- <div class="tip"><span>供货比例：</span>{{basisData}}</div> -->
            <div class="tip"><span>成品库存：</span>{{ productData.productStock }}</div>
            <div class="tip"><span>生成批量：</span>{{ productData.productionLot }}</div>
            <div class="tip"><span>日均产量：</span>{{ productData.dayProLot }}</div>
            <div class="tip"><span>日最大生成量：</span>{{ productData.maxDayProLot }}</div>
          </div>
          <div class="panel_footer"></div>
        </div>
      </div>
      <div class="mid">
        <h2>供货周期</h2>
        <div class="panel actDesc">
          <div class="details">
            <div class="tip"><span>是否一般供应商：</span>{{ dateData.battleneckSupplier == 1 ? '是' : '否' }}</div>
            <div class="tip"><span>是否生产瓶颈供应商：</span>{{ dateData.isProduct == 1 ? '是' : '否' }}</div>
            <div class="tip"><span>是否采购瓶颈供应商：</span>{{ dateData.isPurchase == 1 ? '是' : '否' }}</div>
            <div class="tip">
              <span>重点部件名称：</span>
              <span class="component" v-for="item in dateData.components" :key="item.componentName">{{
                item.componentName
              }}</span>
            </div>
            <div class="tip">
              <span>重点部件现有量：</span>
              <span class="component" v-for="item in dateData.components" :key="item.componentName">{{
                item.stockQuantity
              }}</span>
            </div>
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
      <!-- 右边透明 -->
      <div class="tab" @click="popMenu"></div>
      <!-- 选择菜单 -->
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
              <li><input type="checkbox" />开户账号 </li>
              <li><input type="checkbox" />往来单位信息id</li>
            </ul>
          </div>
          <div class="date"></div>
          <a-popconfirm title="确定放弃编辑？" @confirm="back" okText="确定" cancelText="取消">
            <a-button style="margin-right: 0.8rem">取消</a-button>
          </a-popconfirm>
          <a-button @click="back" type="primary" :loading="confirmLoading">确定</a-button>
        </div>
      </div>
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
      // 供货周期
      dateData: {},
      dateImgY: [],
      // 柱状图周期y轴的值
    }
  },
  methods: {
    // 获取基本信息
    getBasis() {
      var url = '/portrayal/queryById'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        this.basisData = res.result
        this.productData = this.basisData.productList[0]
        console.log(res.result);
      })
    },
    // 获取供货周期
    getDateData() {
      var url = '/supplycycle/getDataOfSupplyCycle'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        this.dateData = res.result[0]
      })
    },
    // 获取供货周期详情
    getDateImg() {
      var url = '/supplycycle/getDataOfSupplyCycleBarChart'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        this.dateImgY.push(res.result[0].productionCycle)
        this.dateImgY.push(res.result[0].purchaseLeadTime)
        this.dateImgY.push(res.result[0].transportTime)
        this.dateImgY.push(res.result[0].transportTimeDescription)
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
    this.getBasis()
    this.getDateData()
    this.getDateImg()
  },
  created() {
    this.query = this.$route.query
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