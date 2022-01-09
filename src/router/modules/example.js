/**
 * 案例
 */

import Layout from '@/layout'
const example = {
  path: '/example',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'example',
  meta: {
    title: '案例',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'table',
      name: 'table',
      component: () => import('@/views/example/Table'),
      meta: {
        title: '表格',
        privilegeId: -1
      }
    },
    {
      path: 'compform',
      name: 'compform',
      component: () => import('@/views/example/CompForm'),
      meta: {
        title: '公用表单',
        privilegeId: -1
      }
    },
    {
      path: 'form',
      name: 'form',
      component: () => import('@/views/example/Form'),
      meta: {
        title: '自定义表单',
        privilegeId: -1
      }
    },
    {
      path: 'upload',
      name: 'upload',
      component: () => import('@/views/example/Upload'),
      meta: {
        title: '上传',
        privilegeId: -1
      }
    },
    {
      path: 'tinymce',
      name: 'tinymce',
      component: () => import('@/views/example/Tinymce'),
      meta: {
        title: '富文本',
        privilegeId: -1
      }
    },
    {
      path: 'canvas',
      name: 'canvas',
      component: () => import('@/views/example/Canvas'),
      meta: {
        title: 'canvas',
        privilegeId: -1
      }
    }
  ]
}

export default example
