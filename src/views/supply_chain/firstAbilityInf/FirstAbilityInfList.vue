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
            <a-form-item label="物料编码">
              <a-input placeholder="请输入物料编码" v-model="queryParam.productId"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('一级产存检运能力信息')">导出</a-button>
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

    <first-ability-inf-modal ref="modalForm" @ok="modalFormOk"></first-ability-inf-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import FirstAbilityInfModal from './modules/FirstAbilityInfModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'FirstAbilityInfList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    FirstAbilityInfModal
  },
  data() {
    return {
      description: '一级产存检运能力信息管理页面',
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
          title: '物料编码',
          align: 'center',
          dataIndex: 'productId'
        },
        {
          title: '物料名称',
          align: 'center',
          dataIndex: 'productId_dictText'
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
          title: '物料库存',
          align: 'center',
          dataIndex: 'productStock'
        },
        {
          title: '生产批量',
          align: 'center',
          dataIndex: 'productionLot'
        },
        {
          title: '日均产量',
          align: 'center',
          dataIndex: 'dayProLot'
        },
        {
          title: '日最大生产量',
          align: 'center',
          dataIndex: 'maxDayProLot'
        },
        {
          title: '生产周期（天）',
          align: 'center',
          dataIndex: 'productionCycle'
        },
        {
          title: 'A 组检验周期（天）',
          align: 'center',
          dataIndex: 'checkTimeA'
        },
        {
          title: 'B 组检验周期（天）',
          align: 'center',
          dataIndex: 'checkTimeB'
        },
        {
          title: 'C 组检验周期（天）',
          align: 'center',
          dataIndex: 'checkTimeC'
        },
        {
          title: 'D 组检验周期（天）',
          align: 'center',
          dataIndex: 'checkTimeD'
        },
        {
          title: '检验周期（天）逻辑关系',
          align: 'center',
          dataIndex: 'transportTimeDescription'
        },
        {
          title: 'ys周期（天）',
          align: 'center',
          dataIndex: 'transportTime'
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'infUpdateTime'
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
        list: '/firstAbilityInf/firstAbilityInf/list',
        delete: '/firstAbilityInf/firstAbilityInf/delete',
        deleteBatch: '/firstAbilityInf/firstAbilityInf/deleteBatch',
        exportXlsUrl: '/firstAbilityInf/firstAbilityInf/exportXls',
        importExcelUrl: 'firstAbilityInf/firstAbilityInf/importExcel'
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
        text: '一级AAA名称',
        dictTable: 'first_supplier_inf',
        dictText: 'supplier_name',
        dictCode: 'first_supplier_id'
      })
      fieldList.push({
        type: 'sel_search',
        value: 'productId',
        text: '物料名称',
        dictTable: 'product_inf',
        dictText: 'product_name',
        dictCode: 'product_id'
      })
      fieldList.push({ type: 'int', value: 'productStock', text: '物料库存', dictCode: '' })
      fieldList.push({ type: 'int', value: 'productionLot', text: '生产批量', dictCode: '' })
      fieldList.push({ type: 'int', value: 'dayProLot', text: '日均产量', dictCode: '' })
      fieldList.push({ type: 'int', value: 'maxDayProLot', text: '日最大生产量', dictCode: '' })
      fieldList.push({ type: 'int', value: 'productionCycle', text: '生产周期（天）', dictCode: '' })
      fieldList.push({ type: 'int', value: 'checkTimeA', text: 'A 组检验周期（天）', dictCode: '' })
      fieldList.push({ type: 'int', value: 'checkTimeB', text: 'B 组检验周期（天）', dictCode: '' })
      fieldList.push({ type: 'int', value: 'checkTimeC', text: 'C 组检验周期（天）', dictCode: '' })
      fieldList.push({ type: 'int', value: 'checkTimeD', text: 'D 组检验周期（天）', dictCode: '' })
      fieldList.push({
        type: 'string',
        value: 'transportTimeDescription',
        text: '检验周期（天）逻辑 关系',
        dictCode: ''
      })
      fieldList.push({ type: 'int', value: 'transportTime', text: 'ys周期（天）', dictCode: '' })
      fieldList.push({ type: 'string', value: 'firstAbilityIntUpdateTime', text: '录入时间', dictCode: '' })
      fieldList.push({ type: 'string', value: 'stuffId', text: '人员编号', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>
