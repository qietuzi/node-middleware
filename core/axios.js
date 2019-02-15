const config = require('../config')
const axios = require('axios')
/* 
    options: {
        url:
        method:
        headers:
        params:
        body:
    }
*/

const _request = function(options) {
  options.url = /^http:\/\/|^https:\/\//.test(options.url)
    ? options.url
    : config.server + options.url
  return new Promise((resolve, reject) => {
    axios({
      url: options.url,
      data: options.body,
      params: options.params,
      headers: options.headers,
      method: options.method || 'get'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = function() {
  return async (ctx, next) => {
    let headers = {
      Authorization: ctx.headers.authorization || '',
      'content-type': 'application/json; charset=UTF-8'
    }
    ctx.axios = {
      async get(url, params) {
        return _request({
          url,
          params,
          headers: headers
        })
      },
      async post(url, params) {
        return _request({
          url,
          body: params,
          method: 'post',
          headers: headers
        })
      },
      async delete(url, params) {
        return _request({
          url,
          body: params,
          method: 'delete',
          headers: headers
        })
      },
      async put(url, params) {
        return _request({
          url,
          body: params,
          method: 'put',
          headers: headers
        })
      }
    }
    await next()
  }
}
