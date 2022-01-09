<template>
  <div class="panel-default">
    <el-row :gutter="20">
      <el-col :lg="14" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
        <!-- form-col：表单样式（必加） -->
        <el-form
          ref="auditUserForm"
          :model="auditUserForm"
          :rules="rules"
          label-width="120px"
          @submit.native.prevent
        >
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="auditUserForm.username"
              class="span10"
              size="medium"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="auditUserForm.password"
              class="span10"
              size="medium"
              placeholder="请输入密码"
              clearable
            />
          </el-form-item>
          <el-form-item label="姓名：" prop="chineseName">
            <el-input
              v-model="auditUserForm.chineseName"
              class="span10"
              size="medium"
              placeholder="请输入姓名"
              clearable
            />
          </el-form-item>
          <el-form-item label="手机：" prop="phone">
            <el-input
              v-model="auditUserForm.phone"
              class="span10"
              size="medium"
              placeholder="请输入手机"
              clearable
            />
          </el-form-item>
          <el-form-item label="标签名：">
            <p class="el-form-item-static">1245454545</p>
          </el-form-item>
          <el-form-item class="submit">
            <el-button size="medium" @click="back">返 回</el-button>
            <el-button
              type="primary"
              :loading="btnLoading"
              size="medium"
              @click="submitForm('auditUserForm')"
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

export default {
  name: 'AuditUserForm',
  data() {
    return {
      // 按钮状态
      btnLoading: false,
      // 表单绑定数据
      auditUserForm: {
        auditUserId: '',
        username: '',
        chineseName: '',
        password: '',
        phone: ''
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' },
          { type: 'isChinese', validator: validatorForm, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        chineseName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'isPhone', validator: validatorForm, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created() {},
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
