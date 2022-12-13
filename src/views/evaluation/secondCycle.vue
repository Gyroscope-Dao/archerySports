<template>
  <div class="container">
    <h2>二级供应商周期趋势分析</h2>
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
      <!-- 选择周期区域 -->
      <div class="select">
        <div class="title">
          <h3>周期选择</h3>
          <!-- <a-button type="primary" @click="searchQuery">确定</a-button> -->
        </div>
        <a-radio-group v-model="param" @change="onChange" value="value" class="radioGroup">
          <a-radio class="tip" value="采购提前期">采购提前期</a-radio>
          <a-radio class="tip" value="生成日期">生成日期</a-radio>
          <a-radio class="tip" value="军检时间">军检时间</a-radio>
          <a-radio class="tip" value="生产时间">生产时间</a-radio>
        </a-radio-group>
      </div>
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
      param: 0,
      currentDataX: [],
      currentDataY: [],
      numDataY: [],
      ADataY: [],
      BDataY: [],
      CDataY: [],
      DDataY: [],
    }
  },
  computed: {
    option() {
      return {
        xAxis: {
          type: 'category',
          data: this.currentDataX,
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
            data: this.currentDataY,
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
      this.getdata(this.model)
      console.log(this.model)
    },
    // 重置方法
    searchReset() {
      this.model = {}
    },
    onChange(e) {
      if (e.target.value == '采购提前期') {
        this.currentDataY = this.ADataY
      }
      if (e.target.value == '生成日期') {
        this.currentDataY = this.BDataY
      }
      if (e.target.value == '军检时间') {
        this.currentDataY = this.CDataY
      }
      if (e.target.value == '生产时间') {
        this.currentDataY = this.DDataY
      }
    },
    /*
    startDate: '2022-12-01',
        endDate: '2022-12-20',
        supplyId: 'SS20221204211469',
        productId: 'C20221206155094',
    */
    getdata(obj) {
      var url = '/supplycycleanalysis/getSecondsupplycycleanalysis'
      getAction(url, {
        startDate: obj.startTime,
        endDate: obj.endTime,
        supplyId: obj.supplyId,
        productId: obj.productId,
      }).then((res) => {
        console.log(res);
        res.result.forEach((e) => {
          this.currentDataX.push(e.componentName)
          this.numDataY.push(e.dailyProductionCapacity)
          this.ADataY.push(e.checkTimeA)
          this.BDataY.push(e.checkTimeB)
          this.CDataY.push(e.checkTimeC)
          this.DDataY.push(e.checkTimeD)
        })
        this.currentDataY = this.numDataY
        res.result.forEach((e) => {console.log(e);})
      })
    },
  },
  mounted() {
    // this.getdata()
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    .select {
      .title {
        display: flex;
        justify-content: space-around;
        h3 {
          margin-right: 1.25rem;
        }
      }
      .radioGroup {
        display: flex;
        flex-direction: column;
        .tip {
          padding: 0.625rem;
        }
      }
    }

    .echart {
      display: flex;
      justify-content: center;
      .chart {
        width: 43.75rem;
        height: 18.75rem;
      }
    }
  }
}
</style>