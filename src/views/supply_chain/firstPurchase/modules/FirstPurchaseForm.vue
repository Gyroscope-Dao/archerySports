<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="采购编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchase1Id">
              <a-input v-model="model.purchase1Id" placeholder="请输入采购编号"  ></a-input>
            </a-form-model-item>
          </a-col>
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
            <a-form-model-item label="采购时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseTime">
              <j-date placeholder="请选择采购时间" v-model="model.purchaseTime"  style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="产品名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productName">
              <a-input v-model="model.productName" placeholder="请输入产品名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="采购比例" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchasePercent">
              <a-input-number v-model="model.purchasePercent" placeholder="请输入采购比例" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="采购数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseQuantity">
              <a-input-number v-model="model.purchaseQuantity" placeholder="请输入采购数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="采购提前期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseLeadTime">
              <a-input-number v-model="model.purchaseLeadTime" placeholder="请输入采购提前期" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交货期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="deliveryDate">
              <j-date placeholder="请选择交货期" v-model="model.deliveryDate"  style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="实际交货期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="realDeliveryDate">
              <j-date placeholder="请选择实际交货期" v-model="model.realDeliveryDate"  style="width: 100%" />
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
    name: 'FirstPurchaseForm',
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
           purchase1Id: [
              { required: true, message: '请输入采购编号!'},
           ],
           orderId: [
              { required: true, message: '请输入订单编号!'},
           ],
           firstSupplierId: [
              { required: true, message: '请输入供应商编号!'},
           ],
           productId: [
              { required: true, message: '请输入产品编号!'},
           ],
           purchaseTime: [
              { required: true, message: '请输入采购时间!'},
           ],
           productName: [
              { required: true, message: '请输入产品名称!'},
           ],
           purchasePercent: [
              { required: true, message: '请输入采购比例!'},
           ],
           purchaseQuantity: [
              { required: true, message: '请输入采购数量!'},
           ],
           purchaseLeadTime: [
              { required: true, message: '请输入采购提前期!'},
           ],
           deliveryDate: [
              { required: true, message: '请输入交货期!'},
           ],
           realDeliveryDate: [
              { required: true, message: '请输入实际交货期!'},
           ],
        },
        url: {
          add: "/firstPurchase/firstPurchase/add",
          edit: "/firstPurchase/firstPurchase/edit",
          queryById: "/firstPurchase/firstPurchase/queryById"
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