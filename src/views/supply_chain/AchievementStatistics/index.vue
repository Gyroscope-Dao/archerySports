<template>
  <!-- 操作按钮区域 --> <a-card>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange" bordered :scroll="{ x: 800 ,y:500}">
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
          sorter: true,
          width: 50,
          scopedSlots: { customRender: 'target_number' },
          align: 'center'
        },
        {
          title: '单位',
          dataIndex: 'city',
          width: 100,
          align: 'center'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          align: 'center',
          width: 100,
        },
        {
          title: '70米',
          width: '100',
          className: 'dartstyle',
          children: [
            {
              title: '10',
              dataIndex: `performance[0][0]`,
              width: 50,
              align: 'center'
            },
            {
              title: 'X',
              dataIndex: `performance[0][1]`,
              width: 50,
              className: 'dartstyle',
              align: 'center'
            }
          ],
        },
        {
          title: '70米',
          width: '50',
          className: 'dartstyle',
          children: [
            {
              title: '10',
              dataIndex: `performance[1][0]`,
              width: 50,
              align: 'center'
            },
            {
              title: 'X',
              dataIndex: `performance[1][1]`,
              width: 50,
              className: 'dartstyle',
              align: 'center'
            }
          ],
        },
        {
          title: '70米',
          width: '50',
          className: 'dartstyle',
          children: [
            {
              title: '10',
              dataIndex: `performance[2][0]`,
              width: 50,
              align: 'center'
            },
            {
              title: 'X',
              dataIndex: `performance[2][1]`,
              width: 50,
              className: 'dartstyle',
              align: 'center'
            }
          ],
        },
        {
          title: '70米',
          width: '50',
          className: 'dartstyle',
          children: [
            {
              title: '10',
              dataIndex: `performance[3][0]`,
              width: 50,
              align: 'center'
            },
            {
              title: 'X',
              dataIndex: `performance[3][1]`,
              width: 50,
              className: 'dartstyle',
              align: 'center'
            }
          ],
        },
        {
          title: '合计',
          width: '50',
          children: [
            {
              title: '10',
              dataIndex: `performance[4][0]`,
              width: 50,
              align: 'center'
            },
            {
              title: 'X',
              dataIndex: `performance[4][1]`,
              width: 50,
              align: 'center'
            }
          ],
        },
      ],
      data: [
        {
          key: '1',
          target_number: "1A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '2',
          target_number: "1B",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '3',
          target_number: "1C",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '4',
          target_number: "1D",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '5',
          target_number: "2A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '6',
          target_number: "2B",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '7',
          target_number: "2C",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '8',
          target_number: "2D",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '9',
          target_number: "3A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '10',
          target_number: "3B",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '11',
          target_number: "3C",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '12',
          target_number: "3D",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
        }, {
          key: '13',
          target_number: "4A",
          city: "湖北",
          name: '冯泽锴',
          performance: [[15, 6], [11, 2], [12, 5], [13, 4], [51, 17]]
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