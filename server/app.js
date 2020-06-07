const Koa = require("koa");
const app = new Koa();

//注册logger中间件
const logger = require("./middlewares/logger");
app.use(logger);

//注册跨域中间件
const cors = require("./middlewares/cors");
app.use(cors);

//注册router中间件
const router = require("./routers/index");
app.use(router.routes()).use(router.allowedMethods());

//监听端口
app.listen(8000, () => {
  console.log("server listening at http://localhost:8000");
});
