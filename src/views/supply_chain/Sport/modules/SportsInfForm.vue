<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="simulationId">
              <a-input v-model="model.name" placeholder="请输入姓名"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="simulationPurpose">
              <a-input v-model="model.sex" placeholder="请输入性别"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="单位" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.location" placeholder="请输入单位"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="smulationVersion">
              <a-input v-model="model.idCard" placeholder="请输入身份证号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="民族" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.nation" placeholder="请输入民族"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="人员类别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.category" placeholder="请输入人员类别"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="民族" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.nation" placeholder="请输入民族"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.notes" placeholder="请输入备注"></a-input>
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
import SparkMD5 from "spark-md5";

export default {
  name: 'SportsInfForm',
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
        simulationId: '',
        stuffId: ''
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
        simulationId: [{ required: true, message: '请输入仿真编号!' }],
        simulationPurpose: [{ required: true, message: '请输入仿真目的!' }],
        orderId: [{ required: true, message: '请输入JF 订单编号!' }],
        smulationVersion: [{ required: true, message: '请输入版本!' }],
        reportFile: [{ required: true, message: '请输入报告文件!' }],
        modelFile: [{ required: true, message: '请输入模型文件!' }],
        inputTime: [{ required: true, message: '请输入仿真时间!' }],
        stuffId: [{ required: true, message: '请输入仿真人员编号!' }]
      },
      url: {
        add: '/sportsInf/sportsInf/add',
        edit: '/sportsInf/sportsInf/edit',
        queryById: '/sportsInf/sportsInf/queryById'
      },
      uploadFileList:[],
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
    },
    //换算文件的大小单位
    formatSize(size) {
    //size的单位大小k
      var unit;
      var units = [" B", " K", " M", " G"];
      var pointLength = 2;
      while ((unit = units.shift()) && size > 1024) {
        size = size / 1024;
      }
      return (
        (unit === "B"
          ? size
          : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
      );
    },
    //计算文件的md5值
     computeMd5(file, uploadFile) {
        return new Promise((resolve, reject) => {
        //分片读取并计算md5
          const chunkTotal = 100; //分片数
          const chunkSize = Math.ceil(file.size / chunkTotal);
          const fileReader = new FileReader();
          const md5 = new SparkMD5();
          let index = 0;
          const loadFile = (uploadFile) => {
            uploadFile.parsePercentage.value = parseInt((index / file.size) * 100);
            const slice = file.slice(index, index + chunkSize);
            
            fileReader.readAsBinaryString(slice);
          };
          loadFile(uploadFile);
          fileReader.onload = (e) => {
            md5.appendBinary(e.target.result);
            if (index < file.size) {
              index += chunkSize;
              loadFile(uploadFile);
            } else {
              // md5.end() 就是文件md5码
              resolve(md5.end());
            }
          };
        });
      },
      //检查文件是否存在
      checkFile(md5) {
        return request({
          url: "/check",
          method: "get",
          params: {
            md5: md5,
          },
        });
      }
  }
}
</script>
