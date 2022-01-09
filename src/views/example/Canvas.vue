<template>
  <div class="panel-default">
    <div class="page-heading">
      <h4 />
    </div>
    <div class="page-body">
      <canvas id="canvas" width="288" height="384" @click="clickCanvas" />
      <!-- 内容 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Canvas',
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      var canvas = document.getElementById('canvas')
      if (!canvas.getContext) return
      var ctx = canvas.getContext('2d')
      for (var i = 0; i < 384; i++) {
        for (var j = 0; j < 288; j++) {
          ctx.fillStyle = 'rgb(' + Math.floor(255 - i) + ',' +
            Math.floor(255 - j) + ',' + Math.floor(255 - i) + ')'
          ctx.fillRect(j * 1, i * 1, 1, 1)
          // x y 1 1
        }
      }
    },
    clickCanvas(e) {
    }
  }
}
</script>

<style lang="scss" scoped></style>
