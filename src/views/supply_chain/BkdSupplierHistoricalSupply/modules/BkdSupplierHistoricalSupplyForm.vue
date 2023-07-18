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
            <a-form-model-item label="AAA名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierName">
              <a-input v-model="model.supplierName" placeholder="请输入AAA名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="AAA编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierId">
              <a-input-number placeholder="请输入AAA编号" v-model="model.supplierId" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productName">
              <a-input v-model="model.productName" placeholder="请输入物料名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="物料编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productId">
              <a-input v-model="model.productId" placeholder="请输入物料编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="下单时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orderTime">
              <j-date v-model="model.orderTime" placeholder="请输入下单时间"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="订单总量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orderCount">
              <a-input v-model="model.orderCount" placeholder="请输入订单总量"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="第一波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplyTime">
              <j-date v-model="model.firstSupplyTime" placeholder="请输入第一波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="第一波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplyCount">
              <a-input v-model="model.firstSupplyCount" placeholder="请输入第一波CCC数量"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="第二波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="secondSupplyTime">
              <j-date v-model="model.secondSupplyTime" placeholder="请输入第二波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="第二波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="secondSupplyCount">
              <a-input v-model="model.secondSupplyCount" placeholder="请输入第二波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第三波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="thirdSupplyTime">
              <j-date v-model="model.thirdSupplyTime" placeholder="请输入第三波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第三波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="thirdSupplyCount">
              <a-input v-model="model.thirdSupplyCount" placeholder="请输入第三波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第四波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fourthSupplyTime">
              <j-date v-model="model.fourthSupplyTime" placeholder="请输入第四波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第四波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fourthSupplyCount">
              <a-input v-model="model.fourthSupplyCount" placeholder="请输入第四波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第五波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fifthSupplyTime">
              <j-date v-model="model.fifthSupplyTime" placeholder="请输入第五波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第五波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fifthSupplyCount">
              <a-input v-model="model.fifthSupplyCount" placeholder="请输入第五波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第六波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="sixthSupplyTime">
              <j-date v-model="model.sixthSupplyTime" placeholder="请输入第六波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第六波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="sixthSupplyCount">
              <a-input v-model="model.sixthSupplyCount" placeholder="请输入第六波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第七波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="seventhSupplyTime">
              <j-date v-model="model.seventhSupplyTime" placeholder="请输入第七波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第七波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="seventhSupplyCount">
              <a-input v-model="model.seventhSupplyCount" placeholder="请输入第七波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第八波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="eighthSupplyTime">
              <j-date v-model="model.eighthSupplyTime" placeholder="请输入第八波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第八波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="eighthSupplyCount">
              <j-date v-model="model.eighthSupplyCount" placeholder="请输入第八波CCC数量"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第九波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="ninthSupplyTime">
              <j-date v-model="model.ninthSupplyTime" placeholder="请输入第九波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第九波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="ninthSupplyCount">
              <a-input v-model="model.ninthSupplyCount" placeholder="请输入第九波CCC数量"></a-input>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第十波CCC时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tenthSupplyTime">
              <j-date v-model="model.tenthSupplyTime" placeholder="请输入第十波CCC时间"
              :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-model-item>
          </a-col><a-col :span="24">
            <a-form-model-item label="第十波CCC数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tenthSupplyCount">
              <a-input v-model="model.tenthSupplyCount" placeholder="请输入第十波CCC数量"></a-input>
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
  name: 'BkdSupplierHistoricalSupplyForm',
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
        orderId: [{ required: true, message: '请输入订单编号!' }],
        firstSupplierId: [{ required: true, message: '请输入AAA名称!' }],
        productId: [{ required: true, message: '请输入物料名称!' }],
        firstPurchaseId: [{ required: true, message: '请输入一级DDD编号!' }],
        lotId: [{ required: true, message: '请输入批次编号!' }],
        arrivalQuantity: [{ required: true, message: '请输入到货数量!' }],
        arrivalData: [{ required: true, message: '请输入到货时间!' }],
        passRate: [{ required: true, message: '请输入批次合格率!' }],
        status: [{ required: true, message: '请输入状态!' }],
        unit: [{ required: true, message: '请输入计量单位!' }]
      },
      url: {
        add: '/bkdSupplierHistoricalSupply/add',
        edit: '/bkdSupplierHistoricalSupply/edit',
        queryById: '/bkdSupplierHistoricalSupply/queryById'
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
