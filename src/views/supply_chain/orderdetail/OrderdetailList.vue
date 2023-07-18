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
      <a-button type="primary" icon="download" @click="handleExportXls('订单跟踪信息')">导出</a-button>
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

    <orderdetail-modal ref="modalForm" @ok="modalFormOk"></orderdetail-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import OrderdetailModal from './modules/OrderdetailModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'OrderdetailList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    OrderdetailModal
  },
  data() {
    return {
      description: '订单跟踪信息管理页面',
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
          title: '订单编号',
          align: 'center',
          dataIndex: 'orderId_dictText'
        },
        {
          title: 'AAA',
          align: 'center',
          dataIndex: 'firstSupplierId_dictText'
        },
        {
          title: '物料',
          align: 'center',
          dataIndex: 'productId_dictText'
        },
        {
          title: '一级DDD编号',
          align: 'center',
          dataIndex: 'firstPurchaseId_dictText'
        },
        {
          title: '批次编号',
          align: 'center',
          dataIndex: 'lotId'
        },
        {
          title: '到货数量',
          align: 'center',
          dataIndex: 'arrivalQuantity'
        },
        {
          title: '到货时间',
          align: 'center',
          dataIndex: 'arrivalData'
        },
        {
          title: '批次合格率',
          align: 'center',
          dataIndex: 'passRate'
        },
        {
          title: '总批次量',
          align: 'center',
          dataIndex: 'batchNumber'
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
        list: '/orderdetail/orderdetail/list',
        delete: '/orderdetail/orderdetail/delete',
        deleteBatch: '/orderdetail/orderdetail/deleteBatch',
        exportXlsUrl: '/orderdetail/orderdetail/exportXls',
        importExcelUrl: 'orderdetail/orderdetail/importExcel'
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
        value: 'orderId',
        text: '订单编号',
        dictTable: 'order_inf',
        dictText: 'order_id',
        dictCode: 'order_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'firstSupplierId',
        text: 'AAA',
        dictTable: 'first_supplier_inf',
        dictText: 'supplier_name',
        dictCode: 'first_supplier_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'productId',
        text: '物料',
        dictTable: 'product_inf',
        dictText: 'product_name',
        dictCode: 'product_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'firstPurchaseId',
        text: '一级DDD编号',
        dictTable: 'first_purchase',
        dictText: 'first_supplier_id',
        dictCode: 'first_supplier_id'
      })
      fieldList.push({ type: 'string', value: 'lotId', text: '批次编号', dictCode: '' })
      fieldList.push({ type: 'int', value: 'arrivalQuantity', text: '到货数量', dictCode: '' })
      fieldList.push({ type: 'datetime', value: 'arrivalData', text: '到货时间' })
      fieldList.push({ type: 'double', value: 'passRate', text: '批次合格率', dictCode: '' })
      fieldList.push({ type: 'int', value: 'batchNumber', text: '总批次量', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>
