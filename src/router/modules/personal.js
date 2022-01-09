/**
 * 个人中心
 */

import Layout from '@/layout'
const personal = {
  path: '/user',
  component: Layout,
  hidden: true,
  children: [{
    path: 'personal',
    name: 'Personal',
    component: () => import('@/views/personal/index'),
    meta: {
      title: '个人中心',
      privilegeId: -1
    }
  }]
}

export default personal
