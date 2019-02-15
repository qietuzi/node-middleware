const config = require('../../config')
const Module = require('../../api/module')
module.exports = {
  async handler(ctx, next) {
    let data = {}
    try {
      profileInfo = await Module.getData(ctx)
      ctx.rest({
        status: true,
        data: data.data
      })
    } catch (err) {
      if (err.response) {
        ctx.restError(err.response.status, err.response.data)
      } else {
        config.showError
          ? ctx.restError(500, `node error: ${err.message}`)
          : ctx.rest({
              status: false,
              message: data.msg
            })
      }
    }
  }
}
