<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="订单编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orderId">
              <a-input v-model="model.orderId" placeholder="请输入订单编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <a-input v-model="model.firstSupplierId" placeholder="请输入供应商编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="产品编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <a-input v-model="model.productId" placeholder="请输入产品编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="一级采购编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstPurchaseId">
              <a-input v-model="model.firstPurchaseId" placeholder="请输入一级采购编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="批次编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="lotId">
              <a-input v-model="model.lotId" placeholder="请输入批次编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="到货数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="arrivalQuantity">
              <a-input-number v-model="model.arrivalQuantity" placeholder="请输入到货数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="到货时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="arrivalData">
              <j-date placeholder="请选择到货时间"  v-model="model.arrivalData" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="批次合格率" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="passRate">
              <a-input-number v-model="model.passRate" placeholder="请输入批次合格率" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="总批次量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="batchNumber">
              <a-input-number v-model="model.batchNumber" placeholder="请输入总批次量" style="width: 100%" />
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
    name: 'OrderdetailForm',
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
           orderId: [
              { required: true, message: '请输入订单编号!'},
           ],
           firstSupplierId: [
              { required: true, message: '请输入供应商编号!'},
           ],
           productId: [
              { required: true, message: '请输入产品编号!'},
           ],
           firstPurchaseId: [
              { required: true, message: '请输入一级采购编号!'},
           ],
           lotId: [
              { required: true, message: '请输入批次编号!'},
           ],
           arrivalQuantity: [
              { required: true, message: '请输入到货数量!'},
           ],
           arrivalData: [
              { required: true, message: '请输入到货时间!'},
           ],
           passRate: [
              { required: true, message: '请输入批次合格率!'},
           ],
        },
        url: {
          add: "/orderdetail/orderdetail/add",
          edit: "/orderdetail/orderdetail/edit",
          queryById: "/orderdetail/orderdetail/queryById"
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