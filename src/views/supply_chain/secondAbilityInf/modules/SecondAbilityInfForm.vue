<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="二级供应商名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="secondSupplierId">
              <j-search-select-tag v-model="model.secondSupplierId" dict="second_supplier_inf,supplier_name,second_supplier_id"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="核心部件名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="componentId">
              <j-search-select-tag v-model="model.componentId" dict="component_inf,component_name,component_id"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="库存数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stockQuantity">
              <a-input-number v-model="model.stockQuantity" placeholder="请输入库存数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="日均产量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="dailyProductionCapacity">
              <a-input-number v-model="model.dailyProductionCapacity" placeholder="请输入日均产量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="生产周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTime">
              <a-input-number v-model="model.checkTime" placeholder="请输入生产周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物流周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="transportTime">
              <a-input-number v-model="model.transportTime" placeholder="请输入物流周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="A 组检验周期 （天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeA">
              <a-input-number v-model="model.checkTimeA" placeholder="请输入A 组检验周期 （天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="B 组检验周期 （天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeB">
              <a-input-number v-model="model.checkTimeB" placeholder="请输入B 组检验周期 （天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="C 组检验周期 （天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeC">
              <a-input v-model="model.checkTimeC" placeholder="请输入C 组检验周期 （天）"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="D 组检验周期 （天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTimeD">
              <a-input v-model="model.checkTimeD" placeholder="请输入D 组检验周期 （天）"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="检验周期（天） 逻辑关系" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="transportTimeDescription">
              <a-input v-model="model.transportTimeDescription" placeholder="请输入检验周期（天） 逻辑关系"  ></a-input>
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
  import { getFirstSupplierId,getTime,getStuffId,getSimulationId,getEtpId,getOrderId,getLotId,getProductId,getComponentId,getSecondSupplierId } from '@/utils/generateRule'

  export default {
    name: 'SecondAbilityInfForm',
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
          infUpdateTime: '',
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
           secondSupplierId: [
              { required: true, message: '请输入二级供应商名称!'},
           ],
           componentId: [
              { required: true, message: '请输入核心部件名称!'},
           ],
        },
        url: {
          add: "/secondAbilityInf/secondAbilityInf/add",
          edit: "/secondAbilityInf/secondAbilityInf/edit",
          queryById: "/secondAbilityInf/secondAbilityInf/queryById"
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
        getTime(this);
        getStuffId(this);
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