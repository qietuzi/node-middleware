const fs = require('fs')

const addMapping = function(router, mapping) {
  if (!Array.isArray(mapping)) return
  mapping.forEach(item => {
    if (item.config) {
      router[item.method](item.url, item.config, item.controller)
    } else {
      router[item.method](item.url, item.controller)
    }
  })
}

const addRouters = function(router, dir) {
  fs.readdirSync('./' + dir)
    .filter(item => {
      return item.endsWith('.js')
    })
    .forEach(item => {
      let mapping = require('../' + dir + '/' + item)
      addMapping(router, mapping)
    })
}

module.exports = function(router, dir) {
  let controllers_dir = dir || 'router'
  addRouters(router, controllers_dir)
  return router.routes()
}
