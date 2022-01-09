<template>
  <div class="panel-default">
    <div class="page-heading">
      <h4>菜单列表</h4>
    </div>
    <div class="page-body">
      <div class="common-action-row clearfix">
        <el-header style="float:right">
          <el-button type="primary" size="medium" @click="addOrUpdateHandle()"
            >新增</el-button
          >
        </el-header>
      </div>
      <common-table
        :row-key="rowKey"
        :loading="loading"
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        @handle-edit="handleEdit"
        @handle-delete="handleDelete"
        :show-pagination="false"
      />
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <menu-form
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      :menu-type="menuType"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import MenuForm from './MenuForm'
import CommonTable from '@/components/Base/Table'
import Utils from '@/utils/util'

export default {
  name: 'MenuList',
  components: {
    CommonTable,
    MenuForm
  },
  data() {
    return {
      rowKey: 'id',
      dataForm: {},
      addOrUpdateVisible: false,
      tableColumn: [
        {
          width: '300px',
          prop: 'name',
          label: '名称',
          formatter: row => {
            return row.hidden === 1 ? `${row.name}【隐藏菜单】` : row.name
          }
        },
        { prop: 'parentName', label: '上级菜单' },
        {
          prop: 'icon',
          label: '图标',
          width: '100px',
          render: (h, params) => {
            return (
              h('svg-icon', {
                props: {
                  iconClass: params.row.icon
                } // 组件的props
              }) || '-'
            )
          }
        },
        {
          prop: 'type',
          label: '类型',
          width: '100px',
          align: 'center',
          render: (h, params) => {
            return h(
              'el-tag',
              {
                props: {
                  type:
                    params.row.type === 0
                      ? 'warning'
                      : params.row.type === 1
                      ? 'default'
                      : 'info',
                  size: 'small',
                  effect: 'dark'
                } // 组件的props
              },
              params.row.type === 0
                ? '目录'
                : params.row.type === 1
                ? '菜单'
                : '按钮'
            )
          }
        },
        { prop: 'rankNumber', label: '排序号' },
        { prop: 'url', label: '菜单URL' },
        { prop: 'perms', label: '授权标识（rd）' },
        { prop: 'webPerms', label: '授权标识（fe）' }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {
        data: [
          {
            name: '编辑',
            func: 'handle-edit',
            type: 'primary',
            authString: 'menu:list:auth'
          },
          {
            name: '删除',
            func: 'handle-delete',
            type: 'danger',
            authString: 'menu:list:auth'
          }
        ]
      }, // 表格按键操作区;
      loading: true,
      menuType: 1 // 菜单类型,1:运营端；2：诊所端；3：商户端
    }
  },
  async created() {
    this.menuType = this.$route.meta.menuType || 1
    let apiData
    if (this.menuType == 1) {
      apiData = await import('@/api/menu/audit')
    } else if (this.menuType == 2) {
      apiData = await import('@/api/menu/clinic')
    } else if (this.menuType == 3) {
      apiData = await import('@/api/menu/merchant')
    }
    let { getMenuListApi, deleteMenuApi } = apiData
    this.getMenuListApi = getMenuListApi
    this.deleteMenuApi = deleteMenuApi
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    async getDataList() {
      try {
        const res = await this.getMenuListApi()
        if (res.code === 0) {
          this.tableData = res.data || []
        }
      } catch (error) {}
      this.loading = false
    },
    // 新增  修改
    addOrUpdateHandle() {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    // 删除
    handleDelete({ row }) {
      if (!row.id) {
        return
      }
      this.$confirm('您确定要删除此菜单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const param = { id: row.id }
        const res = await this.deleteMenuApi(param)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功，正在刷新...',
            onClose: () => {
              this.getDataList()
            }
          })
        }
      })
    },
    // 编辑
    async handleEdit({ row }) {
      if (!row.id) {
        return
      }
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row.id)
      })
    }
  }
}
</script>
<style lang="scss">
.el-table__expand-icon > .el-icon {
  color: #fff;
  top: 45%;
}
</style>
