<template>
  <div>
    <el-upload
      class="multi-uploader"
      :headers="uploadHeaders"
      :action="action"
      list-type="picture-card"
      :multiple="true"
      :name="name"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :limit="limit"
      :file-list="fileList"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus avatar-uploader-icon" />
      <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :center="true" width="45%">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MultiImg',
  props: {
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
        return ['jpg', 'png', 'jpeg']
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
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传头部
      uploadHeaders: {},
      action: `${process.env.VUE_APP_BASE_API}/file/upload`
    }
  },
  computed: {
    ...mapGetters(['utoken']),
    fileList() {
      const fileList =
        this.value.map(item => {
          return { url: this.WebConfig.CONST_IMG_HOST + item }
        }) || []
      // 回显数据列表 地址是host + url
      // [{url: 'http://xxx.img.xxx.com/2020/08/05/U6yJN9WNqnXS.jpg'}]
      return fileList
    }
  },
  created() {
    // 设置头部信息
    const utoken = this.utoken
    this.uploadHeaders = {
      'U-Token': utoken
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
      if (res.code === 0) {
        this.$message.closeAll()
        this.$message.success('上传成功！')
        const filePath = res.data.file_path || ''
        // 处理图片，并且触发input事件
        this.handleFileList(filePath)
        this.emitInput()
      } else {
        this.$message.error(res.message)
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
        this.$message.error('上传失败，请稍后重试!')
      }
    },
    // 点击查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件超出限制时的钩子
    handleExceed() {
      this.$message.error('您已到达上传文件的数量上限!')
    }
  }
}
</script>

<style lang="scss" scope>
$width: 350px;
$height: 140px;
// 多图片上传样式
.multi-uploader {
  display: flex;
  flex-direction: column;
  // 图片list
  .el-upload-list--picture-card {
    display: flex;
    flex-direction: column;
    .el-upload-list__item {
      width: $width;
      min-height: $height;
      height: auto;
      img {
        width: $width;
      }
    }
  }
  // 上传图标card
  .el-upload--picture-card {
    border: 1px dashed #c9c8c8;
    background-color: #ffffff;
    border-radius: 6px;
    cursor: pointer;
    width: $width;
    height: $height;
    .avatar-uploader-icon {
      position: relative;
      font-size: 28px;
      color: #a1a2a3;
      text-align: center;
      width: $width;
      height: $height;
      line-height: $height;
    }
  }
}
</style>
