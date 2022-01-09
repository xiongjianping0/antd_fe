/**
 * 首页路由
 */

import Layout from '@/layout'
const Dashboard = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/personal/index'),
    meta: {
      title: '首页',
      icon: 'index-icon',
      privilegeId: -1
    }
  }]
}

export default Dashboard
