<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="150px"
      @keyup.enter.native="dataFormSubmit()"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio
            v-for="(type, index) in typeList"
            :key="index"
            :label="index"
            @change="changeTypeRadioHandler"
            >{{ type }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="typeList[dataForm.type] + '名称'" prop="name">
        <el-input
          v-model="dataForm.name"
          :placeholder="typeList[dataForm.type] + '名称'"
        />
      </el-form-item>
      <el-form-item
        label="上级菜单"
        prop="parentName"
        :rules="
          dataForm.type !== 0
            ? { required: true, message: '上级菜单不能为空', trigger: 'change' }
            : null
        "
      >
        <el-popover
          ref="menuListPopover"
          v-model="visiblePopover"
          placement="bottom-start"
          trigger="click"
        >
          <el-tree
            ref="menuListTree"
            class="menu-tree"
            :data="menuList"
            :props="menuListTreeProps"
            node-key="id"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            @current-change="menuListTreeCurrentChangeHandle"
          />
        </el-popover>
        <el-input
          v-model="dataForm.parentName"
          v-popover:menuListPopover
          :readonly="true"
          placeholder="点击选择上级菜单"
          class="menu-list__input"
        />
      </el-form-item>
      <el-form-item label="菜单路由" v-if="dataForm.type !== 2" prop="url">
        <el-input v-model="dataForm.url" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item
        label="菜单完整路由"
        v-if="dataForm.type !== 2"
        prop="fullUrl"
      >
        <el-input v-model="dataForm.fullUrl" placeholder="菜单完整路由" />
      </el-form-item>
      <el-form-item
        label="页面地址"
        v-if="dataForm.type !== 2 || viewPathShow"
        prop="viewPath"
      >
        <el-input v-model="dataForm.viewPath" placeholder="页面地址" />
      </el-form-item>
      <el-form-item label="授权标识（rd）" prop="perms">
        <el-input
          type="textarea"
          rows="4"
          resize="none"
          v-model="dataForm.perms"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item
        v-if="dataForm.type === 2"
        label="授权标识（fe）"
        prop="webPerms"
      >
        <el-input
          v-model="dataForm.webPerms"
          placeholder="多个用逗号分隔, 如: user:list,user:create"
        />
      </el-form-item>
      <el-form-item label="排序号" prop="rankNumber">
        <el-input-number
          v-model="dataForm.rankNumber"
          controls-position="right"
          :min="0"
          :max="4294967295"
          label="排序号"
        />
      </el-form-item>
      <el-form-item
        v-if="dataForm.type !== 2"
        :label="dataForm.type === 0 ? '目录隐藏' : '菜单隐藏'"
        prop="hidden"
      >
        <el-switch v-model="dataForm.hidden" />
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" label="打开新标签" prop="target">
        <el-switch v-model="dataForm.target" />
      </el-form-item>
      <el-form-item
        v-if="dataForm.type === 0"
        label="目录是否一直显示"
        prop="alwaysShow"
      >
        <el-switch v-model="dataForm.alwaysShow" />
        <span class="help-block">只有一个子菜单，目录也将显示</span>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-inner">
                <div class="mod-menu__icon-list">
                  <el-button
                    v-for="(item, index) in iconList"
                    :key="index"
                    :class="{ 'is-active': item === dataForm.icon }"
                    @click="iconActiveHandle(item)"
                  >
                    <svg-icon :icon-class="item" />
                  </el-button>
                </div>
              </div>
            </el-popover>
            <el-input
              v-model="dataForm.icon"
              v-popover:iconListPopover
              placeholder="菜单图标名称"
              class="icon-list__input"
            />
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light">
              <div slot="content" style="color:#999">
                全站推荐使用SVG Sprite, 详细请参考:
                <a>icons/index.js</a>描述
              </div>
              <i
                class="el-icon-warning"
                style="color:#f56c6c;margin-left:10px;font-size:20px"
              />
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Utils from '@/utils/util'
import Icon from '@/icons'

export default {
  name: 'MenuForm',
  props: {
    menuType: {
      type: Number
    }
  },
  data() {
    var validateUrl = (rule, value, callback) => {
      if (this.dataForm.type === 1 && !/\S/.test(value)) {
        callback(new Error('菜单URL不能为空'))
      } else {
        callback()
      }
    }
    var validateViewPath = (rule, value, callback) => {
      if (this.dataForm.type === 1 && !/\S/.test(value)) {
        callback(new Error('页面地址不能为空'))
      } else if (
        this.dataForm.type === 0 &&
        !/\S/.test(value) &&
        this.viewPathShow
      ) {
        callback(new Error('页面地址不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      viewPathShow: false,
      visiblePopover: false, // 选中菜单后el-popover消失
      typeList: ['目录', '菜单', '按钮'],
      dataForm: {
        id: 0,
        type: 1,
        name: '',
        parentId: -1,
        parentName: '',
        url: '',
        fullUrl: '',
        viewPath: '',
        perms: '',
        webPerms: '',
        rankNumber: 0,
        icon: '',
        hidden: false,
        target: false,
        alwaysShow: false
      },
      iconList: [],
      dataRule: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        url: [{ validator: validateUrl, trigger: 'blur' }],
        fullUrl: [{ validator: validateUrl, trigger: 'blur' }],
        viewPath: [{ validator: validateViewPath, trigger: 'blur' }]
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      changValue: null
    }
  },
  watch: {
    menuType: newVal => {
      if (newVal) {
      }
    }
  },
  created() {
    this.iconList = Icon.getNameList()
  },
  methods: {
    async getRequestApi() {
      let apiData
      if (this.menuType == 1) {
        apiData = await import('@/api/menu/audit')
      } else if (this.menuType == 2) {
        apiData = await import('@/api/menu/clinic')
      } else if (this.menuType == 3) {
        apiData = await import('@/api/menu/merchant')
      }
      let {
        getMenuListApi,
        getMenuInfoApi,
        createMenuApi,
        updateMenuApi
      } = apiData
      this.getMenuListApi = getMenuListApi
      this.getMenuInfoApi = getMenuInfoApi
      this.createMenuApi = createMenuApi
      this.updateMenuApi = updateMenuApi
    },
    // 上级菜单列表
    async menuSelectList() {
      try {
        const res = await this.getMenuListApi()
        if (res.code === 0) {
          this.menuList = res.data || []
        }
      } catch (e) {}
    },
    // 菜单详情
    async menuInfo(id) {
      const params = { id }
      try {
        const res = await this.getMenuInfoApi(params)
        if (res.code === 0) {
          this.dataForm = res.data || {}
          this.valueHandlerChangeBoolean('hidden', res.data.hidden)
          this.valueHandlerChangeBoolean('target', res.data.target)
          this.valueHandlerChangeBoolean('alwaysShow', res.data.alwaysShow)
          this.menuListTreeSetCurrentNode()
        }
      } catch (error) {}
    },
    // 将查询结果数字转boolean
    valueHandlerChangeBoolean(param, value) {
      const flag = value === 1
      this.$set(this.dataForm, param, flag)
    },
    // 新增时处理单选按钮让每次表单重置 防止规则覆盖 或是规则
    changeTypeRadioHandler(value) {
      // if (!this.dataForm.id) {
      this.$refs['dataForm'].resetFields()
      this.$set(this.dataForm, 'type', value)
      if (value === 2) {
        this.viewPathShow = false
      }
    },
    // 菜单树选中
    menuListTreeCurrentChangeHandle(data, node) {
      this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
      this.visiblePopover = false
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode() {
      setTimeout(() => {
        // 修改数据
        this.changValue = 1
        // DOM还没更新
        this.$nextTick(() => {
          if (this.dataForm.type !== 0) {
            // DOM现在更新了
            this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
            this.dataForm.parentName = this.dataForm.parentName || ''
          }
        })
      }, 0)
    },
    // 图标选中
    iconActiveHandle(iconName) {
      this.dataForm.icon = iconName
    },
    // 页面初始化
    async init(id = 0) {
      await this.getRequestApi()
      this.dataForm.id = id
      // 上级菜单列表
      this.menuSelectList()
      // 重置表单
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
      if (!this.dataForm.id) {
        // 新增
        this.menuListTreeSetCurrentNode()
      } else {
        // 修改
        this.menuInfo(this.dataForm.id)
      }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.dataForm)
          params.hidden = params.hidden ? 1 : 2
          params.target = params.target ? 1 : 2
          params.alwaysShow = params.alwaysShow ? 1 : 2
          if (!this.dataForm.id) {
            // 新增
            this.createMenu(params)
          } else {
            // 修改
            this.updateMenu(params)
          }
        }
      })
    },
    // 新增
    async createMenu(params) {
      const res = await this.createMenuApi(params)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '保存成功',
          duration: 1200,
          onClose: () => {
            this.visible = false
            this.$emit('refreshDataList')
          }
        })
      }
    },
    // 编辑
    async updateMenu(params) {
      const res = await this.updateMenuApi(params)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '更新成功',
          duration: 1200,
          onClose: () => {
            this.visible = false
            this.$emit('refreshDataList')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.menu-tree {
  height: 400px;
  overflow-y: auto;
}
.mod-menu__icon-list {
  .el-button {
    background: #3a89ff;
  }
}
.mod-menu {
  .menu-list__input,
  .icon-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }
  &__icon-popover {
    width: 458px;
    overflow: hidden;
  }
  &__icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
</style>
