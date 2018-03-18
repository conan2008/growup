import Koa from 'koa';
import log4js from 'log4js';
import config from './config';
import errorHandle from './middlewares/errorHandle';

log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'build/log/zy.log' } },
    categories: { default: { appenders: ['cheese'], level: 'info' } }
});

const logger = log4js.getLogger('cheese');

const app = new Koa();

// app.use(ctx => {
//     ctx.body = "Hello Xiao ciscy!";
// });

errorHandle.error(app, logger);

app.listen(config.port, () => {
    console.log(`server is started on ${config.port}`)
})