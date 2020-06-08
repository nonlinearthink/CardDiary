const UserModel = require("../models/UserModel");
const DiaryModel = require("../models/DiaryModel");
const TagModel = require("../models/TagModel");
const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  console.log(ctx.request);
  let userModel = new UserModel();
  let diaryModel = new DiaryModel();
  let tagModel = new TagModel();
  let key = await userModel.getKey(ctx.params.id);
  let decode = await jwt.verify(ctx.headers.token, key);
  let msg = {
    service: "modifyBasicSetting",
    success: decode.user == ctx.params.id,
  };
  let selector = {
    author: ctx.params.id,
    dateString: ctx.query.date,
  };
  await diaryModel.createDiary(ctx.params.id, ctx.query.date);
  await diaryModel.setTitle(ctx.query.title, selector);
  await diaryModel.setWeather(ctx.query.weather, selector);
  await diaryModel.setMood(ctx.query.mood, selector);
  await diaryModel.setTag(ctx.query.tags, selector);
  let tags = ctx.query.tags.split(",");
  await tags.forEach(async (tag) => {
    await tagModel.createTag(ctx.params.id, tag);
  });
  await diaryModel.setBody(ctx.query.body, selector);
  if (ctx.params.favor) await diaryModel.setFavor(selector);
  ctx.status = 200;
  if (decode.exp <= new Date().getMilliseconds()) {
    msg.success = false;
    ctx.status = 307;
    ctx.redirect("/");
  }
  ctx.body = msg;
  await next();
};
