<template>
  <div
    class="sidebar-logo-container"
    :class="{'collapse':collapse}"
  >
    <transition name="sidebarLogoFade">
      <!-- 收缩时的侧边栏头部 -->
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="shrinkLogoIcon"
          :src="shrinkLogoIcon"
          class="sidebar-logo"
        >
        <h1
          v-else
          class="sidebar-title"
        >{{ shrinkTitle }} </h1>
      </router-link>
      <!-- 展开时的侧边栏头部 -->
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="expandLogoImg"
          :src="expandLogoImg"
          class="sidebar-logo-expand"
        >
        <h1
          v-else
          class="sidebar-title sidebar-title-expand"
        >{{ expandTitle }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import setting from '@/store/modules/settings'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      shrinkTitle: '系统', // 收缩无图片文字
      shrinkLogoIcon: setting.state.sidebarLogoIcon, // 收缩时图片
      expandTitle: setting.state.systemTitle, // 展开时无图片文字
      expandLogoImg: setting.state.sidebarLogoImg // 展开时图片
    }
  },
  mounted() {
    // console.log(setting.state.sidebarLogoIcon)
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #030d2b;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-logo-expand {
      width: 137px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 51px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

    & .sidebar-title-expand {
      font-size: 17px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
