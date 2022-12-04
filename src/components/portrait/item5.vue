<template>
  <div>
    <h2>供应商订单分类指标评价</h2>
    <!-- 图表的容器 -->
    <ECharts class="chart" :option="option"></ECharts>
  </div>
</template>

<script>
// 1.模版内容更改
// 2.设置计算属性
// 3.请求数据
// 4.处理请求回来的数据
// 5.把处理好的数据给option
// 6.在页面初始化的时候, 请求数据

export default {
  name: 'item5',
  data() {
    return {
      data: {},
      radarData: [],
    }
  },
  methods: {
    // setData() {
    //   this.radarData = this.data.data.chartData.chartData;
    // },
    // async getState() {
    //   this.data = await this.$axios({ url: "/five/data" });
    // },
  },
  computed: {
    option() {
      return {
        legend: {
          data: ['供应商A', '供应商B'],
          textStyle: {
            color: '#fff',
          },
        },
        radar: [
          {
            center: ['50%', '55%'],
            // shape: 'circle',
            indicator: [
              { name: '属性A', max: 6500 },
              { name: '属性B', max: 16000 },
              { name: '属性C', max: 30000 },
              { name: '属性D', max: 38000 },
              { name: '属性E', max: 52000 },
              { name: '属性F', max: 25000 },
            ],
            axisName: {
              color: '#fff',
            },
          },
        ],
        series: [
          {
            name: '供应商A vs 供应商A',
            type: 'radar',
            // data: this.radarData,
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '商户B',
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '商户A',
              },
            ],
            itemStyle: {
              // 折线拐点标志的样式。
              emphasis: {
                // 高亮时的样式
                focus: 'self',
              },
            },
            label: {
              // 单个拐点文本的样式设置
              normal: {
                show: true,
                // 单个拐点文本的样式设置。[ default: false ]
                position: 'top',
                // 标签的位置。[ default: top ]
                distance: 5,
                // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                color: '#aaa',
                // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                fontSize: 10,
                // 文字的字体大小
              },
            },
          },
        ],
      }
    },
  },
  // mounted() {
  //   this.getState().then(() => {
  //     this.setData();
  //   });
  // },
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