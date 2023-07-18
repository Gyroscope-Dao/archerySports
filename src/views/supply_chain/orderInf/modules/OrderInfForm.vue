<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="订单编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orderId">
              <a-input v-model="model.orderId" placeholder="请输入订单编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交货期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="deliveryDate">
              <j-date placeholder="请选择交货期" v-model="model.deliveryDate" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="实际交货期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="realDeliveryDate">
              <j-date placeholder="请选择实际交货期" v-model="model.realDeliveryDate" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" style="display: none;">
            <a-form-model-item label="员工编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.stuffId" placeholder="请输入员工编号" disabled></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" style="display: none;">
            <a-form-model-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="infUpdateTime">
              <j-date placeholder="请选择录入时间" v-model="model.infUpdateTime" style="width: 100%" disabled />
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
  name: 'OrderInfForm',
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
        orderId: '',
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
        orderId: [{ required: true, message: '请输入订单编号!' }],
        deliveryDate: [{ required: true, message: '请输入交货期!' }],
        realDeliveryDate: [{ required: true, message: '请输入实际交货期!' }],
        stuffId: [{ required: true, message: '请输入员工编号!' }],
        infUpdateTime: [{ required: true, message: '请输入录入时间!' }]
      },
      url: {
        add: '/orderInf/orderInf/add',
        edit: '/orderInf/orderInf/edit',
        queryById: '/orderInf/orderInf/queryById'
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
