/* 
    路由通常按照模块划分,但做为中间层调用时以前端路由划分更为合适
*/
const Module = require('../controller/module')
module.exports = [
  //
  {
    method: 'get',
    controller: Module.handler,
    url: '/api/v1/module/handler'
  }
]
