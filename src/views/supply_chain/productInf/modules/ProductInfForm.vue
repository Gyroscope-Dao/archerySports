<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="物料编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <a-input v-model="model.productId" placeholder="请输入物料编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productName">
              <a-input v-model="model.productName" placeholder="请输入物料名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料类别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productUnit">
              <a-input v-model="model.productUnit" placeholder="请输入物料类别"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item
              label="物料规格"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              prop="productSpecification"
            >
              <a-input v-model="model.productSpecification" placeholder="请输入物料规格"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="计量单位" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productUnit">
              <a-input v-model="model.productUnit" placeholder="请输入计量单位"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料性质" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productNature">
              <a-input v-model="model.productNature" placeholder="请输入物料性质"></a-input>
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
  name: 'ProductInfForm',
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
        productId: ''
      },
      dictOptions: [
        {
          text: '特等重要',
          value: '特等重要'
        },
        {
          text: '一级重要',
          value: '一级重要'
        },
        {
          text: '二级重要',
          value: '二级重要'
        },
        {
          text: '三级重要',
          value: '三级重要'
        }
      ],
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
        productId: [{ required: true, message: '请输入物料编号!' }],
        productName: [{ required: true, message: '请输入物料名称!' }],
        productType: [{ required: true, message: '请输入物料类别!' }],
        productSpecification: [{ required: true, message: '请输入物料规格!' }],
        productUnit: [{ required: true, message: '请输入计量单位!' }],

        productNature: [{ required: true, message: '请输入物料性质!' }]
      },
      url: {
        add: '/productInf/productInf/add',
        edit: '/productInf/productInf/edit',

        queryById: '/productInf/productInf/queryById'
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
