<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      v-show="showBtnImgUpload"
      @click="dialogVisible = true"
    >
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="[]"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :action="action"
        list-type="picture-card"
        :data="otherData"
      >
        <i class="el-icon-upload" style="font-size: 45px" />
      </el-upload>
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确 认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    // 上传地址
    fileRequestPath: {
      type: String,
      required: true
    },
    // 上传目录
    otherData: {
      type: Object,
      default: () => {}
    },
    // 是否显示上传图片按钮
    showBtnImgUpload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      count: 0, // 上传计数
      action: `${process.env.VUE_APP_BASE_API}/`
    }
  },
  created() {
    if (this.fileRequestPath) {
      this.action += this.fileRequestPath
    }
  },
  methods: {
    // 点击确认
    handleSubmit() {
      if (this.count === 0) {
        this.$message('请上传图片！')
        return
      }
      if (this.count !== this.fileList.length) {
        this.$message(
          '请等待所有图片上传成功。如果有网络问题，请刷新页面重新上传!'
        )
        return
      }
      this.$emit('successCBK', this.fileList)
      this.fileList = []
      this.count = 0
      this.dialogVisible = false
    },
    // 成功上传
    handleSuccess(response, file) {
      const data = response.data || {}
      this.fileList.push({
        url: data.url,
        uid: data.name
      })
    },
    // 移除文件
    handleRemove(file) {
      this.count--
      const uid = file.uid
      this.fileList = this.fileList.filter(item => {
        return item.uid != uid
      })
    },
    // 上传之前
    beforeUpload(file) {
      this.count++
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
