<template>
  <!-- 路由显示 -->
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 只有一个children,并且不显示父级菜单 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link
        :to="resolvePath(onlyOneChild.path)"
        :target="onlyOneChild.target"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>
    <!-- 只有一个children -->

    <!-- 大于一个children的菜单 && 只有一个children的菜单并且要显示父级菜单 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <!-- 继续循环当前组件 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
    <!-- 不是只有一个的children -->
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // item.child是否有
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          // 不显示
          return false
        } else {
          // 显示
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个child的时候，直接返回true
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有child,把{path: '', noShowingChildren: true}添加到parent中
      // 例如./showIndex
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // import path from 'path'     //引入node的path模块
      // path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
