<template>
  <div class="page-personal">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="panel-default">
          <div class="page-heading">
            <h4>个人资料</h4>
          </div>
          <div class="page-body">
            <infomation
              :rule-form-info="ruleFormInfo"
              :info-btn-loading="infoBtnLoading"
              @info-submit="infoSubmit"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="panel-default">
          <div class="page-heading">
            <h4>修改密码</h4>
          </div>
          <div class="page-body">
            <password
              :rule-form-pwd="ruleFormPwd"
              :pwd-btn-loading="pwdBtnLoading"
              @pwd-submit="pwdSubmit"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Infomation from './component/Infomation'
import Password from './component/Password'
import { mapGetters } from 'vuex'
import { infoDataSubmitApi, pwdDataSubmitApi } from '@/api/personal/index'
export default {
  name: 'Personal',
  components: {
    Infomation,
    Password
  },
  inject: ['reload'],
  data() {
    return {
      ruleFormInfo: {
        id: '',
        username: '',
        name: '',
        roleIds: []
      },
      ruleFormPwd: {
        id: '',
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      id: null,
      infoBtnLoading: false,
      pwdBtnLoading: false
    }
  },
  computed: {
    ...mapGetters(['curUserInfo'])
  },
  created() {
    this.handleUserInfo()
  },
  methods: {
    // 获取用户详情
    handleUserInfo() {
      this.ruleFormPwd.id = this.curUserInfo.id || 0
      this.id = this.curUserInfo.id || 0
      this.ruleFormInfo = this.curUserInfo || {}
      let roleNameList = []
      let roleIdsList = []
      this.curUserInfo.roleList.forEach(item => {
        roleNameList.push(item.roleName)
        roleIdsList.push(item.roleId)
      })
      const roleNameStr = roleNameList.length > 0 ? roleNameList.join(',') : '-'
      this.ruleFormInfo.roleListName = roleNameStr
      this.ruleFormInfo.roleIds = roleIdsList
    },
    async infoSubmit(ruleFormInfo) {
      this.infoBtnLoading = true
      try {
        const res = await infoDataSubmitApi(ruleFormInfo)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功，正在刷新...',
            duration: 1500,
            onClose: () => {
              this.infoBtnLoading = false
              this.reload()
            }
          })
        }
      } catch (error) {
        // status != 200和code != 0 都会抛错
        console.log(error)
        this.infoBtnLoading = false
      }
    },
    async pwdSubmit(ruleFormPwd) {
      this.pwdBtnLoading = true
      try {
        const res = await pwdDataSubmitApi(ruleFormPwd)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功，请重新登录...',
            duration: 1500,
            onClose: () => {
              this.pwdBtnLoading = false
              this.logout()
            }
          })
        }
      } catch (error) {
        console.log(error)
        this.pwdBtnLoading = false
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$store.commit('resetStore')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
      // location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-default {
  height: 530px;
}
</style>
