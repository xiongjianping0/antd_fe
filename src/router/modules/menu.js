/**
 * 菜单管理
 */

import Layout from '@/layout'
const menu = {
  path: '/menu',
  component: Layout,
  redirect: '/menu/list',
  name: 'Dust',
  hidden: true,
  // alwaysShow: true,
  meta: {
    title: '平台菜单管理',
    icon: 'index-icon'
  },
  children: [
    {
      path: 'audit/list',
      name: 'audit-menu-list',
      component: () => import('@/views/menu/MenuList.vue'),
      meta: {
        title: '运营端菜单列表',
        privilegeId: -1,
        menuType: 1
      }
    },
    {
      path: 'clinic/list',
      name: 'clinic-menu-list',
      component: () => import('@/views/menu/MenuList.vue'),
      meta: {
        title: '诊所端菜单列表',
        privilegeId: -1,
        menuType: 2
      }
    },
    {
      path: 'merchant/list',
      name: 'merchant-menu-list',
      component: () => import('@/views/menu/MenuList.vue'),
      meta: {
        title: '商户端菜单列表',
        privilegeId: -1,
        menuType: 3
      }
    }
  ]
}
export default menu
