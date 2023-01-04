<template>
  <div class="container">
    <!-- <h2>供应商订单响应时长分析</h2> -->
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <!-- 搜索区域 -->
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="4" :sm="8">
            <a-form-model-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 10, offset: 1 }" prop="infUpdateTime">
              <span>开始日期</span>
              <j-date v-model="model.startTime" placeholder="请选择开始时间" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <a-form-model-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 10, offset: 1 }" prop="infUpdateTime">
              结束日期
              <j-date v-model="model.endTime" placeholder="请选择结束时间" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <a-form-item label="" :labelCol="{ span: 5 }" :wrapperCol="{ span: 10, offset: 1 }">
              供应商编号
              <a-input v-model="model.supplyId" placeholder="请输入供应商编号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <a-form-item label="" :labelCol="{ span: 5 }" :wrapperCol="{ span: 10, offset: 1 }">
              产品编号
              <a-input v-model="model.productId" placeholder="请输入产品编号"></a-input> </a-form-item
          ></a-col>
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
      <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination"  @change="handleTableChange"/>
      <!-- echarts图 -->
      <div class="echart">
        <ECharts class="chart" :option="option"></ECharts>
      </div>
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'

export default {
  data() {
    return {
      model: {},
      dataX:['面包','火腿肠','方便面','干脆面'],
      dataY:[200,300,600,500],
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
        total: 1,
      },
    }
  },
  computed: {
    option() {
      return {
        xAxis: {
          type: 'category',
          data: this.dataX,
          axisLine: {
            lineStyle: {
              width: 1,
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              width: 1,
            },
          },
        },
        series: [
          {
            data: this.dataY,
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
  methods: {
    // 查询方法
    searchQuery() {
      this.req(this.model)
    },
    // 重置方法
    searchReset() {
      this.model = {}
    },
    // 分页
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    req(obj) {
      /* 
        startDate: '2022-12-01',
        endDate: '2022-12-20',
        supplyId: '1',
        productId: 'P20221206122284',
      */
      var url = '/orderresponse/getOrderResponse'
      getAction(url, {
        startDate: obj.startTime,
        endDate: obj.endTime,
        supplyId: obj.supplyId,
        productId: obj.productId,
      }).then((res) => {
        console.log(res.result);
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
        res.result.forEach((e)=>{
          this.dataX = []
          this.dataY = []
          this.dataX.push(e.productName)
          this.dataY.push(e.purchaseQuantity)
        })
      })
        
    },
  },
  mounted() {
    // this.req(this.start)
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
      position: fixed;
      bottom: 0%;
      left: 30%;
      display: flex;
      justify-content: center;
      .chart {
        width: 800px;
        height: 300px;
      }
    }
  }
}
</style>