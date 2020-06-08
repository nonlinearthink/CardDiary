const UserModel = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");
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
  msg.success =
    (await userModel.select({
      username: user.name,
      password: user.pass,
    })) != null;
  if (msg.success) {
    let content = {
      user: user.name,
      msg: "Logging in",
    };
    let privatekey = srandom(16);
    msg.token = jwt.sign(content, privatekey, { expiresIn: 60 * 60 * 24 });
    let tokenModel = new TokenModel();
    let isExist = (await tokenModel.select({ username: user.name })) != null;
    msg.success = isExist
      ? await tokenModel.update({ username: user.name }, { token: msg.token })
      : await tokenModel.insert({ username: user.name, token: msg.token });
  }
  ctx.status = msg.success ? 200 : 403;
  ctx.body = msg;
  await next();
};
