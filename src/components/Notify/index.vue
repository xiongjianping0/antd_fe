<template>
  <!-- dropdown-item触发事件 -->
  <el-dropdown>
    <div class="notify">
      <el-badge :value="nums" class="item">
        <img class="icon-img" src="@/assets/notify/message_icon.png">
      </el-badge>
    </div>
    <el-dropdown-menu slot="dropdown" style="position:relative;">
      <div class="notify-title">
        <p>消息提醒</p>
        <p class="button" @click="showMore">查看更多</p>
      </div>
      <div class="left-border" />
      <el-dropdown-item
        v-for="unread in unreadMessages"
        :key="unread.warnNoticeId"
        class="unread-messages"
        @click.native="showItem(unread.warnNoticeId)"
      >
        {{ unread.zoneText }}-{{ unread.dataTypeText }}值:{{ unread.maxValue
        }}{{ unread.dataTypeUnit }}
        <span class="date-time">{{ unread.createTimeText }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { getNoticeList } from '@/api/dashboard'
import eventBus from '@/utils/event-bus.js'

export default {
  data() {
    return {
      notify: null,
      nums: 0,
      unreadMessages: []
    }
  },
  computed: {},
  created() {
    this.$nextTick(() => {
      this.getMsgList()
    })
  },
  // mounted是在el挂载到实例上后调用，一般第一个业务逻辑会在这里开启
  mounted() {
    var _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.hmsTimer = setInterval(function() {
      _this.getMsgList()
    }, 1000 * 5 * 60)
    eventBus.$on('count', res => {
      this.getMsgList()
    })
  },
  beforeDestroy() {
    if (this.hmsTimer) {
      clearInterval(this.hmsTimer) // 在Vue实例销毁前，清除定时器
    }
    eventBus.$off('count')
  },
  methods: {
    // 预警实时消息
    async getMsgList() {
      try {
        const ret = await getNoticeList()
        console.log('components|notify|index', ret.data.list)
        this.unreadMessages = ret.data.list.slice(0, 5) || []
        this.nums = ret.data.count || 0
      } catch (error) {}
    },
    // 查看更多
    showMore() {
      this.$router.push({ path: '/warning/info/list' })
    },
    showItem(warnNoticeId) {
      this.$router.push({ path: '/warning/info/list', query: { warnNoticeId }})
    }
  }
}
</script>

<style lang="scss" scoped>
.notify {
  height: 36px;
  width: 36px;
  margin-top: 10px;
  background: #0f1e4c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  .icon-img {
    width: 18px;
    height: 18px;
  }
}

.el-popper {
  padding: 0 10px;

  /* .el-dropdown-menu__item:nth-child(3) {
    &:after {
      content: "";
      position: absolute;
      right: 38px;
      top: 0px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
    }
  } */

  .el-dropdown-menu__item.unread-messages {
    position: relative;
    display: table;

    &:before {
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      background: #f4516c;
    }
  }

  .el-dropdown-menu__item.read-messages {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      background: #ebedf2;
    }
  }
}

.notify-title {
  /*   display: flex;
  justify-content: space-between;
  align-items: center; */
  font-size: 14px;
  color: #45526b;
  /*   margin-left: 5px;
  margin-right: 15px;
  padding-bottom: 8px;
  height: 30px; */
  min-width: 150px;
  border-bottom: 1px solid #dee2e6;
  width: 100%;
  display: table;
  p {
    float: left;
  }
  .button {
    float: right;
    font-size: 12px;
    border: 1px solid #596c8e;
    border-radius: 2px;
    cursor: pointer;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }
}

.left-border {
  position: absolute;
  box-sizing: border-box;
  background: #fff;
  width: 1px;
  height: calc(100% - 90px);
  top: 63px;
  left: 18px;
  border-left-color: rgb(235, 237, 242);
  border-left-style: solid;
  border-left-width: 1px;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
}

.date-time {
  float: right;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  color: #c4c9d2;
}
.notify >>> .el-badge__content.is-fixed {
  transform-origin: center center;
  transform: translateY(-10%) translateX(100%) scale(0.8) !important;
}

.notify >>> .el-badge__content {
  border: 1px solid transparent !important;
  line-height: 20px !important;
}
</style>
