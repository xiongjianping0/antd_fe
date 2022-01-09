<template>
  <div>
    <el-upload
      class="upload-demo multi-img-uploader"
      ref="fileUpload"
      :headers="uploadHeaders"
      :action="action"
      :multiple="true"
      :name="name"
      :limit="limit"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
      :auto-upload="autoUpload"
      :data="otherData"
      :show-file-list="showFileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UploudFiles',
  props: {
    isEmitParent: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    fileRequestPath: {
      type: String,
      default: ''
    },
    otherData: {
      type: Object,
      default: () => {}
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    // v-model的value值，格式['2020/08/05/U6yJN9WNqnXS.jpg']
    value: {
      type: Array,
      default: () => []
    },
    // 上传字段名
    name: {
      type: String,
      default: 'uploadFile[]'
    },
    // 图片后缀
    exts: {
      type: Array,
      default: function() {
        return ['jpg', 'png', 'jpeg', 'xlsx', 'docx', 'pdf']
      }
    },
    // 每张图片的大小
    maxFileSize: {
      type: Number,
      default: 2
    },
    // 限制个数
    limit: {
      type: Number,
      limit: 10
    },
    tip: {
      type: String | Boolean,
      default: false
    }
  },
  data() {
    return {
      // 上传头部
      uploadHeaders: {},
      // action: `${process.env.VUE_APP_BASE_API}/file/upload`
      action: `${process.env.VUE_APP_BASE_API}/`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['utoken']),
    fileList() {
      const fileList =
        this.value.map(item => {
          return {
            url: this.WebConfig.CONST_IMG_HOST + item,
            name: this.WebConfig.CONST_IMG_HOST + item
          }
        }) || []
      // 回显数据列表 地址是host + url
      // [{url: 'http://xxx.img.xxx.com/2020/08/05/U6yJN9WNqnXS.jpg'}]
      return fileList
    }
  },
  created() {
    if (this.fileRequestPath) {
      this.action += this.fileRequestPath
    }
    // 设置头部信息
    const utoken = this.utoken
    this.uploadHeaders = {
      'Authorization': utoken
    }
  },
  methods: {
    // 上传图片之前限制格式和大小
    beforeUpload(file) {
      const isValid = this.validateFile(file)
      if (!isValid) {
        return false
      }
      this.$message.warning('上传中...')
    },
    // 校验文件格式和大小
    validateFile(file) {
      const exts = this.exts // 自定义默认上传格式
      const maxFileSize = this.maxFileSize // 自定义上传大小
      const fileName = file.name || '' // 文件名
      const fileNameArr = fileName.split('.') // 文件名拆成数组
      const fileExts = fileNameArr[fileNameArr.length - 1] // 文件后缀
      const fileSize = file.size // 文件大小
      const isExts = exts.includes(fileExts.toLowerCase())
      if (!isExts) {
        this.$message.error('文件格式错误!')
        return false
      }
      if (maxFileSize * 1024 * 1024 < fileSize) {
        this.$message.error('文件过大!')
        return false
      }
      return true
    },
    // 图片上传成功后，将数据传递给父组件
    handleSuccess(res, file, fileList) {
      this.$message.closeAll()
      this.$message.success('上传成功！')
      const filePath = res.data || ''
      // 处理图片，并且触发input事件
      this.handleFileList(filePath)
      this.emitInput()
      if (this.isEmitParent) {
        this.$emit('handle-success')
        this.$router.push('/device/warehousereceipt/list')
      }
    },
    // 移除图片
    handleRemove(file, fileList) {
      const removeUrl = file.url || ''
      // 处理图片，并且触发input事件
      this.handleFileList(removeUrl, 2)
      this.emitInput()
    },
    // 绑定数据事件
    emitInput() {
      // 实现上传的双向绑定
      this.$emit('input', this.value)
    },
    // 处理当前图片是要添加的还是要删除的
    handleFileList(val, type = 1) {
      if (type == 1) {
        // type: 1是增加一张照片，
        this.value.push(val)
      } else if (type == 2) {
        // 2是删除一张图片
        const index = this.fileList.findIndex(item => item.url == val)
        if (index != -1) {
          this.value.splice(index, 1)
        }
      }
    },
    // 上传失败
    handleError(err, file) {
      if (err.status !== 200) {
        this.$message.error('上传失败!')
        const inmessage = JSON.parse(err.message)
        /* alert (inmessage.message) */
        this.$alert(inmessage.message, '提示：', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
      }
    },
    // 文件上限触发钩子
    handleExceed() {
      this.$message.error('您已到达上传文件的数量上限!')
    },
    // 点击文件触发的
    handlePreview(file) {
      window.open(file.url)
    },
    // 手动上传
    submitUpload() {
      this.$refs.fileUpload.submit()
    }
  }
}
</script>

<style lang="scss" scope>
// 多图片上传样式
.multi-img-uploader {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // 图片list
  .el-upload-list--picture-card {
    display: flex;
    flex-direction: column;
  }
  .el-upload-list__item-name {
    white-space: break-spaces !important;
  }
}
</style>
