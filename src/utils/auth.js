/**
 * 操作令牌
 */

const UTokenKey = 'vue_audit_token'

export function getUToken() {
  return localStorage.getItem(UTokenKey) || ''
}

export function setUToken(token) {
  return localStorage.setItem(UTokenKey, token)
}

export function removeUToken() {
  return localStorage.removeItem(UTokenKey)
}
