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
            <a-form-item label="一级AAA名称">
              <a-input placeholder="请输入AAA名称" v-model="queryParam.supplierName"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('一级AAA')">导出</a-button>
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

    <first-supplier-inf-modal ref="modalForm" @ok="modalFormOk"></first-supplier-inf-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import FirstSupplierInfModal from './modules/FirstSupplierInfModal'
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: 'FirstSupplierInfList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      FirstSupplierInfModal
    },
    data () {
      return {
        description: '一级AAA管理页面',
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
            title:'一级AAA编号',
            align:"center",
            dataIndex: 'firstSupplierId'
          },
          {
            title:'AAA名称',
            align:"center",
            dataIndex: 'supplierName'
          },
          {
            title:'AAA名称简称',
            align:"center",
            dataIndex: 'supplierSimpleName'
          },
          {
            title:'AAA地址',
            align:"center",
            dataIndex: 'supplierAddress'
          },
          {
            title:'地区',
            align:"center",
            dataIndex: 'region'
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
            title:'是否民口企业',
            align:"center",
            dataIndex: 'privateEnterprise_dictText'
          },
          {
            title:'是否瓶颈AAA',
            align:"center",
            dataIndex: 'battleneckSupplier_dictText'
          },
          {
            title:'是否生产瓶颈AAA',
            align:"center",
            dataIndex: 'isProduct_dictText'
          },
          {
            title:'是否生产瓶颈AAA',
            align:"center",
            dataIndex: 'isProduct_dictText'
          },
          {
            title:'最小CCC批量',
            align:"center",
            dataIndex: 'miniPurchase'
          },
          {
            title:'AAA资质',
            align:"center",
            dataIndex: 'certification'
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
            title:'往来单位信息名称',
            align:"center",
            dataIndex: 'eptId_dictText'
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
            title:'成立年份',
            align:"center",
            dataIndex: 'estabYear'
          },
          {
            title:'企业征信',
            align:"center",
            dataIndex: 'corporateCredit'
          },
          {
            title:'人员编号',
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
          list: "/firstSupplierInf/firstSupplierInf/list",
          delete: "/firstSupplierInf/firstSupplierInf/delete",
          deleteBatch: "/firstSupplierInf/firstSupplierInf/deleteBatch",
          exportXlsUrl: "/firstSupplierInf/firstSupplierInf/exportXls",
          importExcelUrl: "firstSupplierInf/firstSupplierInf/importExcel",

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
        fieldList.push({type:'string',value:'firstSupplierId',text:'一级AAA编号',dictCode:''})
        fieldList.push({type:'string',value:'supplierName',text:'AAA名称',dictCode:''})
        fieldList.push({type:'string',value:'supplierSimpleName',text:'AAA名称简称',dictCode:''})
        fieldList.push({type:'string',value:'supplierAddress',text:'AAA地址',dictCode:''})
        fieldList.push({type:'string',value:'contact',text:'联系人',dictCode:''})
        fieldList.push({type:'string',value:'contactNum',text:'联系电话',dictCode:''})
        fieldList.push({type:'string',value:'taxId',text:'税号',dictCode:''})
        fieldList.push({type:'int',value:'privateEnterprise',text:'是否民口企业',dictCode:'yn'})
        fieldList.push({type:'int',value:'battleneckSupplier',text:'是否瓶颈AAA',dictCode:'yn'})
        fieldList.push({type:'string',value:'certification',text:'AAA资质',dictCode:''})
        fieldList.push({type:'string',value:'legalPerson',text:'法定代表人',dictCode:''})
        fieldList.push({type:'string',value:'postCode',text:'邮编',dictCode:''})
        fieldList.push({type:'string',value:'bankName',text:'开户行名称',dictCode:''})
        fieldList.push({type:'string',value:'bankAccount',text:'开户账号',dictCode:''})
        fieldList.push({type:'sel_search',value:'eptId',text:'往来单位信息名称',dictTable:"enterprise_inf", dictText:'ept_name', dictCode:'etp_id'})
        fieldList.push({type:'date',value:'infUpdateTime',text:'录入时间'})
        fieldList.push({type:'int',value:'isProduct',text:'是否生产瓶颈AAA',dictCode:'yn'})
        fieldList.push({type:'int',value:'isPurchase',text:'是否DDD瓶颈AAA',dictCode:'yn'})
        fieldList.push({type:'int',value:'estabYear',text:'成立年份',dictCode:''})
        fieldList.push({type:'string',value:'corporateCredit',text:'企业征信',dictCode:''})
        fieldList.push({type:'string',value:'stuffId',text:'人员编号',dictCode:''})
        fieldList.push({type:'string',value:'region',text:'地域',dictCode:''})
        fieldList.push({type:'string',value:'miniPurchase',text:'最小CCC批量',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>