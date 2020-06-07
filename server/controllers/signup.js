const UserModel = require("../models/UserModel");
const auth = require("basic-auth");

module.exports = async (ctx, next) => {
  let newUser = new UserModel();
  let msg = {
    service: "signup",
    success: false,
  };
  var user = auth.parse(ctx.headers.authorization);
  msg.success = await newUser.insert({
    username: user.name,
    password: user.pass,
  });
  ctx.status = msg.success ? 201 : 403;
  ctx.body = msg;
  await next();
};
