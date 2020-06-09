const TagModel = require("../models/TagModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  let tagModel = new TagModel();
  let userModel = new UserModel();
  let key = await userModel.getKey(ctx.params.id);
  let decode = await jwt.verify(ctx.headers.token, key);
  let msg = {
    service: "createTag",
    success: decode.user == ctx.params.id,
  };
  await tagModel.createTag(ctx.params.id, ctx.query.tag);
  ctx.status = 200;
  if (decode.exp <= new Date().getMilliseconds()) {
    msg.success = false;
    ctx.status = 307;
    ctx.redirect("/");
  }
  ctx.body = msg;
  await next();
};
