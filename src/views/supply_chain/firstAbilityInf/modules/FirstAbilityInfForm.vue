<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="一级供应商名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <j-search-select-tag v-model="model.firstSupplierId" dict="first_supplier_inf,supplier_name,first_supplier_id"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="产品名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <j-search-select-tag v-model="model.productId" dict="product_inf,product_name,product_id"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="产品库存" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productStock">
              <a-input-number v-model="model.productStock" placeholder="请输入产品库存" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="生产批量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productionLot">
              <a-input-number v-model="model.productionLot" placeholder="请输入生产批量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="日均产量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="dayProLot">
              <a-input-number v-model="model.dayProLot" placeholder="请输入日均产量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="日最大生产量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="maxDayProLot">
              <a-input-number v-model="model.maxDayProLot" placeholder="请输入日最大生产量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="生产周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productionCycle">
              <a-input-number v-model="model.productionCycle" placeholder="请输入生产周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="A 组检验周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeA">
              <a-input-number v-model="model.checkTimeA" placeholder="请输入A 组检验周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="B 组检验周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeB">
              <a-input-number v-model="model.checkTimeB" placeholder="请输入B 组检验周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="C 组检验周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeC">
              <a-input-number v-model="model.checkTimeC" placeholder="请输入C 组检验周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="D 组检验周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeD">
              <a-input-number v-model="model.checkTimeD" placeholder="请输入D 组检验周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="检验周期（天）逻辑 关系" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="transportTimeDescription">
              <a-input v-model="model.transportTimeDescription" placeholder="请输入检验周期（天）逻辑 关系"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="运输周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="transportTime">
              <a-input-number v-model="model.transportTime" placeholder="请输入运输周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstAbilityIntUpdateTime">
              <a-input v-model="model.firstAbilityIntUpdateTime" placeholder="请输入录入时间" disabled ></a-input>
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
  import { getFirstSupplierId,getTime,getStuffId,getSimulationId,getEtpId,getOrderId,getLotId,getProductId,getComponentId,getSecondSupplierId } from '@/utils/generateRule'

  export default {
    name: 'FirstAbilityInfForm',
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
          firstAbilityIntUpdateTime: '',
          stuffId: '',
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
           firstSupplierId: [
              { required: true, message: '请输入一级供应商名称!'},
           ],
           productId: [
              { required: true, message: '请输入产品名称!'},
           ],
           productStock: [
              { required: true, message: '请输入产品库存!'},
           ],
           productionLot: [
              { required: true, message: '请输入生产批量!'},
           ],
           dayProLot: [
              { required: true, message: '请输入日均产量!'},
           ],
           maxDayProLot: [
              { required: true, message: '请输入日最大生产量!'},
           ],
           productionCycle: [
              { required: true, message: '请输入生产周期（天）!'},
           ],
           checkTimeA: [
              { required: true, message: '请输入A 组检验周期（天）!'},
           ],
           checkTimeB: [
              { required: true, message: '请输入B 组检验周期（天）!'},
           ],
           checkTimeC: [
              { required: true, message: '请输入C 组检验周期（天）!'},
           ],
           checkTimeD: [
              { required: true, message: '请输入D 组检验周期（天）!'},
           ],
           transportTimeDescription: [
              { required: true, message: '请输入检验周期（天）逻辑 关系!'},
           ],
           transportTime: [
              { required: true, message: '请输入运输周期（天）!'},
           ],
        },
        url: {
          add: "/firstAbilityInf/firstAbilityInf/add",
          edit: "/firstAbilityInf/firstAbilityInf/edit",
          queryById: "/firstAbilityInf/firstAbilityInf/queryById"
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
      getTime(this);
      getStuffId(this);
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