<template>
  <!-- :style="{ width }" -->
  <el-upload
    class="avatar-uploader"
    :headers="uploadHeaders"
    :action="action"
    :name="name"
    :show-file-list="false"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeUpload"
    :data="otherData"
  >
    <img v-if="value" :src="imgUrl" class="avatar" :style="{ width, height }" />
    <i
      v-else
      class="el-icon-plus avatar-uploader-icon"
      :style="{ width, height, lineHeight: height }"
    />
    <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SingleImg',
  props: {
    // v-model的value值
    value: {
      type: String,
      default: ''
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
    // 图片的大小
    maxFileSize: {
      type: Number,
      default: 2
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '170px'
    },
    tip: {
      type: String | Boolean,
      default: false
    },
    fileRequestPath: {
      type: String,
      default: ''
    },
    otherData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 上传头部
      uploadHeaders: {},
      // action: `${process.env.VUE_APP_BASE_API}/file/upload`,
      // action: '//qxkx01.cdn.clboy.com/',
      action: `${process.env.VUE_APP_BASE_API}/`,
      src: ''
    }
  },
  computed: {
    ...mapGetters(['utoken']),
    imgUrl() {
      return this.value
      // return this.WebConfig.CONST_IMG_HOST + this.value
    }
  },
  created() {
    if (this.fileRequestPath) {
      this.action += this.fileRequestPath
    }

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
    // 校验文件
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
    // 图片上传成功后的
    handleSuccess(res, file) {
      if (res.code === 0) {
        this.$message.closeAll()
        this.$message.success('上传成功！')
        const filePath = res.data.url || ''
        this.emitInput(filePath)
      } else {
        this.$message.error(res.message)
      }
    },
    // 绑定数据事件
    emitInput(val) {
      // 使用的是v-model的语法糖
      // <input v-model="test">
      // <input :value="test" @input="test = $event.target.value">
      this.$emit('input', val)
    },
    // 上传失败
    handleError(err, file) {
      if (err.status !== 200) {
        this.$message.error('上传失败，请稍后重试!')
      }
    }
  }
}
</script>

<style lang="scss" scope>
.avatar-uploader {
  // display: flex;
  flex-direction: column;
  margin-top: 10px;
  .el-upload {
    border: 1px dashed #c9c8c8;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #a1a2a3;
      text-align: center;
    }
    .avatar {
      display: block;
    }
  }
  .el-upload__tip {
    line-height: 25px;
    margin-top: 5px;
  }
}
</style>
