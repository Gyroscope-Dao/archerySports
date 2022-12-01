<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="核心部件名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="com1InfId">
              <j-search-select-tag v-model="model.com1InfId" dict="component_inf,component_name,component_id"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="一级供应商名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <j-search-select-tag v-model="model.firstSupplierId" dict="first_supplier_inf,supplier_name,first_supplier_id"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="库存数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stockQuantity">
              <a-input-number v-model="model.stockQuantity" placeholder="请输入库存数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="采购周期 （天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseLeadTime">
              <a-input-number v-model="model.purchaseLeadTime" placeholder="请输入采购周期 （天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="infUpdateTime">
              <j-date placeholder="请选择录入时间" v-model="model.infUpdateTime"  style="width: 100%" disabled/>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="人员编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.stuffId" placeholder="请输入人员编号" disabled ></a-input>
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

  export default {
    name: 'FirstComponentInventoryForm',
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
           com1InfId: [
              { required: true, message: '请输入核心部件名称!'},
           ],
           firstSupplierId: [
              { required: true, message: '请输入一级供应商名称!'},
           ],
           stockQuantity: [
              { required: true, message: '请输入库存数量!'},
           ],
           purchaseLeadTime: [
              { required: true, message: '请输入采购周期 （天）!'},
           ],
           infUpdateTime: [
              { required: true, message: '请输入录入时间!'},
           ],
           stuffId: [
              { required: true, message: '请输入人员编号!'},
           ],
        },
        url: {
          add: "/firstComponentInventory/firstComponentInventory/add",
          edit: "/firstComponentInventory/firstComponentInventory/edit",
          queryById: "/firstComponentInventory/firstComponentInventory/queryById"
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