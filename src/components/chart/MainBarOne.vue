<template>
    <div>
      <div ref="Echar" class="chartStyle"></div>
    </div>
  </template>
  
  <script>
  import {getDataList, getDataListInfo} from '@/api/api'
  import * as echarts from 'echarts'

    export default {
      name: 'MainBarOne',
      props: {

      },
      data() {
        return {
          myChar: null, 
          option:{
            title: {
            text: 'AAA数量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: false,
                data: ['2019', '2020', '2021', '2022', '2023']
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                    {
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [20, 32, 66, 34, 50]
                    },
                ]
            }
        }
      },
      created() {
        // this.getSuperFieldList()
      },

      methods:{
        // //后端真实数据
        // getDataListInfoFun(){
        //   getDataListInfo(this.firstSupplierId).then(res => {
        //     this.dataListInfo = res
        //     console.log(this.dataListInfo);
        //     this.option.series[0].data = this.dataListInfo
        //     this.myChar.setOption(this.option)
        //   })
        // },
        // changeCompanyName(id){   //  目前问题是这个first_supplier_id没有传过来
        //   this.firstSupplierId = id  
        //   this.getDataListInfoFun()
        // }
      },
      mounted() {
        const ref = this.$refs.Echar
        this.myChar = echarts.init(ref)
        this.myChar.setOption(this.option)
        // this.getDataListFun()
        this.getDataListInfoFun()
      }
    }
  </script>
  
  <style scoped>
  .chartStyle{
    height: 400px;
    width: 600px;
  }
  </style>