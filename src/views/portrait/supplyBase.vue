<template>
  <div class="allPage">
    <h2>AAA基本信息</h2>
    <div class="Basis">
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
      <div class="panel basisDesc1">
        <ul class="details">
          <li class="tip"><span>是否民营企业：</span>是</li>
          <li class="tip"><span>AAA的资质：</span>{{ basisData.certification }}</li>
          <li class="tip"><span>AAA地址：</span>{{ basisData.supplierAddress }}</li>
          <li class="tip"><span>CCC的物料：</span>{{ productData.productId }}</li>
          <li class="tip"><span>是否一级AAA：</span>{{ query.FirstSupplier === 1 ? '是' : '否' }}</li>
          <li class="tip"><span>成品库存：</span>{{ productData.productStock }}</li>
          <li class="tip"><span>生成批量：</span>{{ productData.productionLot }}</li>
          <li class="tip"><span>日均产量：</span>{{ productData.dayProLot }}</li>
          <li class="tip"><span>日最大生成量：</span>{{ productData.maxDayProLot }}</li>
        </ul>
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
      query: {
        FirstSupplier: 0
      },
      // 基础信息
      basisData: {
        supplierName: '暂时没有数据',
        contact: '暂时没有数据',
        contactNum: '暂时没有数据',
        taxId: '暂时没有数据',
        legalPerson: '暂时没有数据',
        bankName: '暂时没有数据',
        bankAccount: '暂时没有数据',
        eptId: '暂时没有数据',
        certification: '暂时没有数据',
        supplierAddress: '暂时没有数据',
      },
      //  组件数据
      productData: {
        productId: '暂时没有数据',
        productStock: '暂时没有数据',
        productionLot: '暂时没有数据',
        dayProLot: '暂时没有数据',
        maxDayProLot: '暂时没有数据',
      },
      data: [{ name: '太原市', value: [112.46, 36.92, 4367] }],
    }
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
    // 获取基本信息
    getBasis() {
      var url = '/portrayal/queryById'
      getAction(url, { id: this.query.id, FirstSupplier: this.query.FirstSupplier }).then((res) => {
        this.basisData = res.result
        this.productData = this.basisData.productList[0]
        console.log(res)
      })
    },
  },
  mounted() {
    console.log(document.querySelector('.china'))
    this.myChart = echarts.init(document.querySelector('.china')) //这里是为了获得容器所在位置
    this.query = this.$route.query
    // console.log(this.query)
    this.getBasis()
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
    // margin-top: 100px;
    color: #fff;
    display: flex;
    justify-content: center;
    // align-items: center;
    .details {
        flex: 2;
      margin-left: 20px;
      margin-bottom: 22px;
      .tip {
        margin: 10px 0 0 10px;
        font-size: 24px;
        span {
          color: #02a6b5;
        }
      }
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
        height: 80%;
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
  }
}
.panel {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
  padding: 20px;
  margin-left: 20px;
  margin-right: 30px;
  margin-top: 80px;
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