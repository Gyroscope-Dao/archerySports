<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="仿真编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="simulationId">
              <a-input v-model="model.simulationId" placeholder="请输入仿真编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="仿真目的" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="simulationPurpose">
              <a-input v-model="model.simulationPurpose" placeholder="请输入仿真目的"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="JF 订单号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orderId">
              <a-input v-model="model.orderId" placeholder="请输入JF 订单编号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="文件版本" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="smulationVersion">
              <a-input v-model="model.smulationVersion" placeholder="请输入版本"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="报告文件" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="reportFileString">
              <!-- <a-input v-model="model.reportFileString" placeholder="请输入报告文件"></a-input> -->
              <j-upload v-model="model.reportFileString" text="上传"></j-upload>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="模型文件" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="modelFileString">
              <!-- <a-input v-model="model.modelFileString" placeholder="请输入模型文件"></a-input> -->
              <j-upload v-model="model.modelFileString" text="上传"></j-upload>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="仿真时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="inputTime">
              <j-date placeholder="请选择仿真时间" v-model="model.inputTime" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" style="display: none;">
            <a-form-model-item label="仿真人员编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="stuffId">
              <a-input v-model="model.stuffId" placeholder="请输入仿真人员编号" disabled></a-input>
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
  name: 'SimulationInfForm',
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
        add: '/simulationInf/simulationInf/add',
        edit: '/simulationInf/simulationInf/edit',
        queryById: '/simulationInf/simulationInf/queryById'
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
