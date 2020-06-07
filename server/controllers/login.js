const UserModel = require("../models/UserModel");
const auth = require("basic-auth");

module.exports = async (ctx, next) => {
  var user = auth.parse(ctx.headers.authorization);
  let msg = {
    service: "login",
    success: false,
  };
  let model = new UserModel();
  msg.success = await model.select({
    username: user.name,
    password: user.pass,
  });
  ctx.status = msg.success ? 200 : 403;
  ctx.body = msg;
  await next();
};
