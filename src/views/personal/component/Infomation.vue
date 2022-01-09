<template>
  <div>
    <el-col :lg="20" :md="24" :sm="24" :xs="24" :span="12" class="form-col">
      <el-form
        ref="ruleFormInfo"
        :model="ruleFormInfo"
        :rules="rules"
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="用户名：">
          <p class="el-form-item-static">{{ ruleFormInfo.username }}</p>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input
            v-model="ruleFormInfo.name"
            class="span10"
            size="medium"
            clearable
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="角色：">
          <p class="el-form-item-static">{{ ruleFormInfo.roleListName }}</p>
        </el-form-item>
        <el-form-item class="submit">
          <el-button
            type="primary"
            :loading="infoBtnLoading"
            size="medium"
            @click="submitForm('ruleFormInfo')"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { validatorForm } from '@/utils/validate'

export default {
  name: 'Infomation',
  props: {
    ruleFormInfo: {
      type: Object,
      required: true
    },
    infoBtnLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('info-submit', this.ruleFormInfo)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
