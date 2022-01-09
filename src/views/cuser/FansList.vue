<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>{{ parentUserName }} 粉丝列表</h4>
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
import { getaAppointList } from '@/api/audit/user'
import userImg from '@/assets/login/login_user_icon.png'

export default {
  name: 'CuserFansList',
  components: {
    CommonTable,
    CommonTableSearch
  },
  data() {
    return {
      parentUserName: "张三",
      /* 搜索 */
      searchForm: [
        {
          type: 'Input',
          label: '用户名',
          prop: 'nickname',
          placeholder: '请输入用户名'
        }
      ], // 搜索类型
      // 搜索数据
      searchData: {
        username: null
      },
      /* 表格 */
      tableColumn: [
        { prop: 'nickname', label: '用户名' },
        { prop: 'name', label: '姓名' },
        { prop: 'userImg', label: '头像', render: function (h, params) {
          let columnContent = {
            attrs: {
              src: params.row.userImg,
            },
            style: {
              width: '60px',
              height: '60px',
            }
          }
          return h('img', columnContent)
        }},
      ], // 表头数据
      tableData: [], // 表格数据
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
          username: '栀子花开1',
          name: '张飒1',
          userImg: userImg,
        },
        {
          username: '栀子花开2',
          name: '张飒2',
          userImg: userImg,
        },
        {
          username: '栀子花开3',
          name: '张飒3',
          userImg: userImg,
        },
        {
          username: '栀子花开4',
          name: '张飒4',
          userImg: userImg,
        },
        {
          username: '栀子花开5',
          name: '张飒5',
          userImg: userImg,
        }
      ]
      this.total = this.tableData.length
      this.loading = false
      return
      this.loading = true
      try {
        const res = await getClassifyList(params)
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
      this.$router.push('detail')
    }
  }
}
</script>

