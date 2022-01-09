<template>
  <el-dialog
    :modal="true"
    :modal-append-to-body="true"
    :title="title"
    :visible.sync="showDialog"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="showClose"
    :before-close="closeDialog"
    right
  >
    <slot name="form-content" />
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="btnCancel">取 消</el-button>
      <el-button type="primary" size="medium" @click="btnConfirm" v-if="showBtnConfirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'CommonDialog',
  components: {},
  props: {
    // 是否显示diolag
    showDialog: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    // 宽度
    width: {
      type: String,
      default: '30%'
    },
    // 是否显示右上角关闭icon
    showClose: {
      type: Boolean,
      default: true
    },
    showBtnConfirm: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    // 关闭前的回调
    closeDialog() {
      this.$emit('close-dialog')
    },
    // 取消
    btnCancel() {
      this.$emit('handle-dialog-cancel')
    },
    // 确定
    btnConfirm() {
      this.$emit('handle-dialog-confirm')
    }
  }
}
</script>
<style scoped></style>
