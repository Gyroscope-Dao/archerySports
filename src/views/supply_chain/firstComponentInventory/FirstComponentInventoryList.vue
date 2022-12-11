<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24"> </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('一级核心部件库存与采购能力')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query
        :fieldList="superFieldList"
        ref="superQueryModal"
        @handleSuperQuery="handleSuperQuery"
      ></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down"/></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="j-table-force-nowrap"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text, record">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img
            v-else
            :src="getImgView(text)"
            :preview="record.id"
            height="25px"
            alt=""
            style="max-width:80px;font-size: 12px;font-style: italic;"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>

    <first-component-inventory-modal ref="modalForm" @ok="modalFormOk"></first-component-inventory-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import FirstComponentInventoryModal from './modules/FirstComponentInventoryModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'FirstComponentInventoryList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    FirstComponentInventoryModal
  },
  data() {
    return {
      description: '一级核心部件库存与采购能力管理页面',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '核心部件名称',
          align: 'center',
          dataIndex: 'com1InfId_dictText'
        },
        {
          title: '一级供应商名称',
          align: 'center',
          dataIndex: 'firstSupplierId_dictText'
        },
        {
          title: '库存数量（件）',
          align: 'center',
          dataIndex: 'stockQuantity'
        },
        {
          title: '采购周期 （天）',
          align: 'center',
          dataIndex: 'purchaseLeadTime'
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'infUpdateTime',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '人员编号',
          align: 'center',
          dataIndex: 'stuffId'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/firstComponentInventory/firstComponentInventory/list',
        delete: '/firstComponentInventory/firstComponentInventory/delete',
        deleteBatch: '/firstComponentInventory/firstComponentInventory/deleteBatch',
        exportXlsUrl: '/firstComponentInventory/firstComponentInventory/exportXls',
        importExcelUrl: 'firstComponentInventory/firstComponentInventory/importExcel'
      },
      dictOptions: {},
      superFieldList: [],
      my_isorter: {}
    }
  },
  created() {
    this.getSuperFieldList()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({
        type: 'sel_search',
        value: 'com1InfId',
        text: '核心部件名称',
        dictTable: 'component_inf',
        dictText: 'component_name',
        dictCode: 'component_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'firstSupplierId',
        text: '一级供应商名称',
        dictTable: 'first_supplier_inf',
        dictText: 'supplier_name',
        dictCode: 'first_supplier_id'
      })
      fieldList.push({ type: 'int', value: 'stockQuantity', text: '库存数量', dictCode: '' })
      fieldList.push({ type: 'int', value: 'purchaseLeadTime', text: '采购周期 （天）', dictCode: '' })
      fieldList.push({ type: 'date', value: 'infUpdateTime', text: '录入时间' })
      fieldList.push({ type: 'string', value: 'stuffId', text: '人员编号', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>
