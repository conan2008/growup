/**
 * 这里是官网的代码，基本没动
 */
import { createApp } from './app.js'
/**
 * 我的理解 不知道是不是正确
 * indexController 里createRenderer(serverBundle, $.html(), clientManifest);调用到了这里
 */
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    //接收indexController力传过来的url，push到router里改变浏览器url
    router.push(context.url)

    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      /**
       * 对所有匹配的路由组件调用 `asyncData()`
       * 这里是针对ssr的时候 页面有异步请求的，asyncData 参考item.vue
       */
      Promise.all(matchedComponents.map(Component => {

        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}