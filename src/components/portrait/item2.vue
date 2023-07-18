<template>
  <div>
    <h2>AAA响应趋势分析</h2>
    <!-- 图表的容器 -->
    <ECharts class="chart" :option="option"></ECharts>
  </div>
</template>

<script>
// import { reactive } from "vue";
// import request from "../utils/request.js";
// import * as echarts from "echarts";

export default {
  name: "item2",
  data() {
    // let data = reactive({});
    return { data:{}, xdata:[], ydataA:[], ydataB:[], ydataC:[], ydataD:[], ydataE:[]};
  },
  methods: {
    setData() {
      // this.xdata = this.data.data.chartData.chartData.day
      // this.ydataA = this.data.data.chartData.chartData.num.A
      // this.ydataB = this.data.data.chartData.chartData.num.B
      // this.ydataC = this.data.data.chartData.chartData.num.C
      // this.ydataD = this.data.data.chartData.chartData.num.D
      // this.ydataE = this.data.data.chartData.chartData.num.E
      // console.log(xdata, ydata);
    },
    async getState() {
      // this.data = await this.$axios({ url: "/two/data" });
      // console.log(this.data);
    },
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#e6b600",
            },
          },
        },
        legend: {
          top: "5%",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "1%",
          top: "20%",
          right: "10%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          // 和Y轴贴贴
          boundaryGap: false,
          // data: this.xdata,
          data: ["礼拜一", "礼拜二","礼拜三","礼拜四","礼拜五","礼拜六","礼拜日"],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "参数1",
            type: "line",
            // data: this.ydataA,
            data: [123,234,456,567,678,333,777],
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "参数2",
            type: "line",
            // data: this.ydataB,
            data: [623,14,956,867,778,555,666],
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "参数3",
            type: "line",
            // data: this.ydataC,
            data: [923,534,156,967,378,222,111],
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "参数4",
            type: "line",
            // data: this.ydataD,
            data: [323,34,456,767,978,1000,999],  
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "参数5",
            type: "line",
            // data: this.ydataE,
            data: [723,134,756,567,378,777,666],
            emphasis: {
              focus: "series",
            },
          },
        ],
      }
    }
  },
  mounted() {
    this.getState().then(() => {
     this.setData()
    });
  },
};
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