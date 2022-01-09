<template>
  <div class="page-privilege">
    <div class="panel-default">
      <div class="page-heading">
        <h4>
          <el-tag type="warning" style="font-size: 15px;">{{
            roleName
          }}</el-tag>
          - 权限管理
        </h4>
      </div>
      <div class="page-body">
        <el-row :gutter="20">
          <el-col
            :lg="22"
            :md="20"
            :sm="24"
            :xs="24"
            :span="12"
            class="form-col"
          >
            <el-form>
              <el-form-item class="privilege-form">
                <!-- :render-content="renderContent" -->
                <el-tree
                  class="privilege-tree"
                  ref="menuListTree"
                  v-loading="loading"
                  element-loading-text="加载中"
                  element-loading-background="rgba(0, 0, 0, 0)"
                  :data="menuList"
                  :props="menuListTreeProps"
                  node-key="id"
                  :default-expand-all="false"
                  :empty-text="tipText"
                  show-checkbox
                />
              </el-form-item>
              <el-form-item class="submit">
                <el-button size="medium" @click="back">返 回</el-button>
                <el-button
                  type="primary"
                  :loading="btnLoading"
                  size="medium"
                  @click="dataFormSubmit"
                  >提 交</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import { getMenuListApi } from '@/api/menu/audit'
import {
  getRolePrivilegeListApi,
  updateRolePrivilegeApi
} from '@/api/audit/role'
export default {
  name: 'Privilege',
  inject: ['reload'],
  data() {
    return {
      btnLoading: false,
      dataForm: {
        id: 0,
        privilegeIds: []
      },
      roleName: '',
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      tempKey: '-666666', // 临时key, 用于解决tree半选中状态项不能传给后台接口问题.
      loading: true,
      tipText: ''
    }
  },
  created() {
    const id = this.$route.params.id || 0
    const roleName = this.$route.params.name || ''
    this.dataForm.id = id
    this.roleName = roleName
  },
  mounted() {
    this.getMenuList()
    this.getPrivilegeList()
  },
  methods: {
    async getPrivilegeList() {
      const res = await getRolePrivilegeListApi({
        id: this.dataForm.id
      })
      const privileges = res.data.privileges || []
      const idx = privileges.indexOf(this.tempKey)
      if (idx !== -1) {
        privileges.splice(idx, privileges.length - idx)
      }
      this.$refs.menuListTree.setCheckedKeys(privileges)
    },
    async getMenuList() {
      try {
        const res = await getMenuListApi()
        if (res.code === 0) {
          this.menuList = res.data || []
          this.loading = false
          if (this.menuList.length == 0 && !this.loading) {
            this.tipText = '暂无数据'
          }
          /* setTimeout(() => {
            this.changeCss()
          }, 500) */
        }
      } catch (error) {}
    },
    // 内容区渲染后执行 判断底层 赋 class
    /* renderContent(h, { node, data, store }) {
      if (navigator.appName == 'Microsoft Internet Explorer') {
        return <span class="el-tree-node__label">{node.label}</span>
      }
      let classname = 'parent-level'
      if (node.level === 3) {
        classname = 'lastlevel'
      }
      // 由于项目中有二级菜单也有三级菜单，就要在此做出判断。
      if (node.level === 2 && node.childNodes.length === 0) {
        classname = 'lastlevel parent-level'
      }
      return <p class={classname}>{node.label}</p>
    }, */
    // 表单提交
    dataFormSubmit() {
      this.dataForm.privilegeIds = [].concat(
        this.$refs.menuListTree.getCheckedKeys(),
        [this.tempKey],
        this.$refs.menuListTree.getHalfCheckedKeys()
      )
      if (this.dataForm.privilegeIds && this.dataForm.privilegeIds.length > 1) {
        this.savePost()
      } else {
        this.$message.error('请选择权限')
      }
    },
    async savePost() {
      this.btnLoading = true
      try {
        let ret = ''
        console.log(this.dataForm)
        ret = await updateRolePrivilegeApi(this.dataForm)
        if (ret.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功，正在刷新...',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.reload()
            }
          })
        }
      } catch (error) {
        this.btnLoading = false
      }
    }
    /* changeCss() {
      if (navigator.appName == 'Microsoft Internet Explorer') {
        return
      }
      var levelName = document.getElementsByClassName('lastlevel') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        // levelName[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].closest('.el-tree-node').style.cssFloat = 'left'
        levelName[i].closest('.el-tree-node').style.styleFloat = 'left'
        levelName[i].closest('.el-tree-node').style.float = 'left'
        levelName[i].closest('.el-tree-node__content').style.cssFloat = 'left'
        levelName[i].closest('.el-tree-node__content').style.styleFloat = 'left'
        levelName[i].closest('.el-tree-node__content').style.float = 'left'
      }
      var parentLevelName = document.getElementsByClassName('parent-level') // levelname是上面的最底层节点的名字
      for (var j = 0; j < parentLevelName.length; j++) {
        parentLevelName[j].parentNode.style.width = '100%'
      }
    } */
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.privilege-form {
  .max-width {
    width: 100%;
  }
  .privilege-tree {
    width: 100%;
    background: none;
    color: $priEltreeFontColor;
    .el-tree-node {
      margin-bottom: 10px;
      .el-tree-node__children {
        .el-tree-node {
          .el-tree-node__children {
            .el-tree-node {
              float: left;
            }
          }
        }
      }
    }
    .el-tree-node__expand-icon {
      font-size: 16px;
      color: #838485;
    }
    .el-tree-node__expand-icon.is-leaf {
      color: transparent;
      cursor: default;
    }
    .el-tree-node__content:hover {
      background-color: $priEltreeHoverFocusBg !important;
    }
    .el-tree-node:focus > .el-tree-node__content {
      background-color: $priEltreeHoverFocusBg !important;
    }
    .el-tree-node__content {
      margin-bottom: 5px;
    }
  }
}
</style>
