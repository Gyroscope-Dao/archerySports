<template>
  <div class="allPage">
    <h2>供应商供货周期</h2>
    <div class="Basis">
      <div class="panel actDesc">
        <ul class="details">
          <li class="tip"><span>是否一般供应商：</span>{{ dateData.battleneckSupplier === 1 ? '是' : '否' }}</li>
          <li class="tip"><span>是否生产瓶颈供应商：</span>{{ dateData.isProduct === 1 ? '是' : '否' }}</li>
          <li class="tip"><span>是否采购瓶颈供应商：</span>{{ dateData.isPurchase === 1 ? '是' : '否' }}</li>
          <li class="tip">
            <span>重点部件名称：</span>
            <span class="component" v-for="item in dateData.components" :key="item.componentName">{{
              item.componentName
            }}</span>
          </li>
          <li class="tip">
            <span>重点部件现有量：</span>
            <span class="component" v-for="item in dateData.components" :key="item.componentName">{{
              item.stockQuantity
            }}</span>
          </li>
        </ul>
        <div class="panel_footer"></div>
      </div>
      <div class="panel panel_chart3">
        <h2>供货周期详情</h2>
        <ECharts class="chartOne" :option="optionOne"></ECharts>
        <div class="panel_footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
      // 供货周期
      dateData: {
        battleneckSupplier: 0,
        isProduct: 0,
        isPurchase: 0,
      },
      // 柱状图周期y轴的值
      dateImgY: [],
    }
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
  },
  methods: {
    // 获取供货周期
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
    // 获取供货周期详情-柱状图
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
    .details {
      margin-left: 90px;
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
    .chartOne {
      width: 500px;
      height: 300px;
    }
  }
}
.panel {
  position: relative;
  // height: 100px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  padding: 20px;
  margin-right: 30px;
  margin-top: 150px;
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