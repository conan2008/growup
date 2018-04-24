import {
    route,
    GET,
    POST,
    before
} from 'awilix-koa';

import {
    createBundleRenderer
} from 'vue-server-renderer';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

//创建数据流
function createRenderer(bundle, template, clientManifest) {
    return createBundleRenderer(bundle, {
        runInNewContext: false, // 推荐
        template,
        clientManifest
    })
}

/**
 * 需要
 */
@route('/')
@route('/index')
@route('/home')
@route('/item')
class IndexController {

    constructor({
        userService
    }) {
        this.userService = userService;
    }
    

    @GET()
    async getIndex(ctx, next) {
        /* vuessr */
        const rootPath = path.join(__dirname, '..');
        /**
         * 通过webpack插件
         */
        const serverBundle = require(rootPath + '/assets/vue-ssr-server-bundle.json');
        const clientManifest = require(rootPath + '/assets/vue-ssr-client-manifest.json');
        //通过nodejs的fs模块读取本地的index.html这个模版,后面的vue页面或者ssr都要插入到里面
        const template = fs.readFileSync(rootPath + '/assets/index.html', 'utf-8');
        /**
         * cheerio
         * nodejs的一个类jQuery库
         * 因为这块是ssr，所以肯定要拿到html文本，用cheerio操作更便捷
         */
        const $ = cheerio.load(template);
        $('title').html('🉐️Boss');
        $("head").append(' <meta name="keywords" content=SSR>');

        /**
         * 通过vue-server-renderer把 webpack生成的整合
         * 可以看一下生成的两个json文件，
         * serverBundle -- 服务器端的，里面有所有需要直出的前台代码
         * clientManifest -- 前端的页面，里面声明了webpack打包好的js文件和自己本身的entry-client.js
         */
        const renderer = createRenderer(serverBundle, $.html(), clientManifest);

        /**
         * 传给entry-serer.js处理浏览器url的
         */
        const context = {
            url: ctx.url
        }

        function createSsrStreamPromise() {

            return new Promise((resolve, reject) => {
                if (!renderer) {
                    return ctx.body = 'waiting for compilation.. refresh in a moment.'
                }

                /**
                 * 最核心的地方，吐数据啦
                 * 调用这里之后，会经过entry-server.js
                 */
                const ssrStream = renderer.renderToStream(context);

                //现在是demo，随便写写，佳哥审核之后 再改
                ctx.status = 200;
                ctx.type = 'html';
                /**
                 * 这里做了容错
                 * 其实所以ssr路由都配在这里最主要的原因，就是容错
                 */
                ssrStream.on('error', err => {
                    reject(err)
                }).pipe(ctx.res);
            });
        }

        await createSsrStreamPromise();
    }
}

export default IndexController;