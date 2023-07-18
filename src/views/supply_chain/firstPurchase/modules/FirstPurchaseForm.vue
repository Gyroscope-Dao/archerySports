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
            <a-form-model-item label="订单名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseName">
              <a-input v-model="model.purchaseName" placeholder="请输入订单名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="AAA名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <j-search-select-tag v-model="model.firstSupplierId"
                dict="first_supplier_inf,supplier_name,first_supplier_id" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <!-- <j-search-select-tag v-model="model.productId" dict="product_inf,product_name,product_id" /> -->
              <j-search-select-tag v-model="model.productId" :dictOptions="dictOptions" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="一级DDD编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstPurchaseid">
              <a-input v-model="model.firstPurchaseid" placeholder="请输入一级DDD编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD瓶颈AAA" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bottleneckSid">
              <j-search-select-tag v-model="model.bottleneckSid"
                dict="first_supplier_inf,supplier_name,first_supplier_id" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseTime">
              <j-date placeholder="请选择DDD时间" v-model="model.purchaseTime" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD比例" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchasePercent">
              <a-input-number v-model="model.purchasePercent" placeholder="请输入DDD比例" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseQuantity">
              <a-input-number v-model="model.purchaseQuantity" placeholder="请输入DDD数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD提前期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseLeadTime">
              <a-input-number v-model="model.purchaseLeadTime" placeholder="请输入DDD提前期" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="BBB周期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseCycle">
              <a-input-number v-model="model.purchaseCycle" placeholder="请输入BBB周期" style="width: 100%" />
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
          <!-- <a-col :span="24">
            <a-form-model-item label="物料编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productid">
              <a-input-number placeholder="请输入物料编号" v-model="model.productid" style="width: 100%" />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="24">
            <a-form-model-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="status">
              <a-input-number placeholder="请输入状态" v-model="model.status" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="计量单位" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="unit">
              <a-input-number placeholder="请输入计量单位" v-model="model.unit" style="width: 100%" />
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
import { axios } from '@/utils/request'
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
  getSecondSupplierId,
  getPurchaseOrderId
} from '@/utils/generateRule'

export default {
  name: 'FirstPurchaseForm',
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
        orderId: ''
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
        purchaseName: [{ required: true, message: '请输入订单名称!' }],
        firstSupplierId: [{ required: true, message: '请输入AAA名称!' }],
        productId: [{ required: true, message: '请输入物料名称!' }],
        firstPurchaseid: [{ required: true, message: '请输入一级DDD编号!' }],
        bottleneckSid: [{ required: true, message: '请输入DDD瓶颈AAA!' }],
        purchaseTime: [{ required: true, message: '请输入DDD时间!' }],
        purchasePercent: [{ required: true, message: '请输入DDD比例!' }],
        purchaseQuantity: [{ required: true, message: '请输入DDD数量!' }],
        purchaseLeadTime: [{ required: true, message: '请输入DDD提前期!' }],
        purchaseCycle: [{ required: true, message: '请输入BBB周期!' }],
        deliveryDate: [{ required: true, message: '请输入交货期!' }],
        realDeliveryDate: [{ required: true, message: '请输入实际交货期!' }],
        productid: [{ required: true, message: '请输入物料编号!' }],
        status: [{ required: true, message: '请输入状态!' }],
        unit: [{ required: true, message: '请输入计量单位!' }]
      },

      url: {
        add: '/firstPurchase/firstPurchase/add',
        edit: '/firstPurchase/firstPurchase/edit',
        queryById: '/firstPurchase/firstPurchase/queryById'
      },
      dictOptions: []
    }
  },
  watch: {
    'model.firstSupplierId'(newvalue) {
      console.log(newvalue + '  发起请求')
      this.fetchSelectItem(newvalue)
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
  },
  methods: {
    async fetchSelectItem(id) {
      let res = await axios('/firstPurchase/firstPurchase/products?firstSupplierId=' + id)
      this.dictOptions = res.result
      console.log(res.result)
    },
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
                that.$emit('error')
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
