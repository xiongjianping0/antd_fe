/**
 * vue.config.js是一个可选的配置文件，如果项目的（和package.json同级）根目录
 * 中存在这个文件，那么它就会被@vue/cli-service自动加载
 */
// 严格模式下
'use strict'

// 引入path模块,提供了一些用于处理文件与目录的路径的使用工具(nodeJs)
const path = require('path')
// 引入通用设置
const defaultSettings = require('./src/settings.js')
// 连接目录
function resolve(dir) {
  return path.join(__dirname, dir)
  // __dirname：当前模块的目录名，绝对路径
  // path.join()：使用平台特定的分隔符作为定界符将所有给定的path片段连接在一起，生成规范化的路径
}
// 系统标题
const name = defaultSettings.title || ' '

/**
 * 这个文件应该导出一个包含了选项的对象：
 */
module.exports = {
  publicPath: '/', // 部署应用包时的基本URL
  outputDir: 'dist', // 当运行vue-cli-service build时生成的生产环境构建文件的目录。
  assetsDir: 'static', // 放置生成静态资源的目录
  lintOnSave: process.env.NODE_ENV === 'development', // 是否在开发环境下通过eslint-loader在每次保存时lint代码
  productionSourceMap: false, // 不需要生产环境的source map,可将其设置为false加速生产环境构建
  devServer: {
    port: 9527,
    // open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        ws: false, // proxy websockets
        // target: `http://172.16.1.6:8888/`,
        target: `http://x976e9e.nat.ipyingshe.com`,
        // target: `https://testa.aiyzy.com/audit-api`,
        // target: `http://xxx.xxx.com/xxx-api`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  // 警告 webpack 的性能提示
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        jquery: resolve('public/static/jquery-3.4.1.min.js')
        // querystring: 'querystring-browser'
      }
    },
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
      }
    }
  },
  // 修改loader选项
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // config.entry.app = ['babel-polyfill', './src/main.js']
    // config.resolve.alias.set('querystring', 'querystring-browser')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
