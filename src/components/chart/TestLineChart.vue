<template>
    <div>
      <a-row style="float: left;width:20vh">
        <a-col :span="24">
          <a-form-model-item label="AAA名称" prop="firstSupplierId">
                  <j-search-select-tag
                    v-model="firstSupplierId"
                    @change="changeCompanyName"
                    dict="first_supplier_inf,supplier_name,first_supplier_id"
                  />
          </a-form-model-item>
        </a-col>
      </a-row>
      <div ref="Echar" style="margin-left: 25vh; height: 500px; width: 800px;"></div>
    </div>
  </template>
  
  <script>
  import {getDataList, getDataListInfo} from '@/api/api'
  import * as echarts from 'echarts'

    export default {
      name: 'TestLineChart',
      props: {

      },
      data() {
        return {
          dataList:[],
          dataListInfo:[],
          firstSupplierId: '1',//AAAid
          first_supplier_id:'',
          myChar: null, 
          option : {
            title: {
              text: '出货量'
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
            legend: {
              data: ['Email']
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
                data: ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份','8月份','9月份','10月份','11月份','12月份']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                // name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: []
              },
            ]
          }
        }
      },
      created() {
        // this.getSuperFieldList()
      },

      methods:{
        // getSuperFieldList() {
        //   let fieldList = []
        //   fieldList.push({
        //     type: 'sel_search',
        //     value: 'firstSupplierId',
        //     text: '一级AAA名称',
        //     dictTable: 'first_supplier_inf',
        //     dictText: 'supplier_name',
        //     dictCode: 'first_supplier_id'
        //   })
        // },

        //后端虚拟数据
        // getDataListFun(){
        //   getDataList().then(res => {
        //     this.option.series[0].data = res
        //     this.myChar.setOption(this.option)
        //   })
        // },
        //后端真实数据
        getDataListInfoFun(){
          getDataListInfo(this.firstSupplierId).then(res => {
            this.dataListInfo = res
            console.log(this.dataListInfo);
            this.option.series[0].data = this.dataListInfo
            this.myChar.setOption(this.option)
          })
        },
        changeCompanyName(id){   //  目前问题是这个first_supplier_id没有传过来
          this.firstSupplierId = id  
          this.getDataListInfoFun()
        }
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
  
  </style>