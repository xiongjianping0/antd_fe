/**
 * 用户管理
 */

import Layout from '@/layout'
const Hospital = {
    path: '/cuser',
    component: Layout,
    alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
    name: 'cuser',
    redirect: '/cuser/list',
    meta: {
        title: '客户管理',
        icon: 'staff-icon'
    },
    children: [
        /* 用户管理 start */
        {
            path: 'cuser/list',
            name: 'cuser-list',
            component: () => import('@/views/cuser/List'),
            meta: {
                title: '客户列表',
                privilegeId: -1
            }
        },
        {
            path: 'cuser/detail/:id',
            name: 'cuser-detail',
            component: () => import('@/views/cuser/Detail'),
            meta: {
                title: '客户详情',
                privilegeId: -1
            },
            hidden: true
        },
        {
            path: 'cuserfans/list',
            name: 'cuserfans-list',
            component: () => import('@/views/cuser/FansList'),
            meta: {
                title: '客户粉丝列表',
                privilegeId: -1
            },
            hidden: true
        },
        /* 用户管理 end */
        //分销管理start
        {
            path: 'cuser/distribution/list',
            name: 'distribution-list',
            component: () => import('@/views/cuser/distribution/List'),
            meta: {
                title: '分销列表',
                privilegeId: -1
            },

        },
        //分销管理end
    ]
}

export default Hospital
