import Koa from 'koa';
import log4js from 'log4js';
import serve from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import config from './config';
import errorHandle from './middlewares/errorHandle';

const { asClass, asValue, createContainer, Lifetime} = require('awilix');
const { loadControllers, scopePerRequest } = require('awilix-koa');

log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'build/log/zy.log' } },
    categories: { default: { appenders: ['cheese'], level: 'info' } }
});

const logger = log4js.getLogger('cheese');

const app = new Koa();

const container = createContainer();
app.use(scopePerRequest(container));

app.use(loadControllers('controller/*.js', { cwd: __dirname }));

container.loadModules(['service/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED
    }
  })

  console.dir(container);

/**
 * 配置swig模板
 */
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    writeBody: false
}));

/**
 * 配置静态资源
 */
app.use(serve(config.staticDir));

/**
 * 加载路由
 */
// app.use(mainController.init().routes());



errorHandle.error(app, logger);

app.listen(config.port, () => {
    console.log(`server is started on ${config.port}`)
})

module.exports = app;