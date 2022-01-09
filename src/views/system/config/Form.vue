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
          <el-form-item label="系统标题：" prop="companyName">
            <el-input
              v-model="infoForm.companyName"
              class="span10"
              size="medium"
              placeholder="请输入系统标题"
              clearable
            />
          </el-form-item>
          <el-form-item label="系统logo：" prop="companyLogo">
            <single-img
              name="file"
              width="150px"
              height="150px"
              v-model="infoForm.companyLogo"
              :limit="1"
              :file-request-path="actionUrl"
              :other-data="{ dir: 'ciamedicine' }"
              :value="infoForm.companyLogo"
              tip="支持png,jpg,jpeg格式。"
            />
          </el-form-item>
          <el-form-item label="公司介绍：" prop="companyDescription">
            <tinymce
              :other-data="{ dir: 'system/config' }"
              :file-request-path="actionUrl"
              :show-btn-img-upload="false"
              v-model="infoForm.companyDescription"
              size="medium"
              :height="300"
              :width="850"
            />
          </el-form-item>
          <el-form-item
            label-width="220px"
            label="用户协议："
            prop="userAgreement"
            :rules="[
              {
                required: true,
                message: '请上传文件',
                trigger: ['change', 'blur']
              }
            ]"
          >
            <!-- 双向绑定 -->
            <multi-img-file
              v-model="infoForm.userAgreement"
              :exts="importExts"
              :limit="1"
              :other-data="{ dir: 'system/config' }"
              :file-request-path="actionUrl"
              :show-file-list="true"
              name="file"
              tip="最多可上传一个文件"
            />
          </el-form-item>
          <el-form-item
            label-width="220px"
            label="用户隐私协议："
            prop="userPrivacyProtocol"
            :rules="[
              {
                required: true,
                message: '请上传文件',
                trigger: ['change', 'blur']
              }
            ]"
          >
            <!-- 双向绑定 -->
            <multi-img-file
              v-model="infoForm.userPrivacyProtocol"
              :exts="importExts"
              :limit="1"
              :other-data="{ dir: 'system/config' }"
              :file-request-path="actionUrl"
              :show-file-list="true"
              name="file"
              tip="最多可上传一个文件"
            />
          </el-form-item>
          <el-form-item
            label-width="220px"
            label="互联网医院诊疗风险告知书："
            prop="internetRiskNotification"
            :rules="[
              {
                required: true,
                message: '请上传文件',
                trigger: ['change', 'blur']
              }
            ]"
          >
            <!-- 双向绑定 -->
            <multi-img-file
              v-model="infoForm.internetRiskNotification"
              :exts="importExts"
              :limit="1"
              :other-data="{ dir: 'system/config' }"
              :file-request-path="actionUrl"
              name="file"
              tip="最多可上传一个文件"
            />
          </el-form-item>
          <el-form-item class="submit">
            <el-button
              v-if="isAuth('system:config:edit')"
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
import Tinymce from '@/components/Tinymce'
import SingleImg from '@/components/Upload/singleImg'
import MultiImgFile from '@/components/Upload/multiImgFile'
import Utils from '@/utils/util'
// 接口
import { modifyConfig, getConfigDetail } from '@/api/config/index'
export default {
  name: 'ConfigForm',
  components: {
    SingleImg,
    Tinymce,
    MultiImgFile
  },
  data() {
    return {
      // 上传参数
      actionUrl: 'omp/merchant/upload/upload',
      importExts: ['doc', 'docx'],
      // 按钮状态
      btnLoading: false,
      // 表单绑定数据
      infoForm: {
        companyName: '',
        companyLogo: '',
        companyDescription: '',
        userAgreement: [],
        userPrivacyProtocol: [],
        internetRiskNotification: []
      },
      // 表单校验规则
      rules: {
        companyName: [
          { required: true, message: '请输入系统标题', trigger: 'blur' },
          {
            min: 2,
            max: 50,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        companyLogo: [
          { required: true, message: '请上传系统logo', trigger: 'blur' }
        ],
        companyDescription: [
          { required: true, message: '请输入公司简介', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getDetailInfo()
  },
  mounted() {},
  methods: {
    // 详情
    async getDetailInfo() {
      try {
        const res = await getConfigDetail()
        if (res.code === 0) {
          const data = res.data || {}
          const basicData = Utils.list2Assoc(data, 'varName', 'varValue')
          let basicDataNew = {}
          Object.keys(basicData).forEach(key => {
            const item = basicData[key]
            const name = Utils.lineToHump(key)
            basicDataNew[name] = item
          })
          basicDataNew.userAgreement = [basicDataNew.userAgreement]
          basicDataNew.userPrivacyProtocol = [basicDataNew.userPrivacyProtocol]
          basicDataNew.internetRiskNotification = [
            basicDataNew.internetRiskNotification
          ]
          this.infoForm = basicDataNew
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveDepaMedicine()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async saveDepaMedicine() {
      this.btnLoading = true
      const _data = Object.assign({}, this.infoForm)
      try {
        let res = ''
        res = await modifyConfig(_data)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功',
            duration: 1500,
            onClose: () => {
              this.getDetailInfo()
            }
          })
        }
      } catch (error) {}
      this.btnLoading = false
    }
  }
}
</script>
<style></style>
