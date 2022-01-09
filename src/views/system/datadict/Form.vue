<template>
  <div class="panel-default">
    <el-row :gutter="20">
      <el-col :lg="14" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
        <!-- form-col：表单样式（必加） -->
        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="rules"
          label-width="120px"
          @submit.native.prevent
        >
          <el-form-item label="类型名称：" prop="typeName">
            <el-input
              v-model="infoForm.typeName"
              class="span10"
              size="medium"
              placeholder="请输入类型名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="类型编码：" prop="typeCode">
            <el-input
              v-model="infoForm.typeCode"
              class="span10"
              size="medium"
              placeholder="请输入类型编码"
              clearable
            />
          </el-form-item>
          <el-form-item label="值：" prop="value">
            <el-input
              v-model="infoForm.value"
              class="span10"
              size="medium"
              placeholder="请输入值"
              clearable
            />
          </el-form-item>
          <el-form-item class="submit">
            <el-button size="medium" @click="back">返 回</el-button>
            <el-button
              type="primary"
              :loading="btnLoading"
              size="medium"
              @click="submitForm('infoForm')"
              >提 交</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validatorForm } from '@/utils/validate'
import SingleImg from '@/components/Upload/singleImg'

export default {
  name: 'ClassifyForm',
  components: {
    SingleImg
  },
  data() {
    return {
      // 按钮状态
      btnLoading: false,
      // 表单绑定数据
      infoForm: {
        typeName: '',
        typeCode: '',
        value: ''
      },
      // 表单校验规则
      rules: {
        typeName: [
          { required: true, message: '请输入类型名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        typeCode: [
          { required: true, message: '请输入类型编码', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入值', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created() {
    const id = this.$route.params.id || 0
    if (id) {
      this.infoForm = {
        typeName: '性别',
        typeCode: 'SE001',
        value: '男'
      }
    }
  },
  mounted() {},
  methods: {
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
