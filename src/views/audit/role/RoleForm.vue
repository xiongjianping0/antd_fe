<template>
  <div class="panel-default">
    <el-row :gutter="20">
      <el-col :lg="14" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
        <el-form
          ref="auditUserForm"
          :model="auditRoleForm"
          :rules="rules"
          label-width="120px"
          @submit.native.prevent
        >
          <el-form-item label="角色名称：" prop="name">
            <el-input
              v-model="auditRoleForm.name"
              class="span10"
              size="medium"
              placeholder="请输入角色名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="角色简介：" prop="description">
            <el-input
              v-model="auditRoleForm.description"
              type="textarea"
              class="span10"
              size="medium"
              :rows="4"
              placeholder="请输入角色简介"
              clearable
            />
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
import { addRoleApi, modifyRoleApi, getRoleDetailApi } from '@/api/audit/role'
import { mapGetters } from 'vuex'
import Utils from '@/utils/util.js'
import { validatorForm } from '@/utils/validate'

export default {
  name: 'AuditRoleForm',
  data() {
    return {
      btnLoading: false,
      id: 0,
      auditRoleForm: {
        id: 0,
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色简介', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id = this.$route.params.id || 0
    this.id = id
  },
  computed: {
    ...mapGetters(['commonInfo'])
  },
  mounted() {
    if (this.id) {
      this.getAuditRoleData()
    }
  },
  methods: {
    async getAuditRoleData() {
      try {
        const params = {
          id: this.id
        }
        const res = await getRoleDetailApi(params)
        this.auditRoleForm = res.data || {}
      } catch (error) {}
    },
    submitForm(formName) {
      console.log(this.auditUserForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.savePost()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async savePost() {
      this.btnLoading = true
      try {
        let res = ''
        if (this.id) {
          res = await modifyRoleApi(this.auditRoleForm)
        } else {
          res = await addRoleApi(this.auditRoleForm)
        }
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功，正在跳转...',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.$router.push('/audit/role/list')
            }
          })
        }
      } catch (error) {
        this.btnLoading = false
      }
    }
  }
}
</script>
