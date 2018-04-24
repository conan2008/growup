import { createApp } from './app.js'
const { app, router, store } = createApp()

/**
 * ssr的时候，把App.vue挂载上，要不怎么渲染页面啊
 */
router.onReady(() => {
  app.$mount('#app')
})