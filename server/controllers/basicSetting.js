const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  let userModel = new UserModel();
  let key = await userModel.getKey(ctx.params.id);
  let decode = await jwt.verify(ctx.query.token, key);
  let msg = {
    service: "modifyBasicSetting",
    success: decode.user == ctx.params.id,
  };
  await userModel.setDiaryName(ctx.params.id, ctx.query.name);
  await userModel.setFeeling(ctx.params.id, ctx.query.feeling);
  await userModel.setAvatar(ctx.params.id, ctx.query.avatar);
  ctx.status = 200;
  if (decode.exp <= new Date().getMilliseconds()) {
    msg.success = false;
    ctx.status = 307;
    ctx.redirect("/");
  }
  ctx.body = msg;
  await next();
};
