<template>
  <section class="app-main">
    <el-scrollbar
      wrap-class="scrollbar-wrapper-appmain"
      view-class="scrollbar-view-appmain"
    >
      <breadcrumb class="breadcrumb-container" />
      <div class="page-container">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </el-scrollbar>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data() {
    return {
      toPath: '',
      fromPath: ''
    }
  },
  computed: {
    // 由于 Vue 会复用相同组件, 即 /page/1 => /page/2
    // 或者 /page?id=1 => /page?id=2 这类链接跳转时,
    // 将不在执行created, mounted之类的钩子,
    key() {
      // if(JSON.stringify(this.$route.query) == "{}"){
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
      return this.$route.path
    }
  },
  watch: {},
  mounted() {
    document.getElementById('loader').style.display = 'none'
  }
}
</script>
<style lang="scss">
.app-main {
  /*50 = navbar  */
  // min-height: calc(100vh - 50px);
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .scrollbar-wrapper-appmain {
    .scrollbar-view-appmain {
      overflow-x: hidden;
    }
  }
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.breadcrumb-container {
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: table;
  width: 100%;
}
.page-container {
  margin: 0 15px;
  padding: 0px 10px 10px 10px;
  border-radius: 5px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
