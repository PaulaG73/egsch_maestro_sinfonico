const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Eduardo Gajardo Schmidlin · Maestro Sinfónico',
    },
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  },
})
