/**
 * 系统管理
 */

import Layout from '@/layout'
const System = {
  path: '/system',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'system',
  redirect: '/system/datadict/list',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [
    /* 资讯管理 start */
    {
      path: 'client-product/news',
      name: 'client-product',
      component: () => import('@/views/system/client-product/news'),
      meta: {
        title: '资讯管理',
        privilegeId: -1
      },
    },
    {
      path: 'client-product/add',
      name: 'client-product-add',
      component: () => import('@/views/system/client-product/Form'),
      meta: {
        title: '新增资讯',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'client-product/edit/:id',
      name: 'client-product-edit',
      component: () => import('@/views/system/client-product/Form'),
      meta: {
        title: '编辑资讯',
        privilegeId: -1
      },
      hidden: true
    },
    /* 资讯管理 */
    /*轮播图管理 start */
    {
      path: 'carousel/List',
      name: 'carousel-List',
      component: () => import('@/views/system/carousel/List'),
      meta: {
        title: '轮播图管理',
        privilegeId: -1
      },
    },
    {
      path: 'carousel/add',
      name: 'carousel-add',
      component: () => import('@/views/system/carousel/Form'),
      meta: {
        title: '新增轮播图',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'carousel/edit/:id',
      name: 'carousel-edit',
      component: () => import('@/views/system/carousel/Form'),
      meta: {
        title: '编辑轮播图',
        privilegeId: -1
      },
      hidden: true
    },
    /* 轮播图管理 */
    /*内容推荐管理 start */
    {
      path: 'recommend/List',
      name: 'recommend-List',
      component: () => import('@/views/system/recommend/List'),
      meta: {
        title: '内容推荐管理',
        privilegeId: -1
      },
    },
    {
      path: 'recommend/add',
      name: 'recommend-add',
      component: () => import('@/views/system/recommend/Form'),
      meta: {
        title: '新增推荐内容',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'recommend/edit/:id',
      name: 'recommend-edit',
      component: () => import('@/views/system/recommend/Form'),
      meta: {
        title: '编辑推荐内容',
        privilegeId: -1
      },
      hidden: true
    },
    /* 内容推荐管理 */
    /* 数据字典管理 start */
    {
      path: 'datadict/list',
      name: 'datadict-list',
      component: () => import('@/views/system/datadict/List'),
      meta: {
        title: '数据字典管理',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'datadict/add',
      name: 'datadict-add',
      component: () => import('@/views/system/datadict/Form'),
      meta: {
        title: '新增数据字典',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'datadict/edit/:id',
      name: 'datadict-edit',
      component: () => import('@/views/system/datadict/Form'),
      meta: {
        title: '编辑数据字典',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'config',
      name: 'config-form',
      component: () => import('@/views/system/config/Form'),
      meta: {
        title: '应用配置',
        privilegeId: -1
      }
    }
    /* 数据字典管理 end */
  ]
}

export default System
