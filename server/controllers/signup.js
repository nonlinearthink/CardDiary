const UserModel = require("../models/UserModel");
const ColorModel = require("../models/ColorModel");
const auth = require("basic-auth");

module.exports = async (ctx, next) => {
  let newUser = new UserModel();
  let msg = {
    service: "signup",
    success: false,
  };
  var user = auth.parse(ctx.headers.authorization);
  msg.success =
    (await newUser.createAccount(user.name, user.pass)) == user.name;
  if (msg.success) {
    await new ColorModel().initByYearInterval(user.name, 2015, 2025);
  }
  ctx.status = msg.success ? 201 : 403;
  ctx.body = msg;
  await next();
};
