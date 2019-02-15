const Koa = require('koa')
const cors = require('koa-cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const config = require('./config')
const axios = require('./core/axios')
const restful = require('./core/restful')
const createRouter = require('./core/router')

const app = new Koa()
const router = new Router()

// koa-cors
app.use(cors())

// 使用axios
app.use(axios())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 加载restful API
app.use(restful())

// 加载路由中间件
var dir = 'router'
app.use(createRouter(router, dir))

// 监听启动端口
// app.listen(config.server.port, config.server.host)[好像有个什么bug]
app.listen(config.port)
console.log(`app started at port ${config.port}...`)