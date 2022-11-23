<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="零件信息编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="com1InfId">
              <a-input v-model="model.com1InfId" placeholder="请输入零件信息编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="一级供应商编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <a-input v-model="model.firstSupplierId" placeholder="请输入一级供应商编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="零件编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="componentId">
              <a-input v-model="model.componentId" placeholder="请输入零件编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="库存数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stockQuantity">
              <a-input-number v-model="model.stockQuantity" placeholder="请输入库存数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="采购提前期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseLeadTime">
              <a-input-number v-model="model.purchaseLeadTime" placeholder="请输入采购提前期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="信息更新时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="infUpdateTime">
              <j-date placeholder="请选择信息更新时间"  v-model="model.infUpdateTime" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="员工编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.stuffId" placeholder="请输入员工编号"  ></a-input>
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
              { required: true, message: '请输入零件信息编号!'},
           ],
           firstSupplierId: [
              { required: true, message: '请输入一级供应商编号!'},
           ],
           componentId: [
              { required: true, message: '请输入零件编号!'},
           ],
           stockQuantity: [
              { required: true, message: '请输入库存数量!'},
           ],
           purchaseLeadTime: [
              { required: true, message: '请输入采购提前期（天）!'},
           ],
           infUpdateTime: [
              { required: true, message: '请输入信息更新时间!'},
           ],
           stuffId: [
              { required: true, message: '请输入员工编号!'},
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