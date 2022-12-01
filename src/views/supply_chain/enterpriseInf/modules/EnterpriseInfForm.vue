<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="单位编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="etpId">
              <a-input v-model="model.etpId" placeholder="请输入单位编号" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="eptName">
              <a-input v-model="model.eptName" placeholder="请输入单位名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="单位简称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="eptShortname">
              <a-input v-model="model.eptShortname" placeholder="请输入单位简称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="助记码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="mnemonicCode">
              <a-input v-model="model.mnemonicCode" placeholder="请输入助记码"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="税号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="dutyParagraph">
              <a-input v-model="model.dutyParagraph" placeholder="请输入税号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="行政区域" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="adminRegin">
              <a-input v-model="model.adminRegin" placeholder="请输入行政区域"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="单位地址" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="address">
              <a-input v-model="model.address" placeholder="请输入单位地址"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="contactPerson">
              <a-input v-model="model.contactPerson" placeholder="请输入联系人"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="contactNumber">
              <a-input v-model="model.contactNumber" placeholder="请输入联系电话"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="法定代表人" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="legalRepresent">
              <a-input v-model="model.legalRepresent" placeholder="请输入法定代表人"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="邮编" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="postcode">
              <a-input v-model="model.postcode" placeholder="请输入邮编"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="开户行名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bankName">
              <a-input v-model="model.bankName" placeholder="请输入开户行名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="开户行账号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bankAccount">
              <a-input v-model="model.bankAccount" placeholder="请输入开户行账号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="许可证编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="permitId">
              <a-input v-model="model.permitId" placeholder="请输入许可证编号"  ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'
  import { getFirstSupplierId,getTime,getStuffId,getSimulationId,getEtpId,getOrderId,getLotId,getProductId,getComponentId,getSecondSupplierId } from '@/utils/generateRule'

  export default {
    name: 'EnterpriseInfForm',
    components: {
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        model:{
          etpId: '',
         },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
           etpId: [
              { required: true, message: '请输入单位编号!'},
           ],
           eptName: [
              { required: true, message: '请输入单位名称!'},
           ],
           eptShortname: [
              { required: true, message: '请输入单位简称!'},
           ],
           mnemonicCode: [
              { required: true, message: '请输入助记码!'},
           ],
           dutyParagraph: [
              { required: true, message: '请输入税号!'},
           ],
           adminRegin: [
              { required: true, message: '请输入行政区域!'},
           ],
           address: [
              { required: true, message: '请输入单位地址!'},
           ],
           contactPerson: [
              { required: true, message: '请输入联系人!'},
           ],
           contactNumber: [
              { required: true, message: '请输入联系电话!'},
           ],
           legalRepresent: [
              { required: true, message: '请输入法定代表人!'},
           ],
           postcode: [
              { required: true, message: '请输入邮编!'},
           ],
           bankName: [
              { required: true, message: '请输入开户行名称!'},
           ],
           bankAccount: [
              { required: true, message: '请输入开户行账号!'},
           ],
           permitId: [
              { required: true, message: '请输入许可证编号!'},
           ],
        },
        url: {
          add: "/enterpriseInf/enterpriseInf/add",
          edit: "/enterpriseInf/enterpriseInf/edit",
          queryById: "/enterpriseInf/enterpriseInf/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
       //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
      getEtpId(this);
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
         
        })
      },
    }
  }
</script>