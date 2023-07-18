<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item
              label="二级AAA编号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              prop="secondSupplierId"
            >
              <a-input v-model="model.secondSupplierId" placeholder="请输入二级AAA编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="AAA名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierName">
              <a-input v-model="model.supplierName" placeholder="请输入AAA名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item
              label="AAA名称简称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              prop="supplierSimpleName"
            >
              <a-input v-model="model.supplierSimpleName" placeholder="请输入AAA名称简称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="AAA地址" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierAddress">
              <a-input v-model="model.supplierAddress" placeholder="请输入AAA地址"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="地区" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="region">
              <a-input v-model="model.region" placeholder="请输入AAA地区"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="contact">
              <a-input v-model="model.contact" placeholder="请输入联系人"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="contactNum">
              <a-input v-model="model.contactNum" placeholder="请输入联系电话"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="税号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="taxId">
              <a-input v-model="model.taxId" placeholder="请输入税号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="法定代表人" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="legalPerson">
              <a-input v-model="model.legalPerson" placeholder="请输入法定代表人"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="邮编" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="postCode">
              <a-input v-model="model.postCode" placeholder="请输入邮编"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="开户行名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bankName">
              <a-input v-model="model.bankName" placeholder="请输入开户行名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="开户账号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bankAccount">
              <a-input v-model="model.bankAccount" placeholder="请输入开户账号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="最小CCC批量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="miniPurchase">
              <a-input-number v-model="model.miniPurchase" placeholder="请输入最小CCC批量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" style="display: none;">
            <a-form-model-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="infUpdateTime">
              <j-date placeholder="请选择录入时间" v-model="model.infUpdateTime" style="width: 100%" disabled />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" style="display: none;">
            <a-form-model-item label="员工编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.stuffId" placeholder="请输入员工编号" disabled></a-input>
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
import {
  getFirstSupplierId,
  getTime,
  getStuffId,
  getSimulationId,
  getEtpId,
  getOrderId,
  getLotId,
  getProductId,
  getComponentId,
  getSecondSupplierId
} from '@/utils/generateRule'

export default {
  name: 'SecondSupplierInfForm',
  components: {},
  props: {
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      model: {
        secondSupplierId: '',
        stuffId: '',
        infUpdateTime: ''
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      validatorRules: {
        secondSupplierId: [{ required: true, message: '请输入二级AAA编号!' }],
        supplierName: [{ required: true, message: '请输入AAA名称!' }],
        supplierSimpleName: [{ required: true, message: '请输入AAA名称简称!' }],
        supplierAddress: [{ required: true, message: '请输入AAA地址!' }],
        contact: [{ required: true, message: '请输入联系人!' }],
        miniPurchase: [{ required: true, message: '请输入最小CCC批量!' }],
        supplierAddress: [{ required: true, message: '请输入AAA地址!' }],
        contactNum: [
          { required: true, message: '请输入联系电话!' },
          { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号！' }
        ]
      },
      url: {
        add: '/secondSupplierInf/secondSupplierInf/add',
        edit: '/secondSupplierInf/secondSupplierInf/edit',
        queryById: '/secondSupplierInf/secondSupplierInf/queryById'
      }
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    }
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
    getStuffId(this)
    getTime(this)
  },
  methods: {
    add() {
      this.edit(this.modelDefault)
    },
    edit(record) {
      this.model = Object.assign({}, record)
      this.visible = true
    },
    submitForm() {
      const that = this
      // 触发表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          httpAction(httpurl, this.model, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    }
  }
}
</script>
