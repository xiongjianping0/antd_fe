/**
 * 拖拽
 */

import Vue from 'vue'
const drag = Vue.directive('drag', {
  bind: function(el, binding, vnode, oldVnode) {
    const vm = vnode.context
    el.style.cursor = 'move'
    el.onmousedown = e => {
      const oDiv = el
      const oParent = el.parentNode // 父级元素
      // clientX: 鼠标指针相对于浏览区页面的坐标
      // offsetLeft: 在不设置定位的情况下，是到浏览器窗口内侧的距离
      // 如果父元素设置了定位，那就是到父元素的距离
      const disX = e.clientX - oDiv.offsetLeft
      const disY = e.clientY - oDiv.offsetTop
      let leftValue = (oDiv.offsetLeft / oParent.offsetWidth * 100).toFixed(1)
      let topValue = (oDiv.offsetTop / oParent.offsetHeight * 100).toFixed(1)
      // 鼠标按下的操作
      if (vm.dragDownFunction) {
        vm.dragDownFunction(el, leftValue, topValue)
      }
      document.onmousemove = e => {
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 防止出界
        if (left < 0) {
          left = 0
        } else if (left > oParent.offsetWidth) {
          left = oParent.offsetWidth
        }
        if (top < 0) {
          top = 0
        } else if (top > oParent.offsetHeight) {
          top = oParent.offsetHeight
        }
        leftValue = (left / oParent.offsetWidth * 100).toFixed(1)
        topValue = (top / oParent.offsetHeight * 100).toFixed(1)
        oDiv.style.left = leftValue + '%'
        oDiv.style.top = topValue + '%'
        // 鼠标移动时的操作
        if (vm.dragMoveFunction) {
          vm.dragMoveFunction(el, leftValue, topValue)
        }
      }
      document.onmouseup = e => {
        // 鼠标弹起来的时候不再移动
        document.onmousemove = null
        // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
        document.onmouseup = null
        // 鼠标抬起之后的操作
        if (vm.dragUpFunction) {
          vm.dragUpFunction(el, leftValue, topValue)
        }
      }

      return false
    }
  }
})

// v-dialogDrag: 弹窗拖拽
const dialogDrag = Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

export {
  drag,
  dialogDrag
}
