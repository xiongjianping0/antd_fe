<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>用户列表</h4>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <common-table-search
          size="mini"
          label-width="80px"
          :search-data="searchData"
          :search-form="searchForm"
          @handle-filter="handleFilter"
        />
      </div>
      <!-- 搜索 -->
      <div class="page-body">
        <!-- 表格 -->
        <common-table
          :loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @handle-view="handleView"
          @handle-distribution="handleDistribution"
          @pagination-current-change="changeCurrentPage"
          @pagination-size-change="changePageSize"
        />
        <!-- 表格 -->
        <common-dialog
          :show-dialog="isShowCheckDialog"
          :title="shenheTittle"
          @close-dialog="handleCheckDialogCancel"
          @handle-dialog-cancel="handleCheckDialogCancel"
          @handle-dialog-confirm="handleCheckDialogConfirm"
        >
          <div slot="form-content">
            <el-form
              ref="checkForm"
              :model="checkForm"
              :rules="checkRules"
              label-width="100px"
            >
              <el-form-item
                class="distribution"
                label="是否分销："
                prop="distribution"
              >
                <el-radio
                  v-model="checkForm.distribution"
                  :label="1"
                >是</el-radio>
                <el-radio
                  v-model="checkForm.distribution"
                  :label="2"
                >否</el-radio>
              </el-form-item>
            </el-form>
          </div>
        </common-dialog>
      </div>

    </div>

  </div>
</template>

<script>
// table组件
import CommonTable from '@/components/Base/Table'
// search组件
import CommonTableSearch from '@/components/Base/TableSearch'
// 接口
import CommonDialog from '@/components/Base/Dialog'

import { getUserListApi } from '@/api/cuser/user'
const roomUserGender = {
  0: '未知',
  1: '男',
  2: '女'
}
export default {
  name: 'CuserList',
  components: {
    CommonTable,
    CommonTableSearch,
    CommonDialog
  },
  data() {
    return {
      /* 搜索 */
      searchForm: [
        {
          type: 'Input',
          label: '姓名',
          prop: 'username',
          placeholder: '请输入姓名'
        },
        {
          type: 'Input',
          label: '手机号',
          prop: 'phone',
          placeholder: '请输入手机号'
        },
        {
          type: 'Input',
          label: '身份证号',
          prop: 'idcard',
          placeholder: '请输入身份证号'
        }
      ], // 搜索类型
      // 搜索数据
      searchData: {
        username: null,
        phone: null,
        idcard: null
      },
      /* 表格 */
      tableColumn: [
        { prop: 'nickname', label: '用户名' },
        { prop: 'phone', label: '手机号' },
        { prop: 'username', label: '姓名' },
        {
          prop: 'userImg',
          label: '头像',
          render: function (h, params) {
            let columnContent = {
              attrs: {
                src: params.row.userImg
              },
              style: {
                width: '60px',
                height: '60px'
              }
            }
            return h('img', columnContent)
          }
        },
        {
          prop: 'gender',
          label: '性别',
          render: function (h, params) {
            return h('span', roomUserGender[params.row.gender])
          }
        },
        { prop: 'birthday', label: '出生日期' },
        { prop: 'idcard', label: '身份证号' },
        { prop: 'createTime', label: '创建时间' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        width: '140',
        data: [
          {
            name: '查看',
            func: 'handle-view',
            type: 'primary',
            authString: 'cuser:cuser:view'
          },
          {
            name: '设置分销',
            func: 'handle-distribution',
            type: 'success'
          }
        ]
      }, // 表格按键操作区;
      loading: true, // 数据加载中
      /* 分页 */
      currentPage: 1, // 当前页
      pageSize: 10, // 每页的条数
      total: 0, // 数据总数
      isShowCheckDialog: false,
      shenheTittle:'设置是否分销',
      checkForm: {
        distribution: ''
      },
      checkRules:{
          distribution: [
          { required: true, message: '请选择分销状态', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.goToPage()
  },
  methods: {
    // 获取数据列表api
    async getDataList(params = {}) {
      this.loading = true
      try {
        const res = await getUserListApi(params)
        this.tableData = res.data.list || []
        this.total = parseInt(res.data.total)
      } catch (error) {}
      this.loading = false
    },
    // 点击页数
    changeCurrentPage(val) {
      this.currentPage = val
      this.goToPage()
    },
    // 切换每页的长度
    changePageSize(val) {
      this.pageSize = val
      this.goToPage()
    },
    // 查询
    handleFilter(val) {
      this.searchData = val
      this.currentPage = 1
      this.goToPage()
    },
    // 查询数据
    goToPage() {
      const baseParams = { curPage: this.currentPage, perPage: this.pageSize }
      const params = Object.assign(baseParams, this.searchData)
      this.getDataList(params)
    },
    // 查看
    handleView({ row }) {
      const id = row.id
      this.$router.push(`detail/${id}`)
    },
    // 分销
    handleDistribution({row}) {
      this.isShowCheckDialog = true
      this.id = row.id
    },
    // 审核弹框-取消
    handleCheckDialogCancel() {
      this.isShowCheckDialog = false
      this.resetCheckForm()
    },
    resetCheckForm(formName) {
      this.$refs.checkForm.resetFields()
    },
        // 审核弹窗-确定
    handleCheckDialogConfirm() {
      this.$refs.checkForm.validate((valid) => {
        if (valid) {
          this.checkStatus()
          console.log('成功')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
     //审核接口
    async checkStatus() {
      if (!this.id) {
        return
      }
      try {
        const res = await checkStatusApi({
          goodsId: this.id,
          distribution: this.checkForm.distribution,
        })
        if (res.code === 0) {
          this.isShowDialog = false
          this.$message({
            type: 'success',
            message: '操作成功，正在刷新...',
            duration: 1500,
            onClose: () => {
              this.isShowCheckDialog = false
              this.goToPage()
            }
          })
        }
      } catch (error) {}
    },
  }
}
</script>
