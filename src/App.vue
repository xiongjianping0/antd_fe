<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
    // document.getElementById('loader').style.display = 'none'
  },
  // 用provide / inject 组合
  // 原理：允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，
  // 并在起上下游关系成立的时间里始终生效
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
