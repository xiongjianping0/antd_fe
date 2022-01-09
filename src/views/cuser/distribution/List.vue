<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>分销列表</h4>
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
          @pagination-current-change="changeCurrentPage"
          @pagination-size-change="changePageSize"
        />
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

import { getUserListApi } from '@/api/cuser/user'
const roomUserGender = {
  0: '未知',
  1: '男',
  2: '女'
}
export default {
  name: 'DistributionList',
  components: {
    CommonTable,
    CommonTableSearch,
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
          prop: 'money',
          label: '分销金额',
        },
        {
          prop: 'gender',
          label: '性别',
          render: function (h, params) {
            return h('span', roomUserGender[params.row.gender])
          }
        },
        { prop: 'withdrawdeposit', label: '提现金额' },
        { prop: 'idcard', label: '身份证号' },
        { prop: 'balance', label: '账户余额' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        width: '140',
        data: [
          
          
        ]
      }, // 表格按键操作区;
      loading: true, // 数据加载中
      /* 分页 */
      currentPage: 1, // 当前页
      pageSize: 10, // 每页的条数
      total: 0, // 数据总数
     
    
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
 
  }
}
</script>
