import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_sidebarElm: null
    }
  },
  mounted() {
    // 初始化resize事件，向window添加resize事件
    this.$_initResizeEvent()
    // 监听菜单栏自适应事件
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // to fixed bug when cached by keep-alive
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 监听this.chart自适应resize()
    $_resizeHandler() {
      return debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)()
    },
    // 向window添加resize事件
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    // 移除resize事件
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    // 菜单栏收缩展开，触发自适应事件
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    // 监听菜单栏自适应事件
    $_initSidebarResizeEvent() {
      this.$_sidebarElm = document.getElementsByClassName(
        'sidebar-container'
      )[0]
      this.$_sidebarElm &&
        this.$_sidebarElm.addEventListener(
          'transitionend',
          this.$_sidebarResizeHandler
        )
    },
    // 移除菜单事件
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm &&
        this.$_sidebarElm.removeEventListener(
          'transitionend',
          this.$_sidebarResizeHandler
        )
    }
  }
}
