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
          <el-form-item label="轮播图页面：" prop="type">
            <el-select
              v-model="infoForm.type"
              placeholder="请选择"
              class="span10"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input
              v-model="infoForm.title"
              class="span10"
              size="medium"
              placeholder="请输入标题"
              clearable
            />
          </el-form-item>
          <el-form-item label="图片：" prop="imgPath">
            <single-img
              name="file"
              v-model="infoForm.imgPath"
              :limit="5"
              :file-request-path="actionUrl"
              :other-data="{ dir: 'banner' }"
              width="450px"
              tip="提示：支持png,jpg,jpeg格式"
            />
          </el-form-item>
          <el-form-item label="跳转页面：" prop="linkUrl">
            <el-input
              v-model="infoForm.linkUrl"
              class="span10"
              size="medium"
              placeholder="请输入跳转页面"
              clearable
            />
          </el-form-item>
          <el-form-item label="权重：" prop="rankNumber">
            <el-input
              v-model="infoForm.rankNumber"
              class="span10"
              size="medium"
              placeholder="请输入权重值"
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
import {
  addCarouselApi,
  getCarouselDetailApi,
  updateCarouselApi
} from '@/api/system/carousel'
const typeList = [
  {
    label: '小程序首页轮播',
    value: 1
  },
  {
    label: '商城轮播',
    value: 2
  },
  {
    label: '订单支付成功页面轮播',
    value: 3
  },
  {
    label: '养生常识详情轮播',
    value: 4
  }
]
export default {
  name: 'CarouselForm',
  components: {
    SingleImg
  },
  data() {
    return {
      // 按钮状态
      btnLoading: false,
      // 表单绑定数据
      infoForm: {
        type: null,
        title: '',
        imgPath: '',
        linkUrl: '',
        rankNumber: ''
      },
      typeList,
      // 表单校验规则
      rules: {
        type: [{ required: true, message: '请选择', trigger: 'blur' }],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          },
          { type: 'isBlank', validator: validatorForm, trigger: 'blur' }
        ],
        imgPath: [
          { required: true, message: '请上传轮播图图片', trigger: 'blur' }
        ],
        rankNumber: [
          { required: true, message: '请输入权重值', trigger: 'blur' }
        ]
      },
      id: 0,
      actionUrl: '/omp/clinic/upload/upload'
    }
  },
  computed: {},
  created() {
    const id = this.$route.params.id || 0
    if (id) {
      this.id = id
      this.getDetailData()
    }
  },
  mounted() {},
  methods: {
    // 编辑时获取用户详情
    async getDetailData() {
      try {
        const params = {
          id: this.id
        }
        const res = await getCarouselDetailApi(params)
        if (res.code === 0) {
          this.infoForm = res.data || {}
        }
      } catch (error) {}
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
        let res = {}
        if (this.id) {
          res = await updateCarouselApi(this.infoForm)
        } else {
          res = await addCarouselApi(this.infoForm)
        }
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功，正在跳转...',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.$router.push('/system/carousel/List')
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
