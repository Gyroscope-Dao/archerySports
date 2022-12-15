<template>
  <div class="container">
    <!-- <h2>采购订单评价分析</h2> -->
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <!-- 搜索区域 -->
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="4" :sm="8">
            <a-form-item label="" :labelCol="{ span: 5 }" :wrapperCol="{ span: 10, offset: 1 }">
              供应商编号
              <a-input v-model="id" placeholder="请输入供应商编号"></a-input>
            </a-form-item>
          </a-col>
          <span style="overflow: hidden" class="table-page-search-submitButtons">
            <a-col :md="4" :sm="8">
              <a-button type="primary" @click="searchQuery" icon="search" style="margin: 30px 0 0 21px">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>
    <div class="main">
      <!-- 表格区域 -->
      <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
      <!-- echarts图 -->
      <div class="echart">
        <ECharts class="chart" :option="option1"></ECharts>
        <ECharts class="chart" :option="option2"></ECharts>
      </div>
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'

export default {
  data() {
    return {
      id: 1,
      // 表格数据源
      dataSource: [],
      // 表格横轴
      columns: [
        {
          title: '订单号',
          dataIndex: 'orderId',
          key: 'orderId',
        },
        {
          title: '供应商编号',
          dataIndex: 'firstSupplierId',
          key: 'firstSupplierId',
        },
        {
          title: '供应商名称',
          dataIndex: 'supplierName',
          key: 'supplierName',
        },
        {
          title: '供应商产品编号',
          dataIndex: 'productId',
          key: 'productId',
        },
        {
          title: '产品名称',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: '采购数量/件',
          dataIndex: 'purchaseQuantity',
          key: 'purchaseQuantity',
        },
        {
          title: '下单时间',
          dataIndex: 'purchaseTime',
          key: 'purchaseTime',
        },
        {
          title: '实际完成时间',
          dataIndex: 'deliveryDate',
          key: 'deliveryDate',
        },
      ],
      pagination: {
        current: 1,
        pageSize: 3,
        total: 6,
      },
      //  第一个饼图的数据
      data1: [],
      data2: [],
    }
  },
  computed: {
    option1() {
      return {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.data1,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
    },
    option2() {
      return {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.data2,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
    },
  },
  methods: {
    // 查询方法
    searchQuery() {
      this.getAllPurchaseOrders(id)
    },
    // 重置方法
    searchReset() {
      this.model = {}
    },
    // 获取所有的订单的数量
    getAllPurchaseOrders(id) {
      var url = '/purchaseorder/getAllPurchaseOrders'
      getAction(url, { supplyId: id }).then((res) => {
        res.result.forEach((e) => {
          this.dataSource.push({
            orderId: e.orderId,
            firstSupplierId: e.firstSupplierId,
            supplierName: e.supplierName,
            productId: e.productId,
            productName: e.productName,
            purchaseQuantity: e.purchaseQuantity,
            purchaseTime: e.purchaseTime,
            deliveryDate: e.deliveryDate,
          })
        })
        console.log(this.dataSource);
      })
    },
    // 获取已完成-未完成的订单第一个图：/getOrderIsFinish
    getOrderIsFinish() {
      var url = '/purchaseorder/getOrderIsFinish'
      getAction(url, { supplyId: 1 }).then((res) => {
        this.data1.push({ value: res.result.orderFinish, name: '已完成订单' })
        this.data1.push({ value: res.result.orderNotFinish, name: '未完成订单' })
      })
    },
    // 获取第二个图：/getSupplyProductRate
    getSupplyProductRate() {
      var url = '/purchaseorder/getSupplyProductRate'
      getAction(url, { supplyId: 1 }).then((res) => {
        res.result.forEach((e) => {
          // console.log(e);
          this.data2.push({ value: e.productRate, name: e.productName })
        })
      })
    },
  },
  mounted() {
    this.getAllPurchaseOrders(1)
    this.getOrderIsFinish()
    this.getSupplyProductRate()
  },
}
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  height: 95%;
  margin: 0.9375rem;
  padding: 1.25rem;
  background-color: #fff;
  .main {
    position: relative;
    .echart {
      position: absolute;
      bottom: -80%;
      left: 10%;
      display: flex;
      justify-content: center;
      .chart {
        width: 400px;
        height: 270px;
      }
    }
  }
}
</style>