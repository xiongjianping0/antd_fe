/**
 * 角色管理
 */

import Layout from '@/layout'
const Role = {
  path: '/roles',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'roles',
  redirect: '/roles/clinic/list',
  meta: {
    title: '平台角色管理',
    icon: 'audit-role'
  },
  children: [
    /* 诊所端角色列表 start */
    {
      path: 'clinic/list',
      name: 'clinic-list',
      component: () => import('@/views/roles/RoleList'),
      meta: {
        title: '诊所端角色列表',
        privilegeId: -1
      }
    },
    {
      path: 'clinic/add',
      name: 'clinic-add',
      component: () => import('@/views/roles/RoleForm'),
      meta: {
        title: '诊所端新增角色',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'clinic/modify/:id',
      name: 'clinic-modify',
      component: () => import('@/views/roles/RoleForm'),
      meta: {
        title: '诊所端编辑角色',
        privilegeId: -1
      },
      hidden: true
    },
    /* 诊所端角色列表 end */
    /* 商户端角色列表 start */
    {
      path: 'business/list',
      name: 'business-list',
      component: () => import('@/views/roles/RoleList'),
      meta: {
        title: '商户端角色列表',
        privilegeId: -1
      }
    },
    {
      path: 'business/add',
      name: 'business-add',
      component: () => import('@/views/roles/RoleForm'),
      meta: {
        title: '商户端新增角色',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'business/modify/:id',
      name: 'business-modify',
      component: () => import('@/views/roles/RoleForm'),
      meta: {
        title: '商户端编辑角色',
        privilegeId: -1
      },
      hidden: true
    }
    /* 商户端角色列表 end */
  ]
}

export default Role
