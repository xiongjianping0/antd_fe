/**
 * 电商管理
 */

import Layout from '@/layout'
const EBManage = {
  path: '/EBManage',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'EBManage',
  redirect: '/EBManage/business/list',
  meta: {
    title: '电商管理',
    icon: 'organization'
  },
  children: [
    /* 商户管理 start */
    {
      path: 'business/list',
      name: 'business-list',
      component: () => import('@/views/EB-manage/business/List'),
      meta: {
        title: '商户管理',
        privilegeId: -1
      }
    },
    {
      path: 'business/add',
      name: 'business-add',
      component: () => import('@/views/EB-manage/business/Form'),
      meta: {
        title: '新增商户',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'business/edit/:id',
      name: 'business-edit',
      component: () => import('@/views/EB-manage/business/Form'),
      meta: {
        title: '编辑商户',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'business/privilege/:id/:name',
      name: 'business-privilege',
      component: () =>
        import('@/views/EB-manage/business/privilege'),
      meta: {
        title: '诊所权限',
        privilegeId: -1
      },
      hidden: true
    },
    /* 商户管理 end */
    /* 分类管理 start */
    {
      path: 'classify/list',
      name: 'classify-list',
      component: () => import('@/views/EB-manage/classify/List'),
      meta: {
        title: '分类管理',
        privilegeId: -1
      }
    },
    {
      path: 'classify/add',
      name: 'classify-add',
      component: () => import('@/views/EB-manage/classify/Form'),
      meta: {
        title: '新增分类',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'classify/edit/:id',
      name: 'classify-edit',
      component: () => import('@/views/EB-manage/classify/Form'),
      meta: {
        title: '编辑分类',
        privilegeId: -1
      },
      hidden: true
    },
    /* 分类管理 end */
    /* 订单管理 start */
    {
      path: 'order/list',
      name: 'order-list',
      component: () => import('@/views/EB-manage/order/List'),
      meta: {
        title: '订单管理',
        privilegeId: -1
      }
    },
    {
      path: 'order/detail/:id',
      name: 'order-detail',
      component: () => import('@/views/EB-manage/order/Detail'),
      meta: {
        title: '订单详情',
        privilegeId: -1
      },
      hidden: true
    },
    /* 订单管理 end */
    /* 商品规格设置 start */
    {
      path: 'spec/list',
      name: 'spec-list',
      component: () => import('@/views/EB-manage/spec/List'),
      meta: {
        title: '商品规格设置',
        privilegeId: -1
      }
    },
    {
      path: 'spec/add',
      name: 'spec-add',
      component: () => import('@/views/EB-manage/spec/Form'),
      meta: {
        title: '商品规格新增',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'spec/edit/:id',
      name: 'spec-edit',
      component: () => import('@/views/EB-manage/spec/Form'),
      meta: {
        title: '商品规格编辑',
        privilegeId: -1
      },
      hidden: true
    },
    /* 商品规格设置 end */
    /* 商品规格值设置 start */
    {
      path: 'specvalue/list',
      name: 'specvalue-list',
      component: () => import('@/views/EB-manage/spec-value/List'),
      meta: {
        title: '商品规格值设置',
        privilegeId: -1
      }
    },
    {
      path: 'specvalue/add',
      name: 'specvalue-add',
      component: () => import('@/views/EB-manage/spec-value/Form'),
      meta: {
        title: '商品规格值新增',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'specvalue/edit/:id',
      name: 'specvalue-edit',
      component: () => import('@/views/EB-manage/spec-value/Form'),
      meta: {
        title: '商品规格值编辑',
        privilegeId: -1
      },
      hidden: true
    },
    /* 商品规格值设置 end */
    /* 商品管理 start */
    {
      path: 'goods/list',
      name: 'goods-list',
      component: () => import('@/views/EB-manage/goods/List'),
      meta: {
        title: '商品管理',
        privilegeId: -1
      }
    },
    {
      path: 'goods/detail/:id',
      name: 'goods-detail',
      component: () => import('@/views/EB-manage/goods/Detail'),
      meta: {
        title: '商品详情',
        privilegeId: -1
      },
      hidden: true
    },
    /* 商品管理 end */
    /* 主题管理 start */
    {
      path: 'theme/list',
      name: 'theme-list',
      component: () => import('@/views/EB-manage/theme/List'),
      meta: {
        title: '主题管理',
        privilegeId: -1
      }
    },
    {
      path: 'theme/add',
      name: 'theme-list',
      component: () => import('@/views/EB-manage/theme/Form'),
      meta: {
        title: '主题管理',
        privilegeId: -1
      },
      hidden: true
    },
    {      
      path: 'theme/detail/:id',
      name: 'theme-list',
      component: () => import('@/views/EB-manage/theme/Form'),
      meta: {
        title: '主题详情',
        privilegeId: -1
      },
      hidden: true
    },
    /* 主题管理 end */
      {
          path: 'grouppurchase/list',
          name: 'grouppurchase-list',
          component: () => import('@/views/EB-manage/grouppurchase/List'),
          meta: {
              title: '分销列表',
              privilegeId: -1
          }
      },
      {
          path: 'grouppurchase/detail/:id',
          name: 'grouppurchase-detail',
          component: () => import('@/views/EB-manage/grouppurchase/Detail'),
          meta: {
              title: '分销详情',
              privilegeId: -1
          },
          hidden: true
      },
    
  ]
}

export default EBManage
