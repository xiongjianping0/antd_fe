<template>
  <div
    class="index-container"
    :style="{'height': boxHeight}"
  >
    <adminDashboard />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  inject: ['reload'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name']),
    boxHeight: function() {
      return document.documentElement.clientHeight - 140 + 'px'
    }
  },
  mounted() {
    // const self = this
    // const timer = setInterval(() => {
    //   self.reload()
    // }, 1000 * 60 * 5)
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer)
    // })
  }
  /*   beforeDestroy(){  // 组件销毁前调用
    clearInterval(this.timer)
    this.timer = null
  } */
  // 不使用beforeDestroy的原因,这里有两个潜在的问题：
  // 它需要在这个组件实例中保存这个 picker，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
  // 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。
}
</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100%;
  // min-width: 1300px;
  // min-height: 800px;
  /* background-image: url(./../../assets/dashboard/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%; */
}
</style>
