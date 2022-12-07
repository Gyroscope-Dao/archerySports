<template>
  <div>
    <a-card :bordered="false">
    <div class="main">
      <div class='left'>
        <div v-for="item in tableList" 
        :key="item" 
        class="table-name-button" 
        :class="{'active': activeTableListName === item}"
        @click="handleTableNameButton(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class='right'>
        <a-table
          :columns="columns"
          :row-key="record => record.id"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          class="table"
        >
        </a-table>
      </div>
    </div>
    </a-card>
  </div>
</template>

<script>
import { axios } from '@/utils/request'

export default {
  name: 'Text',
  data:() => {
    return {
      tableList: {},
      activeTableListName: 'first_supplier_inf',
      activeTableCount: 0,
      columns: [],
      data: [],
      pagination: {},
      loading: false,
      pageSize: 5,
    }
  },
  mounted() {
    this.getTableName();
  },
  methods: {
    async getTableName() {
      let res = await axios({
        method: "GET",
        url: '/table/tableNames'
      });
      this.tableList = res;

      await this.setCount(this.activeTableListName);
      this.fetch(1);
    },
    async setCount(tableName) {
      let res = await axios({
        method: 'GET',
        url: '/table/count',
        params: {
          tableName,
        }
      })
      console.log(this.activeTableListName + '  ' + res);
      this.pagination.total = res;
      this.activeTableCount = res;
    },
    getTableData(tableName, pageNo, pageSize) {
      return axios({
        method: 'GET',
        url: '/table/data',
        params: {
          tableName,
          pageNo,
          pageSize
        }
      })
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch(pagination.current)
    },
    fetch(page) {
      console.log('页数'+ page)
      this.loading = true;
      this.getTableData(this.activeTableListName, page, this.pageSize).then(( data ) => {
        console.log(data);
      if(data.length === 0) {
        console.log('没有数据');
      } else this.columns =  this.createTitles(data[0])
      const pagination = { ...this.pagination };
      //设置总数
      pagination.total = this.activeTableCount;
      pagination.pageSize = this.pageSize;
      this.loading = false;
      this.data = data;
      console.log(this.pagination)
      this.pagination = pagination;
      });
    },
    createTitles(obj) {
      let res = [];
      for(let i of Object.keys(obj)) {
        let item = {};
        item['title'] = i;
        item['dataIndex'] = i;
        item['key'] = i;
        res.push(item);
      }
      return res;
    },
    async handleTableNameButton(table) {
      this.activeTableListName = table;
      await this.setCount(this.activeTableListName);
      this.fetch(1);
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
  display: flex;
}
.left {
  width: 220px;
}
.right {
  width: 100%;
  overflow: hidden;
}
.table-name-button {
  height: 40px;
  font-size: 15px;
  padding-left: 5px;
  position: relative;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid #e8e8e8;
  cursor: pointer;
}
.table-name-button.active {
  color: #1890FF;
  background-color: #e7f7ff;
}

.table-name-button.active::after {
  content: '';
  position: absolute;
  right: 0;
  height: 40px;
  width: 3px;
  background-color: #1890FF;
  border-radius: 2px;
}
.table-name-button:hover {
  color: #1890FF;
}
.table {
  width: 100%;
  overflow-x: scroll;
}
</style>