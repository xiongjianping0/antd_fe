import { cloneDeep, debounce, throttle } from 'lodash'

/* eslint-disable */
const Utils = {}

/** 参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标字节长度
 * 返回值： 处理结果字符串
 */
Utils.cutString = (str, len) => {
  if (str.length * 2 <= len) {
    return str
  }
  let strlen = 0
  let s = ''
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-line
    s += str.charAt(i)
    if (str.charCodeAt(i) > 128) {
      strlen += 2
      if (strlen >= len) {
        return `${s.substring(0, s.length - 1)}...`
      }
    } else {
      strlen += 1
      if (strlen >= len) {
        return `${s.substring(0, s.length - 2)}...`
      }
    }
  }
  return s
}

/*
 * 将url参数部分解析成key/value形式
 * @param {string} url，格式key=value&key=value
 * @returns {Object} json对象{key:value,key:value}
 */
;(Utils.UrlToJSON = url => {
  if (!url) {
    return {}
  }
  var result = {},
    pairs = url.split('&'),
    i,
    keyValue,
    len
  for (i = 0, len = pairs.length; i < len; i++) {
    keyValue = pairs[i].split('=')
    result[keyValue[0]] = decodeURIComponent(keyValue[1])
  }
  return result
}),
  /**
   * json转换为url(对象转为url)
   * @param {Object} json数据
   * @returns {string} url
   */
  (Utils.JsonToUrl = json => {
    if (!json) {
      return ''
    }
    let arr = [],
      key
    for (key in json) {
      if (json.hasOwnProperty(key)) {
        arr.push(key + '=' + encodeURIComponent(json[key]))
      }
    }
    return arr.join('&')
  }),
  /**
   * 简单数组的交集
   * @param {Array} a
   * @param {Array} b
   */
  (Utils.getIntersect = (a, b) => {
    if (a.constructor === Array && b.constructor === Array) {
      const set1 = new Set(a)
      const set2 = new Set(b)
      return Array.from(new Set([...set1].filter(x => set2.has(x))))
    }
    return null
  })

/**
 * 防抖函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Utils.debounce = (func, wait = 50) => debounce(func, wait)

/**
 * 节流函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Utils.throttle = (func, wait = 50) => throttle(func, wait)

/**
 * 返回 n 位的随机字符串
 * @param {Number} n
 */
Utils.getRandomStr = (n = 6) => {
  let str = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < n; i += 1) {
    str += chars.charAt(Math.floor(Math.random() * 62))
  }
  return str
}

/**
 * 获取uuid
 */
Utils.getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

// 将key-value转换成select中使用的数据label,value
Utils.obj2FilterArray = (obj, keyIsNumber = false) => {
  let arr = [
    {
      label: '请选择',
      value: ''
    }
  ]
  for (const key in obj) {
    const item = {
      label: obj[key],
      value: keyIsNumber ? parseInt(key) : key
    }
    arr.push(item)
  }
  return arr
}

// 将list转换成关联对象
Utils.list2Assoc = (list, keyId, keyValue) => {
  let assoc = {}
  for (const key in list) {
    const item = list[key]
    assoc[item[keyId]] = item[keyValue]
  }
  return assoc
}

/*
 * 功能：将数组转换成select中需要的数据label,value
 * dataArr: 传入的数组；
 * name: item[name],此处的name
 * value: item[value],此处的value
 * newArr: 返回的新数组
 */
Utils.filterArraySelect = (
  dataArr = [],
  newName = 'name',
  value = 'value',
  level = 'level'
) => {
  let newArr = []
  if (dataArr.length > 0) {
    dataArr.forEach((item, index) => {
      newArr.push({
        label: item[newName],
        value: item[value],
        level: item[level]
      })
    })
  }
  newArr.unshift({ label: '请选择', value: '' })
  return newArr
}

/**
 * 数组转成用某个符号连接字符串
 * data{Array}
 * symbol{String}
 */
Utils.transformArrToStr = (data, symbol = '') => {
  return data.join(symbol) || ''
}

/**
 * 字符串用某个符号转成数组
 * data{String}
 * symbol{String}
 */
Utils.transformArrToStr = (data, symbol = '') => {
  return data.split(symbol) || []
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
Utils.treeDataTranslate = (data, id = 'id', pid = 'parentId') => {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 返回对象的类型
 * @param {Object} obj
 */
Utils.getTypeOf = obj => {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Symbol]': 'symbol'
  }
  return map[toString.call(obj)]
}

function insertItem(item, arr) {
  const { order } = item
  if (typeof arr[order] !== 'number') {
    arr[order] = item
    return
  }
  let moveBegin
  let moveEnd
  let pos
  let i = order + 1

  while (arr[i]) {
    if (arr[i].order > order) {
      if (!moveBegin) {
        moveBegin = i
        pos = i
      }
    }
    i += 1
  }

  if (moveBegin) {
    moveEnd = i
  } else {
    pos = i
  }

  if (!moveEnd) {
    arr[pos] = item
    return
  }

  // 需要移动
  for (let i = moveEnd; i >= moveBegin; i -= 1) {
    arr[i + 1] = arr[i]
  }
  arr[pos] = item
}

/**
 * 根据数组的 order 字段排序
 * @param {Array} source
 */
Utils.sortByOrder = (source = []) => {
  if (!Array.isArray(source)) {
    console.error('sortByOrder 传入参数不符合要求, 应为数组', source)
    return source
  }
  const tmp = []
  let target = []

  // 将带排序的子项添加进临时数组 tmp
  for (let i = 0; i < source.length; i += 1) {
    if (typeof source[i].order !== 'number') {
      continue
    }
    let { order } = source[i]
    // 支持设置倒数顺序
    if (order < 0) {
      order = source.length + order
      if (order < 0) {
        order = 0
      }
    }

    // 确保整数
    source[i].order = Math.floor(order)

    // 插入临时数组
    insertItem(source[i], tmp)
  }

  // 合并临时数组和原数组
  for (let i = 0, j = 0; i < source.length; i += 1) {
    if (typeof source[i].order === 'number') {
      continue
    }
    // 找需要填的坑
    while (tmp[j]) {
      j += 1
    }
    tmp[j] = source[i]
  }
  // 筛除空隙
  target = tmp.filter(item => !!item)
  return target
}

/**
 * 深度遍历，深拷贝
 * @param {*} data
 */
Utils.deepClone = data => cloneDeep(data)

/**
 * 判断权限
 */
Utils.hasPermission = (auths, route, user) => {
  // eslint-disable-line
  if (user && user.isSuper) {
    return true
  }
  if (route.right) {
    return auths.some(auth => route.right.indexOf(auth) > -1)
  }
  return true
}
/**
 *  下划线转换驼峰
 */

Utils.lineToHump = name => {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
/**
 *  驼峰转换下划线
 */

Utils.humpToLine = name => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

let cached
/**
 * 获取窗口滚动条大小, From: https://github.com/react-component/util/blob/master/src/getScrollBarSize.js
 * @param {boolean} fresh 强制重新计算
 * @returns {number}
 */
export function getScrollBarSize(fresh) {
  if (fresh || cached === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = 0
    outerStyle.left = 0
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)

    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth
    }

    document.body.removeChild(outer)

    cached = widthContained - widthScroll
  }
  return cached
}

/**
 *根据最后一级的id获取父级树id
 */
Utils.getLastIdToTreeIdArr = (data = [], id, parentName = 'parentId') => {
  if (data.length === 0 || !id) {
    return
  }
  let newData = []
  const treeFunc = id => {
    const item = data.find(item => item.id == id)
    if (item) {
      newData.push(item.id)
      item[parentName] && treeFunc(item[parentName])
    }
    return newData
  }
  newData = treeFunc(id)
  return newData.reverse()
}
export default Utils
