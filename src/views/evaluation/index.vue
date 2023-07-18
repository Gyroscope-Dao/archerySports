<template>
  <div class="container">
    <h2>AAA关键指标趋势分析</h2>
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
              AAA编号
              <a-input v-model="model.supplyId" placeholder="请输入AAA编号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <a-form-item label="" :labelCol="{ span: 5 }" :wrapperCol="{ span: 10, offset: 1 }">
              物料编号
              <a-input v-model="model.productId" placeholder="请输入物料编号"></a-input> </a-form-item
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
    <!-- echarts图 -->
    <div class="echart">
      <ECharts class="chart" :option="option"></ECharts>
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'

export default {
  data() {
    return {
      model: {},
      // 表格数据源
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],
      // 表格横轴
      columns: [
        {
          title: '订单号',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'AAA编号',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'AAA名称',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'AAA物料编号',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '物料名称',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'DDD数量/件',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '下单时间',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '约定交谈时间',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '实际完成时间',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '订单周期/天',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    }
  },
  computed: {
    option() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
  methods: {
    // 查询方法
    searchQuery() {
      console.log(this.model)
    },
    // 重置方法
    searchReset() {
      this.model = {}
    },
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
  .echart {
    display: flex;
    justify-content: center;
    .chart {
      width: 50%;
      height: 300px;
    }
  }
}
</style>