<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>轮播图管理列表</h4>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <common-table-search
          size="mini"
          label-width="100px"
          :search-data="searchData"
          :search-form="searchForm"
          @handle-filter="handleFilter"
        />
      </div>
      <!-- 搜索 -->
      <div class="page-body">
        <!-- 新增轮播图 -->
        <div class="common-action-row clearfix">
          <el-header style="float: right;">
            <router-link to="add">
              <el-button
                v-if="isAuth('system:carousel:add')"
                type="primary"
                size="small"
                >新增轮播图</el-button
              >
            </router-link>
          </el-header>
        </div>
        <!-- 新增轮播图 -->
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
          @handle-carousel-delete="handleCarouselDelete"
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
import { getCarouselDataApi, deleteCarouselApi } from '@/api/system/carousel'
const typeList = [
  {
    label: '小程序首页轮播',
    value: 1
  },
  {
    label: '商城轮播',
    value: 2
  },
  {
    label: '订单支付成功页面轮播',
    value: 3
  },
  {
    label: '养生常识详情轮播',
    value: 4
  }
]

export default {
  name: 'ClientProductNews',
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
          label: '标题',
          prop: 'name',
          placeholder: '请输入标题'
        },
        {
          type: 'Select',
          label: '轮播图页面',
          prop: 'type',
          options: typeList
        }
      ], // 搜索类型
      // 搜索数据
      searchData: {
        name: null,
        carouselPage: null
      },
      /* 表格 */
      tableColumn: [
        { prop: 'id', label: '轮播ID' },
        { prop: 'title', label: '标题' },
        {
          prop: 'type',
          label: '轮播图页面',
          formatter: (row, index) => {
            return typeList.find(item => item.value == row.type).label
          }
        },
        { prop: 'rankNumber', label: '权重' },
        { prop: 'createTime', label: '创建时间' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        width: '240',
        data: [
          {
            name: '编辑',
            func: 'handle-edit',
            type: 'primary',
            authString: 'system:carousel:edit'
          },
          {
            name: '删除',
            func: 'handle-carousel-delete',
            type: 'danger',
            authString: 'system:carousel:delete'
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
    async getCarouselList(params = {}) {
      this.loading = true
      try {
        const res = await getCarouselDataApi(params)
        if (res.code === 0) {
          this.tableData = res.data.list || []
          this.total = parseInt(res.data.total)
        }
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
      this.getCarouselList(params)
    },
    // 删除
    handleCarouselDelete({ row }) {
      const id = row.id || 0
      if (!id) {
        return
      }
      this.$confirm('此操作将永久删除该轮播图，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(async () => {
          try {
            const res = await deleteCarouselApi({
              id
            })
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功，正在刷新...',
                onClose: () => {
                  this.goToPage()
                }
              })
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 编辑
    handleEdit({ row }) {
      const id = row.id || 0
      if (!id) {
        return
      }
      this.$router.push(`edit/${id}`)
    }
  }
}
</script>
