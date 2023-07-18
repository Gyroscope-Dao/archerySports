<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item
              label="一级AAA名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              prop="firstSupplierId"
            >
              <j-search-select-tag
                v-model="model.firstSupplierId"
                dict="first_supplier_inf,supplier_name,first_supplier_id"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item
              label="二级AAA名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              prop="secondSupplierId"
            >
              <j-search-select-tag
                v-model="model.secondSupplierId"
                dict="second_supplier_inf,supplier_name,second_supplier_id"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="核心EEE名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="componentId">
              <!-- <j-search-select-tag v-model="model.componentId" dict="component_inf,component_name,component_id" /> -->
              <j-search-select-tag v-model="model.componentId" :dictOptions="dictOptions" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseTime">
              <j-date placeholder="请选择DDD时间" v-model="model.purchaseTime" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="purchaseNum">
              <a-input-number v-model="model.purchaseNum" placeholder="请输入DDD数量" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="DDD提前期（/天）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="leadTime">
              <a-input-number v-model="model.leadTime" placeholder="请输入DDD提前期（/天）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="约定交货期限" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="deliveryDate">
              <j-date placeholder="请选择约定交货期限" v-model="model.deliveryDate" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item
              label="实际交货日期"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              prop="actualDeliveryTime"
            >
              <j-date placeholder="请选择实际交货日期" v-model="model.actualDeliveryTime" style="width: 100%" />
            </a-form-model-item>
          </a-col>
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

export default {
  name: 'FirstPurchaseFromSecondForm',
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
      model: {},
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
        firstSupplierId: [{ required: true, message: '请输入一级AAA编号!' }],
        secondSupplierId: [{ required: true, message: '请输入二级AAA编号!' }],
        componentId: [{ required: true, message: '请输入核心EEE名称!' }],
        status: [{required: true, message: '请输入状态!'}],
        unit: [{required: true, message: '请输入计量单位!'}]
      },
      url: {
        add: '/firstPurchaseFromSecond/firstPurchaseFromSecond/add',
        edit: '/firstPurchaseFromSecond/firstPurchaseFromSecond/edit',
        queryById: '/firstPurchaseFromSecond/firstPurchaseFromSecond/queryById'
      },
      dictOptions: []
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    }
  },
  watch: {
    'model.secondSupplierId'(newvalue) {
      console.log(newvalue + '  发起请求')
      this.fetchSelectItem(newvalue)
    }
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
  },
  methods: {
    async fetchSelectItem(id) {
      let res = await axios('/firstPurchaseFromSecond/firstPurchaseFromSecond/components?secondSupplierId=' + id)
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
