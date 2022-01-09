<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>数据字典列表</h4>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <common-table-search
          size="mini"
          :search-data="searchData"
          :search-form="searchForm"
          @handle-filter="handleFilter"
        />
      </div>
      <!-- 搜索 -->
      <div class="page-body">
        <!-- 新增 -->
        <div class="common-action-row clearfix">
          <el-header style="float: right;">
            <router-link to="add">
              <el-button type="primary" size="small">新增数据字典</el-button>
            </router-link>
          </el-header>
        </div>
        <!-- 新增 -->
        <!-- 表格 -->
        <common-table
          :loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @handle-edit="handleEdit"
          @handle-delete="handleDelete"
          @pagination-current-change="changeCurrentPage"
          @pagination-size-change="changePageSize"
        />
        <!-- 表格 -->
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
import { getDictList } from '@/api/audit/user'

export default {
  name: 'DictTable',
  components: {
    CommonTable,
    CommonTableSearch
  },
  data() {
    return {
      /* 搜索 */
      searchForm: [
        {
          type: 'Input',
          label: '类型名称',
          prop: 'typeName',
          placeholder: '请输入类型名称'
        },
        {
          type: 'Input',
          label: '类型编码',
          prop: 'typeCode',
          placeholder: '请输入类型编码'
        }
      ], // 搜索类型
      // 搜索数据
      searchData: {
        typeName: null,
        typeCode: null,
        value: null,
        createTimeText: null
      },
      /* 表格 */
      tableColumn: [
        { prop: 'typeName', label: '类型名称' },
        { prop: 'typeCode', label: '类型编码' },
        { prop: 'value', label: '值' },
        { prop: 'createTimeText', label: '创建时间' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        width: '240',
        data: [
          {
            name: '编辑',
            func: 'handle-edit',
            type: 'primary'
          },
          {
            name: '删除',
            func: 'handle-delete',
            type: 'danger'
          }
        ]
      }, // 表格按键操作区;
      loading: true, // 数据加载中
      /* 分页 */
      currentPage: 1, // 当前页
      pageSize: 10, // 每页的条数
      total: 0 // 数据总数
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
      this.tableData = [
        {
          typeName: '性别',
          typeCode: 'SE001',
          value: '男',
          createTimeText: '2020-8-17 12:00:00'
        },
        {
          typeName: '性别',
          typeCode: 'SE001',
          value: '女',
          createTimeText: '2020-8-17 12:00:00'
        }
      ]
      this.total = this.tableData.length
      this.loading = false
      return
      this.loading = true
      try {
        const res = await getDictList(params)
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
    // 编辑
    handleEdit(val) {
      this.$router.push('edit/123456')
    },
    // 删除
    handleDelete(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
