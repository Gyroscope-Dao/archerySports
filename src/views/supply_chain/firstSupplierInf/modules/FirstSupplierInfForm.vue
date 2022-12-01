<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="一级供应商编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firstSupplierId">
              <a-input v-model="model.firstSupplierId" placeholder="请输入一级供应商编号" disabled></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierName">
              <a-input v-model="model.supplierName" placeholder="请输入供应商名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商名称简称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierSimpleName">
              <a-input v-model="model.supplierSimpleName" placeholder="请输入供应商名称简称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商地址" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierAddress">
              <a-input v-model="model.supplierAddress" placeholder="请输入供应商地址"></a-input>
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
            <a-form-model-item label="是否民口企业" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="privateEnterprise">
              <j-dict-select-tag type="list" v-model="model.privateEnterprise" dictCode="yn" placeholder="请选择是否民口企业" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否瓶颈供应商" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="battleneckSupplier">
              <j-dict-select-tag type="list" v-model="model.battleneckSupplier" dictCode="yn"
                placeholder="请选择是否瓶颈供应商" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商资质" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="certification">
              <a-input v-model="model.certification" placeholder="请输入供应商资质"></a-input>
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
            <a-form-model-item label="往来单位信息名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="eptId">
              <j-search-select-tag v-model="model.eptId" dict="enterprise_inf,ept_name,etp_id" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="infUpdateTime">
              <j-date placeholder="请选择录入时间" v-model="model.infUpdateTime" style="width: 100%" disabled />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否生产瓶颈供应商" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="isProduct">
              <j-dict-select-tag type="list" v-model="model.isProduct" dictCode="yn" placeholder="请选择是否生产瓶颈供应商" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否采购瓶颈供应商" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="isPurchase">
              <j-dict-select-tag type="list" v-model="model.isPurchase" dictCode="yn" placeholder="请选择是否采购瓶颈供应商" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="成立年份" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="estabYear">
              <a-input-number v-model="model.estabYear" placeholder="请输入成立年份" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="企业征信" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="corporateCredit">
              <a-input v-model="model.corporateCredit" placeholder="请输入企业征信"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="人员编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.stuffId" placeholder="请输入人员编号" disabled></a-input>
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
import { putAction } from '@api/manage'
import { thru } from 'lodash'
import { getFirstSupplierId, getTime, getStuffId} from '@/utils/generateRule.js'


export default {
  name: 'FirstSupplierInfForm',
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
  data() {
    return {
      model: {
        firstSupplierId: '',
        infUpdateTime: '',
        stuffId: ''
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
          { required: true, message: '请输入一级供应商编号!' },
        ],
        supplierName: [
          { required: true, message: '请输入供应商名称!' },
        ],
        supplierSimpleName: [
          { required: true, message: '请输入供应商名称简称!' },
        ],
        supplierAddress: [
          { required: true, message: '请输入供应商地址!' },
        ],
        contact: [
          { required: true, message: '请输入联系人!' },
        ],
        contactNum: [
          { required: true, message: '请输入联系电话!' },
        ],
        privateEnterprise: [
          { required: true, message: '请输入是否民口企业!' },
        ],
        battleneckSupplier: [
          { required: true, message: '请输入是否瓶颈供应商!' },
        ],
        certification: [
          { required: true, message: '请输入供应商资质!' },
        ],
        legalPerson: [
          { required: true, message: '请输入法定代表人!' },
        ],
        postCode: [
          { required: true, message: '请输入邮编!' },
        ],
        bankName: [
          { required: true, message: '请输入开户行名称!' },
        ],
        bankAccount: [
          { required: true, message: '请输入开户账号!' },
        ],
        eptId: [
          { required: true, message: '请输入往来单位信息名称!' },
        ],
        infUpdateTime: [
          { required: true, message: '请输入录入时间!' },
        ],
        isProduct: [
          { required: true, message: '请输入是否生产瓶颈供应商!' },
        ],
        isPurchase: [
          { required: true, message: '请输入是否采购瓶颈供应商!' },
        ],
        estabYear: [
          { required: true, message: '请输入成立年份!' },
        ],
        corporateCredit: [
          { required: true, message: '请输入企业征信!' },
        ],
        stuffId: [
          { required: true, message: '请输入人员编号!' },
        ],
      },
      url: {
        add: "/firstSupplierInf/firstSupplierInf/add",
        edit: "/firstSupplierInf/firstSupplierInf/edit",
        queryById: "/firstSupplierInf/firstSupplierInf/queryById",
        rule: {
        },
      }
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    },
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model));
    getFirstSupplierId(this)
    getTime(this);
    getStuffId(this);
  },
  methods: {
    add() {
      this.edit(this.modelDefault);
    },
    edit(record) {
      this.model = Object.assign({}, record);
      this.visible = true;
    },
    submitForm() {
      const that = this;
      // 触发表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if (!this.model.id) {
            httpurl += this.url.add;
            method = 'post';
          } else {
            httpurl += this.url.edit;
            method = 'put';
          }
          httpAction(httpurl, this.model, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.$emit('ok');
            } else {
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
          })
        }

      })
    }


  }
}
</script>