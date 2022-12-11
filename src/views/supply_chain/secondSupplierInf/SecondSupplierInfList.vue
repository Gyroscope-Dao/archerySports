<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('二级供应商')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text,record">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" :preview="record.id" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
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

    <second-supplier-inf-modal ref="modalForm" @ok="modalFormOk"></second-supplier-inf-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SecondSupplierInfModal from './modules/SecondSupplierInfModal'

  export default {
    name: 'SecondSupplierInfList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      SecondSupplierInfModal
    },
    data () {
      return {
        description: '二级供应商管理页面',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'二级供应商编号',
            align:"center",
            dataIndex: 'secondSupplierId'
          },
          {
            title:'供应商名称',
            align:"center",
            dataIndex: 'supplierName'
          },
          {
            title:'供应商名称简称',
            align:"center",
            dataIndex: 'supplierSimpleName'
          },
          {
            title:'供应商地址',
            align:"center",
            dataIndex: 'supplierAddress'
          },
          {
            title:'联系人',
            align:"center",
            dataIndex: 'contact'
          },
          {
            title:'联系电话',
            align:"center",
            dataIndex: 'contactNum'
          },
          {
            title:'税号',
            align:"center",
            dataIndex: 'taxId'
          },
          {
            title:'法定代表人',
            align:"center",
            dataIndex: 'legalPerson'
          },
          {
            title:'邮编',
            align:"center",
            dataIndex: 'postCode'
          },
          {
            title:'开户行名称',
            align:"center",
            dataIndex: 'bankName'
          },
          {
            title:'开户账号',
            align:"center",
            dataIndex: 'bankAccount'
          },
          {
            title:'录入时间',
            align:"center",
            dataIndex: 'infUpdateTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'员工编号',
            align:"center",
            dataIndex: 'stuffId'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/secondSupplierInf/secondSupplierInf/list",
          delete: "/secondSupplierInf/secondSupplierInf/delete",
          deleteBatch: "/secondSupplierInf/secondSupplierInf/deleteBatch",
          exportXlsUrl: "/secondSupplierInf/secondSupplierInf/exportXls",
          importExcelUrl: "secondSupplierInf/secondSupplierInf/importExcel",

        },
        dictOptions:{},
        superFieldList:[],
        my_isorter: {}
      }
    },
    created() {
    this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'secondSupplierId',text:'二级供应商编号',dictCode:''})
        fieldList.push({type:'string',value:'supplierName',text:'供应商名称',dictCode:''})
        fieldList.push({type:'string',value:'supplierSimpleName',text:'供应商名称简称',dictCode:''})
        fieldList.push({type:'string',value:'supplierAddress',text:'供应商地址',dictCode:''})
        fieldList.push({type:'string',value:'contact',text:'联系人',dictCode:''})
        fieldList.push({type:'string',value:'contactNum',text:'联系电话',dictCode:''})
        fieldList.push({type:'string',value:'taxId',text:'税号',dictCode:''})
        fieldList.push({type:'string',value:'legalPerson',text:'法定代表人',dictCode:''})
        fieldList.push({type:'string',value:'postCode',text:'邮编',dictCode:''})
        fieldList.push({type:'string',value:'bankName',text:'开户行名称',dictCode:''})
        fieldList.push({type:'string',value:'bankAccount',text:'开户账号',dictCode:''})
        fieldList.push({type:'date',value:'infUpdateTime',text:'录入时间'})
        fieldList.push({type:'string',value:'stuffId',text:'员工编号',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>