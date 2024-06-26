const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false, // 禁止：当出现编译错误或警告时，在浏览器中显示全屏覆盖
    },
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: process.env.VUE_APP_API_ENDPOINT,
        changeOrigin: true, // 是否跨域
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
      // 设置 svg-sprite-loader
      config.module.rule('svg').exclude.add(resolve('src/icons')).end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]',
        })
        .end()
      return definitions
    })
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
  },
})
