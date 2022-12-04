<template>
  <div class="panel">
    <ECharts class="map" :option="option" ref="myEchart"></ECharts>
  </div>
</template>

<script>
import '@/assets/portrait/china.js'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      data: [
        { name: '北京', value: [116.46, 39.92, 4367], id: '1597538842468958209', FirstSupplier: true },
        { name: '上海', value: [121.48, 31.22, 8675], id: '1593837632480722946', FirstSupplier: true},
        { name: '深圳', value: [114.07, 22.62, 2461], id: '789123456' },
        { name: '西安', value: [108.45, 34, 3421], id: '23456789' },
        { name: '广州', value: [113.23, 23.16, 187], id: '3456789' },
      ],
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
          text: '地图展示',
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
  mounted() {
    this.myChart = echarts.init(document.querySelector('.map')) //这里是为了获得容器所在位置
    this.bindClick()
  },
  methods: {
    bindClick() {
      const _this = this
      // this.myChart.off('click')
      this.myChart.on('click', function (res) {
        // console.log(res);
        if (res.componentSubType === 'scatter') {
          let routeData = _this.$router.resolve({
            path: '/portrait/supply',
            query: {
              id: res.data.id,
              FirstSupplier: res.data.FirstSupplier,
            },
          })
          window.open(routeData.href, '_blank')
        }
      })
    },
  },
}
</script>

<style lang='less' scoped>
.panel {
  position: relative;
  width: 100%;
  height: 100%;

  .map {
    z-index: 999;
    width: 100%;
    height: 95%;
  }
}
</style>