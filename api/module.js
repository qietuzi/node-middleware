module.exports = {
  /* 
        @name   getData
        @params 
            url url
        @desc   获取数据服务器数据
    */
  async getData(ctx) {
    let res = await ctx.axios.get((url = 'http://api.server.com'))
    return res
  }
}
