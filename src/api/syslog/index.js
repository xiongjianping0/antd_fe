/* system log */
import request from '@/utils/request'

// system log type
export function getSyslogType(data) {
  return request({
    url: '/syslog/operation',
    method: 'get',
    data
  })
}

// system log list
export function getSyslogList(data) {
  return request({
    url: '/syslog/list',
    method: 'get',
    data
  })
}

// login log list
export function getLoginlogList(data) {
  return request({
    url: '/loginlog/list',
    method: 'get',
    data
  })
}

// get operate user
export function getUserList(data) {
  return request({
    url: '/user/opeartionlist',
    method: 'get',
    data
  })
}
