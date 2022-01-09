<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>表格</h4>
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
        <div class="common-action-row clearfix">
          <el-header style="float:right">
            <router-link to="add">
              <el-button type="primary" size="small">新增用户</el-button>
            </router-link>
          </el-header>
        </div>
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
import { getUserList } from '@/api/audit/user'

export default {
  name: 'ExampleTable',
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
          label: '用户名',
          prop: 'username',
          placeholder: '请输入用户名'
        },
        {
          type: 'Input',
          label: '姓名',
          prop: 'chineseName',
          placeholder: '请输入姓名'
        }
      ], // 搜索类型
      // 搜索数据
      searchData: {
        username: null,
        chineseName: null
      },
      /* 表格 */
      tableColumn: [
        {
          prop: 'username',
          label: '用户名',
          render: function(h, params) {
            return h('span', params.row.username)
          } // 需要渲染自定义dom,则使用此处；若不需要，删除即可
        },
        {
          prop: 'chineseName',
          label: '角色',
          formatter: function(row, item) {
            return `++++${row.chineseName}++++`
          } // 需要处理当前数据,则使用此处；若不需要，删除即可
        },
        { prop: 'phone', label: '手机号' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        width: '240',
        data: [
          {
            name: '编辑',
            func: 'handle-edit',
            type: 'primary'
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
          username: 'abc1',
          chineseName: '用户1',
          phone: '15600000000'
        },
        {
          username: 'abc2',
          chineseName: '用户2',
          phone: '15600000000'
        },
        {
          username: 'abc3',
          chineseName: '用户3',
          phone: '15600000000'
        },
        {
          username: 'abc4',
          chineseName: '用户4',
          phone: '15600000000'
        },
        {
          username: 'abc5',
          chineseName: '用户5',
          phone: '15600000000'
        }
      ]
      this.tableData = [...this.tableData, ...this.tableData]
      this.total = this.tableData.length
      this.loading = false
      return
      this.loading = true
      try {
        const res = await getUserList(params)
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
      this.$router.push('/')
    }
  }
}
</script>
