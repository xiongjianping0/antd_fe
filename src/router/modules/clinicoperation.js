/**
 * 诊所运营管理
 */

import Layout from '@/layout'
const Clinicoperation = {
  path: '/clinic-operation',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'clinic-operation',
  redirect: '/clinic-operation/clinicmanage/List',
  meta: {
    title: '诊所运营管理',
    icon: 'organization'
  },
  children: [
    /* 诊所管理 start */
    {
      path: 'clinicmanage/List',
      name: 'clinicmanage-list',
      component: () => import('@/views/clinic-operation/clinicmanage/List'),
      meta: {
        title: '诊所管理',
        privilegeId: -1
      }
    },
    {
      path: 'clinicmanage/add',
      name: 'clinicmanage-add',
      component: () => import('@/views/clinic-operation/clinicmanage/Form'),
      meta: {
        title: '新增诊所',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'clinicmanage/edit/:id',
      name: 'clinicmanage-edit',
      component: () => import('@/views/clinic-operation/clinicmanage/Form'),
      meta: {
        title: '编辑诊所',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'clinicmanage/ListDevice/:id',
      name: 'clinicmanage-ListDevice',
      component: () => import('@/views/clinic-operation/clinicmanage/ListDevice'),
      meta: {
        title: '设备管理',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'clinicmanage/privilege/:id/:name',
      name: 'clinicmanage-privilege',
      component: () =>
        import('@/views/clinic-operation/clinicmanage/privilege'),
      meta: {
        title: '诊所权限',
        privilegeId: -1
      },
      hidden: true
    },
    /* 诊所管理 end */
    /* 药品分类管理 start */
    {
      path: 'drugclassification/List',
      name: 'drugclassification-list',
      component: () =>
        import('@/views/clinic-operation/drugclassification/List'),
      meta: {
        title: '药品分类管理',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'drugclassification/add',
      name: 'drugclassification-add',
      component: () =>
        import('@/views/clinic-operation/drugclassification/Form'),
      meta: {
        title: '创建药品分类',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'drugclassification/edit/:id',
      name: 'drugclassification-edit',
      component: () =>
        import('@/views/clinic-operation/drugclassification/Form'),
      meta: {
        title: '编辑药品分类',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'drugclassification/subcategory/:name',
      name: 'drugclassification-subcategory',
      component: () =>
        import('@/views/clinic-operation/drugclassification/child'),
      meta: {
        title: '创建药品子分类',
        privilegeId: -1
      },
      hidden: true
    },
    /* 药品分类管理 end */
    /* 服务项目管理 start */
    {
      path: 'service-items/List',
      name: 'serviceitems-list',
      component: () => import('@/views/clinic-operation/service-items/List'),
      meta: {
        title: '服务项目管理',
        privilegeId: -1
      }
    },
    {
      path: 'service-items/add',
      name: 'serviceitems-add',
      component: () => import('@/views/clinic-operation/service-items/Form'),
      meta: {
        title: '创建服务项目',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'service-items/edit/:id',
      name: 'serviceitems-edit',
      component: () => import('@/views/clinic-operation/service-items/Form'),
      meta: {
        title: '编辑服务项目',
        privilegeId: -1
      },
      hidden: true
    }
    /* 服务项目管理 end */
  ]
}

export default Clinicoperation
