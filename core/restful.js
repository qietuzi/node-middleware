module.exports = pathPrefix => {
  pathPrefix = pathPrefix || '/api/'
  return async (ctx, next) => {
    if (ctx.request.path.startsWith(pathPrefix)) {
      ctx.rest = data => {
        ctx.response.type = 'application/json'
        ctx.response.body = data
      }
      ctx.restError = (code, data) => {
        ctx.response.type = 'application/json'
        ctx.response.status = code
        ctx.response.body = data
      }
      await next()
    } else {
      await next()
    }
  }
}
