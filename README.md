# vue-base-project

- 环境介绍
- <a href="#环境目录">环境目录</a>
- <a href="#本地运行">本地运行</a>
- <a href="#手动装特殊包">手动装特殊包</a>
- <a href="#打包发布">打包发布</a>
- <a href="#commonInfo">关于 commonInfo 接口</a>
- <a href="#建议">建议</a>
- <a href="#浏览器支持">浏览器支持</a>

#### <a id="环境目录">环境项目</a>

```shell
├───public // 公共资源目录，该目录webpack原封打包
│    ├───favicon.ico // 本站favicon图片
│    │   index.html // template模板
├───src
│    ├───api // 所有请求模型层
│    │   ├───audit // 系统的每个模块单独设置一个文件夹
│    ├───assets // 静态资源文件存放目录
│    ├───components // 布局组件及业务基础组件
│    │   ├───BackToTop // 返回顶部组件
│    │   ├───Base // 通用基础组件库（包含element-ui二次封装组件）
│    │   ├───Breadcrumb // 面包屑路由组件
│    │   ├───Hamburger //  自适应收缩侧边栏组件
│    │   ├───Notify //  消息提醒组件
│    │   ├───Pcz //  省市区下拉框组件
│    │   ├───Screenfull //  全屏组件
│    │   ├───Scroll //  无缝滚动组件
│    │   ├───SvgIcon //  SvgIcon组件
│    │   ├───Upload //  上传组件
│    │   ├───..... //  XXX扩展组件
│    ├───directives // directives指令
│    ├───filters // filters过滤器
│    ├───icons // 项目所有 svg icons
│    ├───layout // layout布局组件
│    ├───router // 前端路由
│    │   ├───modules // 每个业务模型的路由树
│    │   ├   index.js // vue-router入口文件
│    ├───store // vuex状态管理文件
│    ├───styles // 全局样式管理文件(文件下的variables.scss是系统颜色配置文件)
│    ├───utils // 各种工具函数
│    ├───views // 业务组件
│    │   ├───audit // 用户、角色、权限模块组件，一个模块对应一个文件夹(与api中的模块对应)，格式/命名参考此文件
│    │   ├───menu // 配置系统菜单 路由：/menu/list, 创建菜单参考audit模块
│    │   App.vue // vue根组件
│    │   permission.js // 权限管理(路由拦截)
│    │   main.js // 入口文件 加载组件 初始化等
│    │   setting.js // 初始化全局设置(系统标题等具体配置)
│    └── setUrl.js // 全局图片设置(系统logo)
├───tests // 测试
│    └── copy.vue // 页面基本框架
│   babel.config.js // babel配置文件
│   .browserslistrc // 适配浏览器版本
│   .eslintrc.js // eslint配置文件
│   .gitignore // git上传忽略文件
│   .babelrc  // babel-loader 配置
│   .travis.yml  // 自动化CI配置
│   vue.config.js // vue-cli 配置
│   postcss.config.js// postcss 配置
└── package.json // package.json
```

#### 命名规范,具体参考如下链接、

https://cn.vuejs.org/v2/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-B-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90-%E5%A2%9E%E5%BC%BA%E5%8F%AF%E8%AF%BB%E6%80%A7

# 全局组件——规范 [路径：components/...]

- [components]

  - [Breadcrumb]
    - index.vue
  - [Hamburger]
    - index.vue
  - [SvgIcon]

# view 视图——规范 [路径：view/...]

1、文件夹使用 kebab-case 风格
2、文件夹内的文件，index.vue 之外，其他.vue 文件统一用 PascalBase 风格

- [view]
  - [personal]
    - [components]
      -Infomation.vue
    - index.vue
  - [error-page]
    - index.vue

# import 组件——规范

1、命名使用 PascalBase。如下

<script>
import CommonTable from '@/components/Base/Table'
</script>

2、template 标签中使用引入的组件，使用 kebab-case。
向组件传 prop ，使用 kebab-case。如下
<template>
<common-table :table-data="tableData" :total="total"></common-table>
</template>

# import 其他文件——规范

导入使用 pascalBase 小驼峰

  <script>
  import getPageTitle from '@/utils/get-page-title'
  </script>

#### <a id="#本地运行">Build Setup</a>

```bash
# install dependency
npm install

# develop
npm run dev
```

#### <a id="#手动装特殊包">Build Setup</a>

````bash


This will automatically open http://localhost:8080

#### <a id="#打包发布">Build</a>

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
````

#### <a id="#打包发布">关于 commonInfo 接口</a>

```bash
//TODO 此处有好建议可更换
# 装包
npm install --save vuex-persist
# 引入：
import VuexPersistence from 'vuex-persist'
# 先创建一个对象并进行配置：
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ // eslint-disable-line
    commonInfo: state.app.commonInfo,
  }),
})
# 引入进vuex插件：
const store = new Vuex.Store({
  modules: {
  	app,
  },
  getters,
  plugins: [vuexLocal.plugin],
})

# vuex [...action\getter\state\mutation 文件位置store/modules/app.js]
#页面使用
----js部分
import { mapGetters } from 'vuex'
export default {
	computed: {
    ...mapGetters([
      'commonInfo',
    ])
  },
}
----template部分 此处不上图文
  {{commonInfo['warnDeviceStatusMap'][1]}}
```

#### <a id="#浏览器支持">Browsers support</a>

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |
