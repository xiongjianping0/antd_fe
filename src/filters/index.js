/**
 * filters
 */

import Vue from 'vue'
import Utils from '@/utils/util'

const globalFilter = {

  /**
   * ellipsis
   * 'abcdefghijklm' => 'abcdefghi...'
   * @param {string} value
   * @param {number} len
   */
  filterTitle(value, len = 9) {
    return Utils.cutString(value, len)
  },

  /**
   * toUpperCase
   * 'abcde' => 'ABCDE'
   * @param {string} value
   */
  uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : ''
  },

  /**
   * toLowerCase
   * 'ABCDE' => 'abcde'
   * @param {string} value
   */
  lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : ''
  },

  /**
   * Number formatting
   * like 10000 => 10k
   * @param {number} num
   * @param {number} digits
   */
  numberFormatter(num, digits) {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      }
    }
    return num.toString()
  },

  /**
   * 10000 => "10,000"
   * @param {number} num
   */
  toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  },

  /**
   * Upper case first char
   * @param {String} string
   */
  uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

// set global filter
Object.keys(globalFilter).forEach(k => Vue.filter(k, globalFilter[k]))

export default globalFilter
