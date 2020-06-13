const UserModel = require("../models/UserModel");
const DiaryModel = require("../models/DiaryModel");
const ColorModel = require("../models/ColorModel");
const MoodModel = require("../models/MoodModel");
const TagModel = require("../models/TagModel");
const WeatherModel = require("../models/WeatherModel");
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
  let diaryModel = new DiaryModel();
  let colorModel = new ColorModel();
  let moodModel = new MoodModel();
  let tagModel = new TagModel();
  let weatherModel = new WeatherModel();
  msg.success = (await userModel.query(user.name)) != null;
  if (msg.success) {
    let content = {
      user: user.name,
      msg: "Logging in",
    };
    let privatekey = srandom(16);
    msg.token = jwt.sign(content, privatekey, { expiresIn: 60 * 60 * 24 });
    userModel.setToken(user.name, msg.token, privatekey);
    let { avatar, diaryname, feeling } = await userModel.query(user.name);
    msg.basic = { avatar, diaryname, feeling };
    let moods = [];
    (await moodModel.query(user.name)).forEach(async (doc) => {
      let count = (await diaryModel.queryMood(user.name, doc.mood)).length;
      moods.push({ value: doc.mood, count });
    });
    let weathers = [];
    (await weatherModel.query(user.name)).forEach(async (doc) => {
      let count = (await diaryModel.queryWeather(user.name, doc.weather))
        .length;
      weathers.push({ value: doc.weather, count });
    });
    let tags = [];
    (await tagModel.query(user.name)).forEach(async (doc) => { 
      let count = (await diaryModel.queryTag(user.name, doc.tag)).length;
      tags.push({ value: doc.tag, count });
    });
    msg.diaries = {
      all: await diaryModel.queryAll(user.name),
      favor: await diaryModel.queryFavor(user.name),
    };
    msg.moods = moods;
    msg.weathers = weathers;
    msg.tags = tags;
  }
  ctx.status = msg.success ? 200 : 403;
  ctx.body = msg;
  await next();
};
