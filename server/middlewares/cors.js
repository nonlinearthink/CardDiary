module.exports = async (ctx, next) => {
  // 可用HTTP连接的源地址
  ctx.set("Access-Control-Allow-Origin", "*");
  // 可用的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  // 可用的HTTP头部
  ctx.set(
    "Access-Control-Allow-Headers",
    "Acept, Origin, Content-Type, Authorization"
  );
  // 可用的媒体类型
  ctx.set("Content-Type", "application/json;charset=utf-8");
  if (ctx.method == "OPTIONS") {
    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  }
  await next();
};
