/**
 * storage
 */

import storage from 'good-storage'

/* 操作table选中的数据 */
// 选中数据的key
const SELECT_TABLE_KEY = 'selectedTableData'
// 存储选中的数据
export function setSelectedTable(data) {
  storage.set(SELECT_TABLE_KEY, data)
}
// 获取选中的数据
export function getSelectedTable() {
  return storage.get(SELECT_TABLE_KEY)
}
// 清除选中的数据
export function cleanSelectedTable() {
  storage.remove(SELECT_TABLE_KEY)
}
