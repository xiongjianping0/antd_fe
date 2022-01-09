<template>
  <div class="panel-default">
    <div class="page-heading">
      <!-- 标题 -->
      <h4>上传</h4>
    </div>
    <div class="page-body">
      <!-- 单个图片上传 -->
      <div
        class="form-col"
        style="background-color: #fafafa; padding: 20px; margin-bottom: 20px"
      >
        <h5>1、单个图片上传</h5>
        <el-form>
          <el-form-item label="头像">
            <!-- 双向绑定 -->
            <single-img v-model="formData.oneImg" />
          </el-form-item>
        </el-form>
      </div>
      <!-- 单个图片上传 -->

      <!-- 多个图片上传 -->
      <div
        class="form-col"
        style="background-color: #fafafa; padding: 20px; margin-bottom: 20px"
      >
        <h5>2、多个图片上传</h5>
        <el-form ref="ruleForm" :model="formData">
          <el-form-item
            label="详情"
            prop="multiImg"
            :rules="[
              {
                required: true,
                message: '请上传图片',
                trigger: ['change', 'blur']
              }
            ]"
          >
            <!-- 双向绑定 -->
            <multi-img v-model="formData.multiImg" />
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <!-- 多个图片上传 -->

      <!-- 文件上传 -->
      <div
        class="form-col"
        style="background-color: #fafafa; padding: 20px; margin-bottom: 20px"
      >
        <h5>3、文件上传</h5>
        <el-form ref="ruleForm" :model="formData">
          <el-form-item
            label="详情"
            prop="multiImgFileList"
            :rules="[
              {
                required: true,
                message: '请上传图片',
                trigger: ['change', 'blur']
              }
            ]"
          >
            <!-- 双向绑定 -->
            <multi-img-file
              v-model="formData.multiImgFileList"
              :limit="1"
              tip="最多可上传一个文件"
            />
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <!-- 文件上传 -->
    </div>
  </div>
</template>

<script>
import SingleImg from '@/components/Upload/singleImg'
import MultiImg from '@/components/Upload/multiImg'
import MultiImgFile from '@/components/Upload/multiImgFile'

export default {
  name: 'UploadExample',
  components: {
    SingleImg,
    MultiImg,
    MultiImgFile
  },
  data() {
    return {
      formData: {
        oneImg: null,
        multiImg: [],
        multiImgFileList: []
      }
    }
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
