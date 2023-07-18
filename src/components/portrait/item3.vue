<template>
  <div>
    <h2>AAA订单评价分析</h2>
    <!-- 图表的容器 -->
    <ECharts class="chart" :option="option"></ECharts>
  </div>
</template>

<script>
// 1.模版内容更改
// 2.设置计算属性
// 3.处理请求回来的数据
// 4.把处理好的数据给option
// import { reactive } from "vue";
// import request from "../utils/request.js";
// import * as echarts from 'echarts'

export default {
  name: 'item3',
  data() {
    return { data: {}, all: null }
  },
  methods: {
    // setData() {
    //   this.data = this.all.data.chartData.chartData;
    //   // console.log(this.data);
    // },
    // async getState() {
    //   this.all = await this.$axios({ url: "/three/data" });
    //   // console.log(this.all.data.chartData.chartData);
    // },
  },
  computed: {
    option() {
      return {
        legend: {
          top: 'bottom',
          textStyle: {
            color: '#fff',
          },
        },
        // 提示框
        tooltip: {
          show: true,
        },
        series: [
          {
            type: 'pie',
            // data: this.data,
            data: [
              { value: 567, name: '服ad' },
              { value: 667, name: '服bc' },
              { value: 767, name: '服qw' },
              { value: 867, name: '服er' },
              { value: 967, name: '服务asd' },
            ],
            radius: [10, 100],
            center: ['50%', '45%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 10,
            },
          },
        ],
      }
    },
  },
  mounted() {
    // this.getState().then(() => {
    //  this.setData()
    // });
  },
}
</script>

<style lang='less' scoped>
h2 {
  height: 20px;
  color: #fff;
  line-height: 20px;
  font-size: 16px;
  text-align: center;
}
.chart {
  height: 300px;
}
</style>