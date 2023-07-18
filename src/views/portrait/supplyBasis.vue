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
    }
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
    
    console.log(document.querySelector('.allPage'));
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
    margin-top: 100px;
    color: #fff;
    display: flex;
    justify-content: center;
    // align-items: center;
    .details {
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
  }
}
.panel {
  position: relative;
  // height: 100px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  padding: 20px;
  margin-right: 30px;
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