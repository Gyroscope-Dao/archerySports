<template>
  <!-- 操作按钮区域 --> <a-card>
    <div class="table-operator">
      <a-button @click="initDictConfig" type="primary" icon="plus">开始接收</a-button>
      <a-button type="primary" icon="export" @click="initDictConfig">停止接收</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange" bordered :scroll="{ x: 1800 ,y:500}">
      <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }} </template>
    </a-table>
  </a-card>
</template>
<script>
// import axios from 'axios';

// const queryData = params => {
//   return axios.get('https://randomuser.me/api', { params: params });
// };
export default {
  name: 'SportsInfList',
  data () {
    return {
      description: '运动会管理页面',
      // 表头
      columns: [
        {
          title: '靶号',
          dataIndex: 'target_number',
          align: 'center',
          sorter: true,
          width: '100',
          scopedSlots: { customRender: 'target_number' },
          fixed: 'left'
        },
        {
          title: '单位',
          align: 'center',
          dataIndex: 'city',
          width: '100',
          fixed: 'left'
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'name',
          width: '100',
          fixed: 'left'
        },
        , {
          title: '70米-组1',
          width: '100',
          children: [

            {
              title: '1',
              dataIndex: `performance[0][0]`,
              width: 50,
            },
            {
              title: '2',
              dataIndex: `performance[0][1]`,
              width: 50,
            },
            {
              title: '3',
              dataIndex: `performance[0][2]`,
              width: 50,
            },
            {
              title: '4',
              dataIndex: `performance[0][3]`,
              width: 50,
            },
            {
              title: '5',
              dataIndex: `performance[0][4]`,
              width: 50,
            },
            {
              title: '6',
              dataIndex: `performance[0][5]`,
              width: 50,
            },
          ]
        },
        {
          title: '1',
          dataIndex: `performance[0][0]`,
          width: 50,
          align: 'center'
        },
        {
          title: '2',
          dataIndex: `performance[0][1]`,
          width: 50,
          align: 'center'
        },
        {
          title: '3',
          dataIndex: `performance[0][2]`,
          width: 50,
          align: 'center'
        },
        {
          title: '4',
          dataIndex: `performance[0][3]`,
          width: 50,
          align: 'center'
        },
        {
          title: '5',
          dataIndex: `performance[0][4]`,
          width: 50,
          align: 'center'
        },
        {
          title: '6',
          dataIndex: `performance[0][5]`,
          width: 50,
          align: 'center'
        },
        {
          title: '70米',
          dataIndex: `performance[0][6]`,
          width: 50,
          className: 'dartstyle',
          align: 'center'
        },
        {
          title: '1',
          dataIndex: `performance[1][0]`,
          width: 50,
          align: 'center'
        },
        {
          title: '2',
          dataIndex: `performance[1][1]`,
          width: 50,
          align: 'center'
        },
        {
          title: '3',
          dataIndex: `performance[1][2]`,
          width: 50,
          align: 'center'
        },
        {
          title: '4',
          dataIndex: `performance[1][3]`,
          width: 50,
          align: 'center'
        },
        {
          title: '5',
          dataIndex: `performance[1][4]`,
          width: 50,
          align: 'center'
        },
        {
          title: '6',
          dataIndex: `performance[1][5]`,
          width: 50,
          align: 'center'
        },
        {
          title: '70米',
          dataIndex: `performance[1][6]`,
          width: 50,
          align: 'center',
          className: 'dartstyle',
        },
        {
          title: '1',
          dataIndex: `performance[2][0]`,
          width: 50,
          align: 'center'
        },
        {
          title: '2',
          dataIndex: `performance[2][1]`,
          width: 50,
          align: 'center'
        },
        {
          title: '3',
          dataIndex: `performance[2][2]`,
          width: 50,
          align: 'center'
        },
        {
          title: '4',
          dataIndex: `performance[2][3]`,
          width: 50,
          align: 'center'
        },
        {
          title: '5',
          dataIndex: `performance[2][4]`,
          width: 50,
          align: 'center'
        },
        {
          title: '6',
          dataIndex: `performance[2][5]`,
          width: 50,
          align: 'center'
        },
        {
          title: '70米',
          dataIndex: `performance[2][6]`,
          width: 50,
          align: 'center',
          className: 'dartstyle',
        },
        {
          title: '1',
          dataIndex: `performance[3][0]`,
          width: 50,
          align: 'center'
        },
        {
          title: '2',
          dataIndex: `performance[3][1]`,
          width: 50,
          align: 'center'
        },
        {
          title: '3',
          dataIndex: `performance[3][2]`,
          width: 50,
          align: 'center'
        },
        {
          title: '4',
          dataIndex: `performance[3][3]`,
          width: 50,
          align: 'center'
        },
        {
          title: '5',
          dataIndex: `performance[3][4]`,
          width: 50,
          align: 'center'
        },
        {
          title: '6',
          dataIndex: `performance[3][5]`,
          width: 50,
          align: 'center'
        },
        {
          title: '70米',
          dataIndex: `performance[3][6]`,
          width: 50,
          className: 'dartstyle',
          align: 'center'
        },
        {
          title: '总成绩',
          dataIndex: `performance[4][0]`,
          width: 80,
          align: 'center',
          fixed: 'right'
        },
        {
          title: '总十环数',
          dataIndex: `performance[4][1]`,
          width: 80,
          align: 'center',
          fixed: 'right'
        },
        {
          title: '总X数',
          dataIndex: `performance[4][2]`,
          width: 80,
          align: 'center',
          fixed: 'right'
        }
      ],
      data: [
        {
          key: '1',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        },
        {
          key: '2',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '3',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '4',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '5',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '6',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '7',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '8',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '9',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '10',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '11',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '12',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }, {
          key: '13',
          target_number: "37A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[56, 58, 56, 55, 55, 56, 333], [54, 58, 51, 51, 57, 56, 327], [55, 53, 56, 56, 54, 55, 329], [53, 56, 58, 56, 55, 55, 333], [1321, 51, 17]]
        }
      ],
      // 自定义选项
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true
      },
      // 加载
      loading: false,
      url: {
        list: "/sportsInf/sportsInf/list",
        delete: "/sportsInf/sportsInf/delete",
        deleteBatch: "/sportsInf/sportsInf/deleteBatch",
        exportXlsUrl: "/sportsInf/sportsInf/exportXls",
        importExcelUrl: "sportsInf/sportsInf/importExcel",

      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  methods: {
    initDictConfig () {
    },
    // fetch (params = {}) {
    //   this.loading = true;
    //   queryData({
    //     results: 10,
    //     ...params,
    //   }).then(({ data }) => {
    //     const pagination = { ...this.pagination };
    //     // Read total count from server
    //     // pagination.total = data.totalCount;
    //     pagination.total = 200;
    //     this.loading = false;
    //     this.data = data.results;
    //     this.pagination = pagination;
    //   });
    // },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
  },
  mounted () {
    // this.fetch();
  },
}
</script>
<style lang="less" scoped>
/deep/ .ant-table-tbody > tr > td {
  padding: 0px !important;
}
/deep/.dartstyle {
  border-right: 1px solid #999 !important;
}
</style>