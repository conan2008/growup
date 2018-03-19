"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _errorHandle = require("./middlewares/errorHandle");

var _errorHandle2 = _interopRequireDefault(_errorHandle);

var _main = require("./controller/main");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'build/log/zy.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'info'
    }
  }
});

const logger = _log4js2.default.getLogger('cheese');

const app = new _koa2.default();
/**
 * 配置swig模板
 */

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // disable, set to false 
  ext: 'html',
  writeBody: false
}));
/**
 * 配置静态资源
 */

app.use((0, _koaStatic2.default)(_config2.default.staticDir));
/**
 * 加载路由
 */

app.use(_main2.default.init().routes());

_errorHandle2.default.error(app, logger);

app.listen(_config2.default.port, () => {
  console.log(`server is started on ${_config2.default.port}`);
});
module.exports = app;