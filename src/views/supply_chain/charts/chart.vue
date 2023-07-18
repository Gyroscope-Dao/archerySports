<template>
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="出货量折线图" key="6">
          <test-line-chart title="多行折线图" :height="height"/>
        </a-tab-pane>        
      </a-tabs>
    </a-card>
  </template>
  
  <script>
    import TestLineChart from '@/components/chart/TestLineChart'  
    export default {
      name: 'ViserChartDemo',
      components: {
        TestLineChart,
      },
      data() {
        return {
          height: 420,
          rankList: [],
          barData: [],
          areaData: []
        }
      },
      created() {
        setTimeout(() => {
          this.loadBarData()
          this.loadAreaData()
          this.loadRankListData()
        }, 100)
      },
      methods: {
        loadData(x, y, max, min, before = '', after = '月') {
          let data = []
          for (let i = 0; i < 12; i += 1) {
            data.push({
              [x]: `${before}${i + 1}${after}`,
              [y]: Math.floor(Math.random() * max) + min
            })
          }
          return data
        },
        // 加载柱状图数据
        loadBarData() {
          this.barData = this.loadData('x', 'y', 1000, 200)
        },
        // 加载AreaChartTy的数据
        loadAreaData() {
          this.areaData = this.loadData('x', 'y', 500, 100)
        },
        loadRankListData() {
          this.rankList = this.loadData('name', 'total', 2000, 100, '北京朝阳 ', ' 号店')
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  