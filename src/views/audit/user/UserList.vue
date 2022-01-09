<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="search">
        <common-table-search
          size="mini"
          label-width="80px"
          :search-data="searchData"
          :search-form="searchForm"
          :search-rules="searchRules"
          @handle-filter="handleFilter"
        />
      </div>
      <!-- 表格 -->
      <div class="page-body">
        <div class="common-action-row clearfix">
          <el-header style="float:right">
            <el-row>
              <router-link to="add">
                <el-button
                  v-if="isAuth('audit:user:add')"
                  type="primary"
                  size="medium"
                  >新增用户</el-button
                >
              </router-link>
            </el-row>
          </el-header>
        </div>
        <common-table
          :loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          :page-sizes="[10, 20, 50, 100]"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @handle-edit="handleEdit"
          @handle-delete="handleDelete"
          @reset-pwd="resetPwd"
          @pagination-current-change="changeCurrentPage"
          @pagination-size-change="changePageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommonTable from '@/components/Base/Table'
import CommonTableSearch from '@/components/Base/TableSearch'
import {
  getUserListApi,
  deleteUserApi,
  resetUserPwdApi
} from '@/api/audit/user'
import { mapGetters } from 'vuex'
import { roleListApi } from '@/api/audit/role'
import Utils from '@/utils/util.js'
import { validatorForm } from '@/utils/validate'

export default {
  name: 'AuditUserList',
  components: {
    CommonTable,
    CommonTableSearch
  },
  data() {
    return {
      // --分页 start--
      currentPage: 1, // 默认获取第一页的数据
      pageSize: 10, // 每页10条数据
      total: 0, // 分组内的用户总数
      // --分页 end--
      tableColumn: [
        { prop: 'username', label: '用户名' },
        { prop: 'name', label: '姓名' },
        {
          prop: 'roleName',
          label: '角色',
          formatter: row => {
            const roleList = row.roleList
            const roleNameArr = roleList.map(item => item.roleName) || []
            return roleNameArr.length > 0 ? roleNameArr.join(',') : ''
          }
        },
        // { prop: 'phone', label: '手机号' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '修改时间' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: [], // 表格按键操作区;
      loading: true,
      // --搜索 start--
      searchData: {
        username: null,
        chineseName: null,
        roleId: null,
        phone: null,
        dataRange: null
      },
      searchRules: {
        username: [
          {
            min: 1,
            max: 20,
            message: '长度不可超过 20 个字符',
            trigger: ['change', 'blur']
          },
          {
            type: 'isBlank',
            validator: validatorForm,
            trigger: ['change', 'blur']
          }
        ],
        chineseName: [
          {
            min: 1,
            max: 10,
            message: '长度不可超过 10 个字符',
            trigger: ['change', 'blur']
          },
          {
            type: 'isBlank',
            validator: validatorForm,
            trigger: ['change', 'blur']
          }
        ],
        phone: [
          {
            min: 1,
            max: 11,
            message: '长度不可超过 11 个数字',
            trigger: ['change', 'blur']
          },
          {
            type: 'number',
            validator: validatorForm,
            trigger: ['change', 'blur']
          }
        ]
      },
      searchForm: [
        {
          type: 'Input',
          label: '用户名',
          prop: 'username',
          placeholder: '请输入用户名'
        },
        {
          type: 'Input',
          label: '姓名',
          prop: 'chineseName',
          placeholder: '请输入姓名'
        },
        {
          type: 'Select',
          label: '角色',
          prop: 'roleId',
          filterable: true,
          options: []
        },
        {
          type: 'Input',
          label: '手机号',
          prop: 'phone',
          placeholder: '请输入手机号'
        },
        {
          type: 'DateTimeRange',
          label: '修改时间',
          prop: 'dataRange'
        }
      ],
      dataRange: null
    }
  },
  watch: {},
  async created() {
    this.operate = {
      width: '280',
      data: [
        {
          name: '编辑',
          func: 'handle-edit',
          type: 'primary',
          authString: 'audit:user:edit'
        },
        {
          name: '重置密码',
          func: 'reset-pwd',
          type: 'warning',
          authString: 'audit:user:pwd'
        },
        {
          name: '删除',
          func: 'handle-delete',
          type: 'danger',
          auth: '删除用户',
          authString: 'audit:user:delete'
        }
      ]
    }
    this.goToPage()
    this.getRoleList()
  },
  computed: {
    ...mapGetters(['commonInfo'])
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      try {
        const ret = await roleListApi()
        const roleData = ret.data.list || []
        const arr = Utils.filterArraySelect(roleData, 'name', 'id')
        this.searchForm[2].options = arr
      } catch (error) {}
    },
    // 获取用户列表
    async getDataList(params = {}) {
      this.loading = true
      try {
        const ret = await getUserListApi(params)
        this.tableData = ret.data.list || []
        this.total = parseInt(ret.data.total)
      } catch (error) {}
      this.loading = false
    },
    handleEdit(val) {
      // this.$router.push('/audit/user/modify/?id=' + val.row.auditUserId)
      this.$router.push('modify/' + val.row.id)
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(async () => {
          try {
            const params = { id: val.row.id }
            const ret = await deleteUserApi(params)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.goToPage()
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    resetPwd(val) {
      this.$confirm('确定要重置密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            const params = { id: val.row.id }
            const ret = await resetUserPwdApi(params)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getDataList()
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 切换table页
    changeCurrentPage(val) {
      this.currentPage = val
      this.goToPage()
    },
    // 切换每页条数
    changePageSize(val) {
      this.pageSize = val
      this.goToPage()
    },
    // 查询
    handleFilter(val) {
      this.searchData = val
      this.searchData.startTime = null
      this.searchData.endTime = null
      if (this.searchData.dataRange && this.searchData.dataRange.length > 0) {
        this.searchData.startTime = this.searchData.dataRange[0] || ''
        this.searchData.endTime = this.searchData.dataRange[1] || ''
      }
      this.currentPage = 1
      this.goToPage()
    },
    // 查询数据
    goToPage() {
      const params = { curPage: this.currentPage, perPage: this.pageSize }
      Object.assign(params, this.searchData)
      if (params.dataRange) {
        delete params.dataRange
      }
      this.getDataList(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-default {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
