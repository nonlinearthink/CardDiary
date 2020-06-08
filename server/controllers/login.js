const UserModel = require("../models/UserModel");
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const srandom = require("string-random");

module.exports = async (ctx, next) => {
  var user = auth.parse(ctx.headers.authorization);
  let msg = {
    service: "login",
    success: false,
  };
  let userModel = new UserModel();
  msg.success = (await userModel.queryAll(user.name)) != null;
  if (msg.success) {
    let content = {
      user: user.name,
      msg: "Logging in",
    };
    let privatekey = srandom(16);
    msg.token = jwt.sign(content, privatekey, { expiresIn: 60 * 60 * 24 });
    userModel.setToken(user.name, msg.token, privatekey);
  }
  ctx.status = msg.success ? 200 : 403;
  ctx.body = msg;
  await next();
};
