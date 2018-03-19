"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IndexModel = require("../model/IndexModel");

var _IndexModel2 = _interopRequireDefault(_IndexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const index = {
  homeAction() {
    return (ctx, next) => {
      ctx.body = {
        data: 'Hello home'
      };
    };
  },

  modelAction() {
    return async (ctx, next) => {
      const indexModel = new _IndexModel2.default();
      let result = await indexModel.getData();
      ctx.body = await ctx.render('index', {
        data: result
      });
    };
  }

};
exports.default = index;