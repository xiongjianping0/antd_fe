<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <!-- 表格 -->
      <div class="page-body">
        <div class="common-action-row clearfix">
          <el-header style="float:right">
            <router-link to="add">
              <el-button
                v-if="isAuth('audit:role:add')"
                type="primary"
                size="small"
                >新增角色</el-button
              >
            </router-link>
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
          @handle-privilege="handlePrivilege"
          @pagination-current-change="changeCurrentPage"
          @pagination-size-change="changePageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommonTable from '@/components/Base/Table'
import { mapGetters } from 'vuex'
import Utils from '@/utils/util.js'
import { rolePageListApi, deleteRoleApi } from '@/api/audit/role'
export default {
  name: 'AuditRoleList',
  components: {
    CommonTable
  },
  data() {
    return {
      // --分页 start--
      total: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageSize: 10, // 每页10条数据
      // --分页 end--
      tableColumn: [
        { prop: 'name', label: '角色名' },
        { prop: 'description', label: '描述' },
        { prop: 'updateTime', label: '更新时间' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        width: '250px',
        data: [
          {
            name: '编辑',
            func: 'handle-edit',
            type: 'primary',
            authString: 'audit:role:edit'
          },
          {
            name: '权限',
            func: 'handle-privilege',
            type: 'warning',
            authString: 'audit:role:privilege'
          },
          {
            name: '删除',
            func: 'handle-delete',
            type: 'danger',
            auth: '删除角色',
            authString: 'audit:role:delete'
          }
        ]
      }, // 表格按键操作区;
      loading: true,
      rolesPath: ''
    }
  },
  watch: {},
  async created() {
    this.getDataList()
  },
  computed: {
    ...mapGetters(['commonInfo'])
  },
  mounted() {
    console.log(this.commonInfo)
  },
  methods: {
    async getDataList() {
      try {
        const params = { curPage: this.currentPage, perPage: this.pageSize }
        const ret = await rolePageListApi(params)
        this.tableData = ret.data.list || []
        this.total = parseInt(ret.data.total)
      } catch (error) {}
      this.loading = false
    },
    handleEdit(val) {
      this.$router.push('modify/' + val.row.id)
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(async () => {
          try {
            const params = { id: val.row.id }
            const ret = await deleteRoleApi(params)
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
    handlePrivilege(val) {
      this.$router.push('privilege/' + val.row.id + '/' + val.row.name)
    },
    // 切换table页
    async changeCurrentPage(val) {
      this.currentPage = val
      await this.getDataList()
    },
    // 切换每页条数
    async changePageSize(val) {
      this.pageSize = val
      await this.getDataList()
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
