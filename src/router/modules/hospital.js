/**
 * 电商管理
 */

import Layout from '@/layout'
const Hospital = {
  path: '/hospital',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'hospital',
  redirect: '/hospital/appoint/list',
  meta: {
    title: '互联网管理',
    icon: 'organization'
  },
  children: [
    /* 预约管理 start */
    {
      path: 'appoint/list',
      name: 'appoint-list',
      component: () => import('@/views/hospital/appoint/List'),
      meta: {
        title: '预约管理',
        privilegeId: -1
      }
    },
    {
      path: 'appoint/add',
      name: 'appoint-add',
      component: () => import('@/views/hospital/appoint/Form'),
      meta: {
        title: '新增预约',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'appoint/edit/:id',
      name: 'appoint-edit',
      component: () => import('@/views/hospital/appoint/Form'),
      meta: {
        title: '编辑预约',
        privilegeId: -1
      },
      hidden: true
    },
    /* 预约管理 end */
    /* 预约审核管理 start */
    {
      path: 'appointcheck/list',
      name: 'appointcheck-list',
      component: () => import('@/views/hospital/appointcheck/List'),
      meta: {
        title: '预约审核管理',
        privilegeId: -1
      }
    },
    {
      path: 'appointcheck/detail',
      name: 'appointcheck-detail',
      component: () => import('@/views/hospital/appointcheck/Detail'),
      meta: {
        title: '新增预约审核',
        privilegeId: -1
      },
      hidden: true
    }
    /* 预约审核管理 end */
  ]
}

export default Hospital
