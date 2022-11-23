<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="生产信息id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="proInfId">
              <a-input v-model="model.proInfId" placeholder="请输入生产信息id"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <a-input v-model="model.firstSupplierId" placeholder="请输入供应商编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="成品编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <a-input v-model="model.productId" placeholder="请输入成品编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="成品名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productName">
              <a-input v-model="model.productName" placeholder="请输入成品名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="成品库存" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productStock">
              <a-input-number v-model="model.productStock" placeholder="请输入成品库存" style="width: 100%" />
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
            <a-form-model-item label="检验周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="checkTime">
              <a-input-number v-model="model.checkTime" placeholder="请输入检验周期（天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="运输周期（天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="transportTime">
              <a-input-number v-model="model.transportTime" placeholder="请输入运输周期（天）" style="width: 100%" />
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
           proInfId: [
              { required: true, message: '请输入生产信息id!'},
           ],
           firstSupplierId: [
              { required: true, message: '请输入供应商编号!'},
           ],
           productId: [
              { required: true, message: '请输入成品编号!'},
           ],
           productName: [
              { required: true, message: '请输入成品名称!'},
           ],
           productStock: [
              { required: true, message: '请输入成品库存!'},
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
           checkTime: [
              { required: true, message: '请输入检验周期（天）!'},
           ],
           transportTime: [
              { required: true, message: '请输入运输周期（天）!'},
           ],
           infUpdateTime: [
              { required: true, message: '请输入信息更新时间!'},
           ],
           stuffId: [
              { required: true, message: '请输入员工编号!'},
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