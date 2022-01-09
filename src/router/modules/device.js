/**
 * 设备管理
 */

import Layout from '@/layout'
const Device = {
  path: '/device',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'device',
  redirect: '/device/finishedproduct/List',
  meta: {
    title: '设备管理',
    icon: 'depart'
  },
  children: [
    /* 成品管理 start */
    {
      path: 'finishedproduct/List',
      name: 'finishedproduct-list',
      component: () => import('@/views/device/finishedproduct/List'),
      meta: {
        title: '成品管理',
        privilegeId: -1
      }
    },
    {
      path: 'finishedproduct/View/:id',
      name: 'finishedproduct-View',
      component: () => import('@/views/device/finishedproduct/View'),
      meta: {
        title: '查看',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'finishedproduct/Usage-record/:id',
      name: 'finishedproduct-Usage-record',
      component: () => import('@/views/device/finishedproduct/Usage-record'),
      meta: {
        title: '使用记录',
        privilegeId: -1
      },
      hidden: true
    },
    /* 成品管理 end */
    /* 原材料管理 start */
    {
      path: 'rawmaterials/List',
      name: 'rawmaterials-list',
      component: () => import('@/views/device/rawmaterials/List'),
      meta: {
        title: '原材料管理',
        privilegeId: -1
      }
    },
    {
      path: 'rawmaterials/View/:inboundNum/:partName',
      name: 'rawmaterials-view',
      component: () => import('@/views/device/rawmaterials/View'),
      meta: {
        title: '查看',
        privilegeId: -1
      },
      hidden: true
    },
    /* 原材料管理 end */
    /* 出入库单管理 start */
    {
      path: 'warehousereceipt/List',
      name: 'warehousereceipt-list',
      component: () => import('@/views/device/warehousereceipt/List'),
      meta: {
        title: '出入库单管理',
        privilegeId: -1
      }
    },
    {
      path: 'warehousereceipt/View/:inboundNum/:managementType',
      name: 'warehousereceipt-View',
      component: () => import('@/views/device/warehousereceipt/View'),
      meta: {
        title: '查看',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'warehousereceipt/addraw',
      name: 'warehousereceipt-addraw',
      component: () => import('@/views/device/warehousereceipt/InStorage'),
      meta: {
        title: '原材料入库',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'warehousereceipt/outsour',
      name: 'warehousereceipt-outsour',
      component: () => import('@/views/device/warehousereceipt/outsour'),
      meta: {
        title: '外协成品入库',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'warehousereceipt/OutWarehouses',
      name: 'warehousereceipt-OutWarehouses',
      component: () => import('@/views/device/warehousereceipt/OutWarehouses'),
      meta: {
        title: '自产成品入库',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'warehousereceipt/SellFinis',
      name: 'warehousereceipt-SellFinis',
      component: () => import('@/views/device/warehousereceipt/SellFinis'),
      meta: {
        title: '成品出库',
        privilegeId: -1
      },
      hidden: true
    }
    /* 出入库单管理 end */
  ]
}

export default Device