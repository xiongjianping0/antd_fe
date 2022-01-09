/**
 * 用户管理
 */

import Layout from '@/layout'
const Audit = {
  path: '/audit',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'audit',
  redirect: '/audit/user/list',
  meta: {
    title: '用户管理',
    icon: 'role'
  },
  children: [
    /* 用户列表 start */
    {
      path: 'user/list',
      name: 'user-list',
      component: () => import('@/views/audit/user/UserList'),
      meta: {
        title: '用户列表',
        privilegeId: -1
      }
    },
    {
      path: 'user/add',
      name: 'user-add',
      component: () => import('@/views/audit/user/UserForm'),
      meta: {
        title: '新增用户',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'user/modify/:id',
      name: 'user-modify',
      component: () => import('@/views/audit/user/UserForm'),
      meta: {
        title: '编辑用户',
        privilegeId: -1
      },
      hidden: true
    },
    /* 用户列表 end */
    /* 角色列表 start */
    {
      path: 'role/list',
      name: 'role-list',
      component: () => import('@/views/audit/role/RoleList'),
      meta: {
        title: '角色列表',
        privilegeId: -1
      }
    },
    {
      path: 'role/add',
      name: 'role-add',
      component: () => import('@/views/audit/role/RoleForm'),
      meta: {
        title: '新增角色',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'role/modify/:id',
      name: 'role-modify',
      component: () => import('@/views/audit/role/RoleForm'),
      meta: {
        title: '编辑角色',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'role/privilege/:id/:name',
      name: 'role-privilege',
      component: () => import('@/views/audit/role/RolePrivilege'),
      meta: {
        title: '编辑权限',
        privilegeId: -1
      },
      hidden: true
    }
    /* 角色列表 end */
  ]
}

export default Audit
