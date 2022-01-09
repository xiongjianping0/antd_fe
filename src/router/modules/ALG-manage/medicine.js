/**
 * 中药管理
 */

import Layout from '@/layout'
const ALGMedManage = {
  path: '/ALGManage',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'ALGManage',
  redirect: '/ALGManage/medicine/list',
  meta: {
    title: '算法管理',
    icon: 'data'
  },
  children: [
    /* 中药管理 start */
    {
      path: 'medicine/list',
      name: 'medicine-list',
      component: () => import('@/views/ALG-manage/medicine/MedicineList'),
      meta: {
        title: '药材列表',
        privilegeId: -1
      }
    },
    {
      path: 'medicine/add',
      name: 'medicine-add',
      component: () => import('@/views/ALG-manage/medicine/MedicineForm'),
      meta: {
        title: '新增药材',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'medicine/edit/:id',
      name: 'medicine-edit',
      component: () => import('@/views/ALG-manage/medicine/MedicineForm'),
      meta: {
        title: '修改药材',
        privilegeId: -1
      },
      hidden: true
    },
    /* 中药管理 end */
    /* 方剂管理 start */
    {
      path: 'prescription/list',
      name: 'prescription-list',
      component: () =>
        import('@/views/ALG-manage/Prescription/PrescriptionList'),
      meta: {
        title: '方剂列表',
        privilegeId: -1
      }
    },
    {
      path: 'prescription/add',
      name: 'prescription-add',
      component: () =>
        import('@/views/ALG-manage/Prescription/PrescriptionForm'),
      meta: {
        title: '新增方剂',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'prescription/edit/:id',
      name: 'prescription-edit',
      component: () =>
        import('@/views/ALG-manage/Prescription/PrescriptionForm'),
      meta: {
        title: '修改方剂',
        privilegeId: -1
      },
      hidden: true
    },
    /* 方剂管理 end */
    /* 成药管理 start */
    {
      path: 'officinal/list',
      name: 'officinal-list',
      component: () => import('@/views/ALG-manage/officinal/officinalList'),
      meta: {
        title: '成药列表',
        privilegeId: -1
      }
    },
    {
      path: 'officinal/add',
      name: 'officinal-add',
      component: () => import('@/views/ALG-manage/officinal/officinalForm'),
      meta: {
        title: '新增成药',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'officinal/edit/:id',
      name: 'officinal-edit',
      component: () => import('@/views/ALG-manage/officinal/officinalForm'),
      meta: {
        title: '修改成药',
        privilegeId: -1
      },
      hidden: true
    },
    /* 成药管理 end */
    /* 配伍禁忌 start */
    {
      path: 'Incompatibility/list',
      name: 'Incompatibility-list',
      component: () =>
        import('@/views/ALG-manage/Incompatibility/IncompatibList'),
      meta: {
        title: '配伍禁忌',
        privilegeId: -1
      }
    },
    {
      path: 'Incompatibility/add',
      name: 'Incompatibility-add',
      component: () =>
        import('@/views/ALG-manage/Incompatibility/IncompatibForm'),
      meta: {
        title: '新增配伍',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Incompatibility/edit/:id',
      name: 'Incompatibility-edit',
      component: () =>
        import('@/views/ALG-manage/Incompatibility/IncompatibForm'),
      meta: {
        title: '修改配伍',
        privilegeId: -1
      },
      hidden: true
    }
    /* 配伍禁忌 end */
  ]
}

export default ALGMedManage
