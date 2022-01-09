<template>
  <div class="dashboard-container">
    <showHeader />
    <div class="container-content">
      <adminDashboard />
    </div>
  </div>
</template>

<script>
import adminDashboard from './admin'
import { mapGetters } from 'vuex'
import showHeader from './show/components/Header'
import setting from '@/store/modules/settings'

export default {
  name: 'ShowIndex',
  components: {
    adminDashboard,
    showHeader
  },
  inject: ['reload'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    document.getElementById('loader').style.display = 'none'
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  min-width: 1300px;
  min-height: 935px;
  overflow: hidden;
  /* background-image: url(./../../assets/dashboard/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%; */
}
.container-content {
  width: 100%;
  height: calc(100% - 125px);
}
</style>
