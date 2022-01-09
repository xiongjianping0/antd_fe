<template>
  <div class="panel-default">
    <el-row :gutter="20">
      <el-col :lg="14" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
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
          <template v-if="id == 0">
            <el-form-item label="密码：" prop="password">
              <el-input
                v-model="auditUserForm.password"
                :disabled="true"
                class="span10"
                size="medium"
                placeholder="请输入密码"
                clearable
              />
            </el-form-item>
          </template>
          <el-form-item label="姓名：" prop="name">
            <el-input
              v-model="auditUserForm.name"
              class="span10"
              size="medium"
              placeholder="请输入姓名"
              clearable
            />
          </el-form-item>
          <!-- <el-form-item label="手机：" prop="phone">
            <el-input
              v-model="auditUserForm.phone"
              class="span10"
              size="medium"
              placeholder="请输入手机"
              clearable
            />
          </el-form-item> -->
          <el-form-item label="角色：" prop="roleListLabel">
            <el-checkbox-group
              v-model="auditUserForm.roleListLabel"
              @change="handleRoleChange"
            >
              <el-checkbox
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :data-value="item.id"
                name="role"
              />
            </el-checkbox-group>
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
import { addUserApi, modifyUserApi, getUserDetailApi } from '@/api/audit/user'
import { roleListApi } from '@/api/audit/role'
import { mapGetters } from 'vuex'
import Utils from '@/utils/util.js'
import $ from 'jquery'
import { validatorForm } from '@/utils/validate'

export default {
  name: 'AuditUserForm',
  data() {
    return {
      btnLoading: false,
      id: 0,
      auditUserForm: {
        id: 0,
        username: '',
        name: '',
        password: '123456',
        // phone: '',
        roleIds: [], // 选中的角色id  string 用逗号隔开
        roleListLabel: [] // 选中的角色名称
      },
      roleList: [], // 角色列表
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
        /* username: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'isPhone', validator: validatorForm, trigger: 'blur' }
        ], */
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        /* phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'isPhone', validator: validatorForm, trigger: 'blur' }
        ], */
        roleIds: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个角色',
            trigger: 'change'
          }
        ],
        roleListLabel: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个角色',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
    const id = this.$route.params.id || 0
    this.id = id
  },
  computed: {
    ...mapGetters(['commonInfo'])
  },
  mounted() {
    if (this.id) {
      this.getAuditUserData()
    }
  },
  methods: {
    // 编辑时获取用户详情
    async getAuditUserData() {
      try {
        const params = {
          id: this.id
        }
        const ret = await getUserDetailApi(params)
        this.auditUserForm = ret.data || {}
        const roleListValue = []
        const roleListLabel = []
        if (ret.data.roleList && ret.data.roleList.length) {
          ret.data.roleList.map(function(value) {
            roleListLabel.push(value.roleName)
            roleListValue.push(value.roleId)
          })
        }
        // 方式1
        this.auditUserForm = Object.assign({}, this.auditUserForm, {
          roleIds: roleListValue,
          roleListLabel: roleListLabel
        })
      } catch (error) {}
    },
    // 获取角色列表
    async getRoleList() {
      try {
        const ret = await roleListApi()
        this.roleList = ret.data || []
      } catch (error) {}
    },
    // 处理多选
    handleRoleChange(value) {
      const checkedCount = value.length
      this.auditUserForm.roleListLabel = value // 记录所有被选中项的中文名称
      // 选中之后，获取value数字
      var text = $("input:checkbox[name='role']:checked")
        .map(function(index, elem) {
          return $(elem)
            .parents('.el-checkbox')
            .attr('data-value')
        })
        .get()
      // .join(",");
      console.log('选中的checkbox的值为：', text)
      this.auditUserForm.roleIds = text //  赋值 （axios传参用）
    },
    // 表单提交
    submitForm(formName) {
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
        let ret = ''
        const params = Object.assign({}, this.auditUserForm)
        params.roleIds = params.roleIds.join(',')
        if (this.id) {
          ret = await modifyUserApi(params)
        } else {
          ret = await addUserApi(params)
        }
        if (ret.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功，正在跳转...',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.$router.push('/audit/user/list')
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
