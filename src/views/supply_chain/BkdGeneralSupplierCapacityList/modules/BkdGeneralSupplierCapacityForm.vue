<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="AAA编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierId">
              <a-input v-model="model.supplierId" placeholder="请输入AAA编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="AAA名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierName">
              <a-input v-model="model.supplierName" placeholder="请输入AAA名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <a-input-number placeholder="请输入物料编号" v-model="model.productId" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productName">
              <a-input v-model="model.productName" placeholder="请输入物料名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="单日生产速度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="singledayProductionSpeed">
              <a-input v-model="model.singledayProductionSpeed" placeholder="请输入单日生产速度"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="准备时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="prepTime">
              <a-input v-model="model.prepTime" placeholder="请输入准备时间"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="单日极限生产速度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="singledayLimitProductionSpeed">
              <a-input v-model="model.singledayLimitProductionSpeed" placeholder="请输入单日极限生产速度"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="极限准备时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="extremePreparationTime">
              <a-input v-model="model.extremePreparationTime" placeholder="请输入极限准备时间"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="最小CCC批量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="minimumSupplyLot">
              <a-input v-model="model.minimumSupplyLot" placeholder="请输入最小CCC批量"></a-input>
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
  name: 'BkdGeneralSupplierCapacityForm',
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
        lotId: ''
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
        // orderId: [{ required: true, message: '请输入订单编号!' }],
        // firstSupplierId: [{ required: true, message: '请输入AAA名称!' }],
        // productId: [{ required: true, message: '请输入物料名称!' }],
        // firstPurchaseId: [{ required: true, message: '请输入一级DDD编号!' }],
        // lotId: [{ required: true, message: '请输入批次编号!' }],
        // arrivalQuantity: [{ required: true, message: '请输入到货数量!' }],
        // arrivalData: [{ required: true, message: '请输入到货时间!' }],
        // passRate: [{ required: true, message: '请输入批次合格率!' }],
        // status: [{ required: true, message: '请输入状态!' }],
        // unit: [{ required: true, message: '请输入计量单位!' }]
      },
      url: {
        add: '/BkdGeneralSupplierCapacity/add',
        edit: '/BkdGeneralSupplierCapacity/edit',
        queryById: '/BkdGeneralSupplierCapacity/queryById'
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
    getLotId(this)
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
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
