import Layout from '@/layout'
const ALGConManage = {
  path: '/ALGConManage',
  component: Layout,
  alwaysShow: 1, // 只有一个子菜单的时候，父级菜单也显示，否则只显示子菜单，不显示父菜单
  name: 'ALGConManage',
  redirect: '/ALGConManage/exercise/list',
  meta: {
    title: '内容管理',
    icon: 'data'
  },
  children: [
    /* 运动管理 start */
    {
      path: 'exercise/list',
      name: 'exercise-list',
      component: () => import('@/views/ALG-manage/exercise/exerciseList'),
      meta: {
        title: '运动列表',
        privilegeId: -1
      }
    },
    {
      path: 'exercise/add',
      name: 'exercise-add',
      component: () => import('@/views/ALG-manage/exercise/exerciseForm'),
      meta: {
        title: '新增运动',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'exercise/edit/:id',
      name: 'exercise-edit',
      component: () => import('@/views/ALG-manage/exercise/exerciseForm'),
      meta: {
        title: '修改运动',
        privilegeId: -1
      },
      hidden: true
    },
    /* 运动管理 end */

    /* 起居管理 start */
    {
      path: 'Living/list',
      name: 'Living-list',
      component: () => import('@/views/ALG-manage/Living/LivingList'),
      meta: {
        title: '起居列表',
        privilegeId: -1
      }
    },
    {
      path: 'Living/add',
      name: 'Living-add',
      component: () => import('@/views/ALG-manage/Living/LivingForm'),
      meta: {
        title: '新增起居',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Living/edit/:id',
      name: 'Living-edit',
      component: () => import('@/views/ALG-manage/Living/LivingForm'),
      meta: {
        title: '修改起居',
        privilegeId: -1
      },
      hidden: true
    },
    /* 起居管理 end */

    /* 文娱管理 start */
    {
      path: 'entertainment/list',
      name: 'entertainment-list',
      component: () => import('@/views/ALG-manage/Entertainment/entertainList'),
      meta: {
        title: '文娱列表',
        privilegeId: -1
      }
    },
    {
      path: 'entertainment/add',
      name: 'entertainment-add',
      component: () => import('@/views/ALG-manage/Entertainment/entertainForm'),
      meta: {
        title: '新增文娱',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'entertainment/edit/:id',
      name: 'entertainment-edit',
      component: () => import('@/views/ALG-manage/Entertainment/entertainForm'),
      meta: {
        title: '修改文娱',
        privilegeId: -1
      },
      hidden: true
    },
    /* 心理管理 end */
    {
      path: 'Psychology/list',
      name: 'Psychology-list',
      component: () => import('@/views/ALG-manage/Psychology/PsychologyList'),
      meta: {
        title: '心理列表',
        privilegeId: -1
      }
    },
    {
      path: 'Psychology/add',
      name: 'Psychology-add',
      component: () => import('@/views/ALG-manage/Psychology/PsychologyForm'),
      meta: {
        title: '新增心理',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Psychology/edit/:id',
      name: 'Psychology-edit',
      component: () => import('@/views/ALG-manage/Psychology/PsychologyForm'),
      meta: {
        title: '修改心理',
        privilegeId: -1
      },
      hidden: true
    },
    /* 心理管理 end */
    /* 中医保健管理 start */
    {
      path: 'Healthcare/list',
      name: 'Healthcare-list',
      component: () => import('@/views/ALG-manage/Healthcare/HealthcareList'),
      meta: {
        title: '中医保健列表',
        privilegeId: -1
      }
    },
    {
      path: 'Healthcare/add',
      name: 'Healthcare-add',
      component: () => import('@/views/ALG-manage/Healthcare/HealthcareForm'),
      meta: {
        title: '新增中医保健',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Healthcare/edit/:id',
      name: 'Healthcare-edit',
      component: () => import('@/views/ALG-manage/Healthcare/HealthcareForm'),
      meta: {
        title: '修改中医保健',
        privilegeId: -1
      },
      hidden: true
    },
    /* 中医保健管理 end */
    /* 穴位管理 start */
    {
      path: 'Acupoint/list',
      name: 'Acupoint-list',
      component: () => import('@/views/ALG-manage/Acupoint/AcupointList'),
      meta: {
        title: '穴位列表',
        privilegeId: -1
      }
    },
    {
      path: 'Acupoint/add',
      name: 'Acupoint-add',
      component: () => import('@/views/ALG-manage/Acupoint/AcupointForm'),
      meta: {
        title: '新增穴位',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Acupoint/edit/:id',
      name: 'Acupoint-edit',
      component: () => import('@/views/ALG-manage/Acupoint/AcupointForm'),
      meta: {
        title: '修改穴位',
        privilegeId: -1
      },
      hidden: true
    },
    /* 穴位管理 end */

    /* 中医方案管理 start */
    {
      path: 'Traditional/list',
      name: 'Traditional-list',
      component: () => import('@/views/ALG-manage/Traditional/TraditionalList'),
      meta: {
        title: '中医方案列表',
        privilegeId: -1
      }
    },
    {
      path: 'Traditional/add',
      name: 'Traditional-add',
      component: () => import('@/views/ALG-manage/Traditional/TraditionalForm'),
      meta: {
        title: '新增中医方案',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Traditional/edit/:id',
      name: 'Traditional-edit',
      component: () => import('@/views/ALG-manage/Traditional/TraditionalForm'),
      meta: {
        title: '修改中医方案',
        privilegeId: -1
      },
      hidden: true
    },
    /* 中医方案管理 end */
    /* 饮食方案管理 start */
    {
      path: 'Diet/list',
      name: 'Diet-list',
      component: () => import('@/views/ALG-manage/Diet/DietList'),
      meta: {
        title: '饮食方案列表',
        privilegeId: -1
      }
    },
    {
      path: 'Diet/add',
      name: 'Diet-add',
      component: () => import('@/views/ALG-manage/Diet/DietForm'),
      meta: {
        title: '新增饮食方案',
        privilegeId: -1
      },
      hidden: true
    },
    {
      path: 'Diet/edit/:id',
      name: 'Diet-edit',
      component: () => import('@/views/ALG-manage/Diet/DietForm'),
      meta: {
        title: '修改饮食方案',
        privilegeId: -1
      },
      hidden: true
    }
    /* 饮食方案管理 end */
  ]
}

export default ALGConManage
