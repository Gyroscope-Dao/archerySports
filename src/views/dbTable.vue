<template>
  <div>
    <a-card :bordered="false">
      <div class="main">
        <div class="left">
          <a-menu style="width: 220px" :default-selected-keys="['1']" mode="inline">
            <a-sub-menu key="sub1">
              <span slot="title"><span>供应商库</span></span>
              <a-menu-item
                v-for="item in tableList[0]"
                :key="item.name"
                class="table-name-button"
                :class="{ active: activeTableListName === item.name }"
                @click="handleTableNameButton(item.name)"
              >
                {{ item.ch }}
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><span>物料信息库</span></span>
              <a-menu-item
                v-for="item in tableList[1]"
                :key="item.name"
                class="table-name-button"
                :class="{ active: activeTableListName === item.name }"
                @click="handleTableNameButton(item.name)"
              >
                {{ item.ch }}
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><span>供应历史库</span></span>
              <a-menu-item
                v-for="item in tableList[2]"
                :key="item.name"
                class="table-name-button"
                :class="{ active: activeTableListName === item.name }"
                @click="handleTableNameButton(item.name)"
              >
                {{ item.ch }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
          <!-- <div
            v-for="item in tableList"
            :key="item"
            class="table-name-button"
            :class="{ active: activeTableListName === item }"
            @click="handleTableNameButton(item)"
          >
            {{ item }}
          </div> -->
        </div>
        <div class="right">
          <div style="font-size: 14px; height: 25px;">数据库数据数目： {{ activeTableCount }}</div>
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
import { CHTableField, CHTableName } from './utils/dbTableItemCh'

export default {
  name: 'Text',
  data: () => {
    return {
      tableList: [],
      activeTableListName: 'first_supplier_inf',
      activeTableCount: 0,
      columns: [],
      data: [],
      pagination: {},
      loading: false,
      pageSize: 10
    }
  },
  mounted() {
    this.getTableName()
  },
  methods: {
    async getTableName() {
      let res = await axios({
        method: 'GET',
        url: '/table/tableNames'
      })
      let tableListTransitionCH = []

      for (let i = 0; i < res.length; i++) {
        let data = []
        for (let j = 0; j < res[i].length; j++) {
          let dataItem = { name: res[i][j], ch: res[i][j] }
          if (CHTableName.get(res[i][j])) {
            dataItem.ch = CHTableName.get(res[i][j])
          }
          data.push(dataItem)
        }
        tableListTransitionCH.push(data)
      }
      this.tableList = tableListTransitionCH

      await this.setCount(this.activeTableListName)
      this.fetch(1)
    },
    async setCount(tableName) {
      let res = await axios({
        method: 'GET',
        url: '/table/count',
        params: {
          tableName
        }
      })
      this.pagination.total = res
      this.activeTableCount = res
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
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch(pagination.current)
    },
    fetch(page) {
      console.log('页数' + page)
      this.loading = true
      this.getTableData(this.activeTableListName, page, this.pageSize).then(data => {
        console.log(data)
        if (data.length === 0) {
          console.log('没有数据')
        } else this.columns = this.createTitles(data[0])
        const pagination = { ...this.pagination }
        //设置总数
        pagination.total = this.activeTableCount
        pagination.pageSize = this.pageSize
        this.loading = false
        this.data = data
        console.log(this.pagination)
        this.pagination = pagination
      })
    },
    createTitles(obj) {
      let res = []
      for (let i of Object.keys(obj)) {
        let item = {}
        item['title'] = CHTableField.get(i) ? CHTableField.get(i) : i
        item['dataIndex'] = i
        item['key'] = i
        res.push(item)
      }
      return res
    },
    async handleTableNameButton(table) {
      this.activeTableListName = table
      await this.setCount(this.activeTableListName)
      this.fetch(1)
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
  line-height: 40px;
  border-right: 1px solid #e8e8e8;
  cursor: pointer;
}
.table-name-button.active {
  color: #1890ff;
  background-color: #e7f7ff;
}

.table-name-button.active::after {
  content: '';
  position: absolute;
  right: 0;
  height: 40px;
  width: 3px;
  background-color: #1890ff;
  border-radius: 2px;
}
.table-name-button:hover {
  color: #1890ff;
}
.table {
  width: 100%;
  overflow-x: scroll;
}


</style>
