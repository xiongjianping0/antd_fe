## vue-base-project

# 介绍

> 此项目基于 `vue-cli` 进行构建。
> 本项目技术栈基于 ES2015 +，vue，vuex，vue-router，vue-cli，axios 和 element-ui。提前了解和学习这些知识积累使用本项目有很大的帮助。
> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

# 安装 node

所有命令皆在 cmd 命令行窗口执行，或者 Powershell 命令行执行
（1）直接下载 node 包安装 node(需要 Node.js 8.9 或以上版本，推荐安装 12.10.0)。
输入命令：“node -v” 检验 node 是否正确安装
输入命令：“npm -v” 检验 npm 是否正确安装
npm config set registry http://registry.npm.taobao.org/ // npm 设置到淘宝镜像
（2）或者安装 nvm，nvm 是一种 node 管理工具
输入命令：“nvm -v” 检验 nvm 是否正确安装
在你安装的目录下找到 settings.txt 文件，打开后加上
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
输入命令：“nvm install <node-version>” 安装 node
输入命令：“nvm list” 查看已经安装的 node 版本
输入命令：“nvm use <node-version>” 使用 node 哪个版本

# 构建运行

```bash

# 进入项目目录
cd 项目目录

# 安装依赖
npm install

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9527](http://localhost:9527)

# 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

# Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

Copyright (c) 2020-present
