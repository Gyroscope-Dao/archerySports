<template>
  <div>
    <h2>供应商订单增长趋势分析</h2>
    <!-- 图表的容器 -->
    <ECharts class="chart" :option="option"></ECharts>
  </div>
</template>

<script>
export default {
  name: 'item1',
  data() {
    return { data: {}, xdata: [], ydata: [] }
  },
  methods: {
    setData() {
      // this.xdata = this.data.data.chartData.chartData.map((v) => v.title);
      // this.ydata = this.data.data.chartData.chartData.map((v) => v.num);
      // // console.log(xdata, ydata);
    },
    async getState() {
      // this.data = await this.$axios({url:"/one/data"});
      // console.log(this.data);
    },
  },
  // 计算属性，图的设置
  computed: {
    option() {
      return {
        // tooltip: {
        //   trigger: "item",
        // },
        // grid: {
        //   top: "1%",
        //   left: "1%",
        //   right: "6%",
        //   bootom: "1%",
        //   containLabel: true,
        // },
        // xAxis: {
        //   type: "value",
        //   axisLine: {
        //     lineStyle: {
        //       color: "#fff",
        //     },
        //   },
        // },
        // yAxis: {
        //   type: "category",
        //   data: [123,233,99,109],
        //   axisLine: {
        //     lineStyle: {
        //       color: "#fff",
        //     },
        //   },
        // },
        // series: [
        //   {
        //     data: ['asd','bbc','ddc','eed'],
        //     type: "bar",
        //     itemStyle: {
        //       normal: {
        //         barBorderRadius: [0, 20, 20, 0],
        //       },
        //     },
        //   },
        // ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
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
  },
  // 页面加载的时候，从后端获取数据
  mounted() {
    // this.getState().then(() => {
    //   this.setData();
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
  height: 270px;
}
</style>