<template>
  <a-card :bordered="false">
   <!-- 查询区域 -->
   <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位编号">
              <a-input placeholder="请输入单位编号" v-model="queryParam.etpId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位名称">
              <a-input placeholder="请输入单位名称" v-model="queryParam.eptName"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('往来单位信息表')">导出</a-button>
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

    <enterprise-inf-modal ref="modalForm" @ok="modalFormOk"></enterprise-inf-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import EnterpriseInfModal from './modules/EnterpriseInfModal'

  export default {
    name: 'EnterpriseInfList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      EnterpriseInfModal
    },
    data () {
      return {
        description: '往来单位信息表管理页面',
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
            title:'单位编号',
            align:"center",
            dataIndex: 'etpId'
          },
          {
            title:'单位名称',
            align:"center",
            dataIndex: 'eptName'
          },
          {
            title:'单位简称',
            align:"center",
            dataIndex: 'eptShortname'
          },
          {
            title:'助记码',
            align:"center",
            dataIndex: 'mnemonicCode'
          },
          {
            title:'税号',
            align:"center",
            dataIndex: 'dutyParagraph'
          },
          {
            title:'行政区域',
            align:"center",
            dataIndex: 'adminRegin'
          },
          {
            title:'单位地址',
            align:"center",
            dataIndex: 'address'
          },
          {
            title:'联系人',
            align:"center",
            dataIndex: 'contactPerson'
          },
          {
            title:'联系电话',
            align:"center",
            dataIndex: 'contactNumber'
          },
          {
            title:'法定代表人',
            align:"center",
            dataIndex: 'legalRepresent'
          },
          {
            title:'邮编',
            align:"center",
            dataIndex: 'postcode'
          },
          {
            title:'开户行名称',
            align:"center",
            dataIndex: 'bankName'
          },
          {
            title:'开户行账号',
            align:"center",
            dataIndex: 'bankAccount'
          },
          {
            title:'许可证编号',
            align:"center",
            dataIndex: 'permitId'
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
          list: "/enterpriseInf/enterpriseInf/list",
          delete: "/enterpriseInf/enterpriseInf/delete",
          deleteBatch: "/enterpriseInf/enterpriseInf/deleteBatch",
          exportXlsUrl: "/enterpriseInf/enterpriseInf/exportXls",
          importExcelUrl: "enterpriseInf/enterpriseInf/importExcel",

        },
        dictOptions:{},
        superFieldList:[],
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
        fieldList.push({type:'string',value:'etpId',text:'单位编号',dictCode:''})
        fieldList.push({type:'string',value:'eptName',text:'单位名称',dictCode:''})
        fieldList.push({type:'string',value:'eptShortname',text:'单位简称',dictCode:''})
        fieldList.push({type:'string',value:'mnemonicCode',text:'助记码',dictCode:''})
        fieldList.push({type:'string',value:'dutyParagraph',text:'税号',dictCode:''})
        fieldList.push({type:'string',value:'adminRegin',text:'行政区域',dictCode:''})
        fieldList.push({type:'string',value:'address',text:'单位地址',dictCode:''})
        fieldList.push({type:'string',value:'contactPerson',text:'联系人',dictCode:''})
        fieldList.push({type:'string',value:'contactNumber',text:'联系电话',dictCode:''})
        fieldList.push({type:'string',value:'legalRepresent',text:'法定代表人',dictCode:''})
        fieldList.push({type:'string',value:'postcode',text:'邮编',dictCode:''})
        fieldList.push({type:'string',value:'bankName',text:'开户行名称',dictCode:''})
        fieldList.push({type:'string',value:'bankAccount',text:'开户行账号',dictCode:''})
        fieldList.push({type:'string',value:'permitId',text:'许可证编号',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>