<template>
  <a-card :bordered="false">
     <!-- 查询区域 -->
   <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="一级AAA编号">
              <a-input placeholder="请输入AAA编号" v-model="queryParam.firstSupplierId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="二级AAA编号">
              <a-input placeholder="请输入AAA编号" v-model="queryParam.secondSupplierId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心EEE编号">
              <a-input placeholder="请输入核心EEE编号" v-model="queryParam.componentId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('二级DDD')">导出</a-button>
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

    <first-purchase-from-second-modal ref="modalForm" @ok="modalFormOk"></first-purchase-from-second-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import FirstPurchaseFromSecondModal from './modules/FirstPurchaseFromSecondModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'FirstPurchaseFromSecondList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    FirstPurchaseFromSecondModal
  },
  data() {
    return {
      description: '二级DDD管理页面',
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
        },{
          title: '订单编号',
          align: 'center',
          dataIndex: 'purchaseId'
        },{
          title: '订单名称',
          align: 'center',
          dataIndex: 'purchaseName'
        },
        {
          title: '一级AAA编号',
          align: 'center',
          dataIndex: 'firstSupplierId'
        },
        {
          title: '一级AAA名称',
          align: 'center',
          dataIndex: 'firstSupplierId_dictText'
        },
        {
          title: '二级AAA编号',
          align: 'center',
          dataIndex: 'secondSupplierId'
        },
        {
          title: '二级AAA名称',
          align: 'center',
          dataIndex: 'secondSupplierId_dictText'
        },
        {
          title: '核心EEE编号',
          align: 'center',
          dataIndex: 'componentId'
        },
        {
          title: '核心EEE名称',
          align: 'center',
          dataIndex: 'componentId_dictText'
        },
        {
            title:'计量单位',
            align:"center",
            dataIndex: 'unit'
        },
        {
          title: 'DDD时间',
          align: 'center',
          dataIndex: 'purchaseTime',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: 'DDD数量',
          align: 'center',
          dataIndex: 'purchaseNum'
        },
        {
          title: 'DDD提前期（/天）',
          align: 'center',
          dataIndex: 'leadTime'
        },
        {
          title: '约定交货期限',
          align: 'center',
          dataIndex: 'deliveryDate',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '实际交货日期',
          align: 'center',
          dataIndex: 'actualDeliveryTime',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
     
        {
            title:'状态',
            align:"center",
            dataIndex: 'status'
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
        list: '/firstPurchaseFromSecond/firstPurchaseFromSecond/list',
        delete: '/firstPurchaseFromSecond/firstPurchaseFromSecond/delete',
        deleteBatch: '/firstPurchaseFromSecond/firstPurchaseFromSecond/deleteBatch',
        exportXlsUrl: '/firstPurchaseFromSecond/firstPurchaseFromSecond/exportXls',
        importExcelUrl: 'firstPurchaseFromSecond/firstPurchaseFromSecond/importExcel'
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
        value: 'firstSupplierId',
        text: '一级AAA编号',
        dictTable: 'first_supplier_inf',
        dictText: 'supplier_name',
        dictCode: 'first_supplier_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'secondSupplierId',
        text: '二级AAA编号',
        dictTable: 'second_supplier_inf',
        dictText: 'supplier_name',
        dictCode: 'second_supplier_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'componentId',
        text: '核心EEE名称',
        dictTable: 'component_inf',
        dictText: 'component_name',
        dictCode: 'component_id'
      })
      fieldList.push({ type: 'date', value: 'purchaseTime', text: 'DDD时间' })
      fieldList.push({ type: 'int', value: 'purchaseNum', text: 'DDD数量', dictCode: '' })
      fieldList.push({ type: 'int', value: 'leadTime', text: 'DDD提前期（/天）', dictCode: '' })
      fieldList.push({ type: 'date', value: 'deliveryDate', text: '约定交货期限' })
      fieldList.push({ type: 'date', value: 'actualDeliveryTime', text: '实际交货日期' })
      fieldList.push({ type: 'string', value: 'purchaseName', text: '订单名称' })
      fieldList.push({ type: 'string', value: 'purchaseId', text: '订单编号' })
      fieldList.push({type:'string',value:'unit',text:'计量单位',dictCode:''})
      fieldList.push({type:'string',value:'status',text:'状态',dictCode:''})
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>
