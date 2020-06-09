const mongoose = require("mongoose");
const db = require("../utils/db");

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: String,
  isvip: { type: Boolean, default: false },
  avatar: { type: String, default: "" },
  diaryname: { type: String, default: "" },
  feeling: { type: String, default: "" },
  token: { type: String, default: "" },
  privateKey: { type: String, default: "" },
});

class UserModel {
  constructor() {
    this.model = db.model("User", UserSchema);
  }
  async createAccount(username, password) {
    let result = null;
    try {
      result = await new this.model({ username, password }).save();
    } catch (err) {
      console.error(err.toString());
    }
    console.log(`create a new account ${result.username}`);
    return result.username;
  }
  async setPassword(username, password) {
    let result = await this.model.findOneAndUpdate(
      { username },
      { password },
      { new: true }
    );
    console.log(`set ${result.username}'passowrd to ${result.password}`);
  }
  async getKey(username) {
    let result = await this.model.findOne({ username });
    console.log(`get ${result.username}'key: ${result.privateKey}`);
    return result.privateKey;
  }
  async setToken(username, token, privateKey) {
    let result = await this.model.findOneAndUpdate(
      { username },
      { token, privateKey },
      { new: true }
    );
    console.log(`set ${result.username}'token to ${result.token}`);
  }
  async isVIP(username) {
    let result = await this.model.findOne({ username });
    console.log(`${result.username} is${result.isvip ? " " : " not "}vip`);
    return result.isvip;
  }
  async setVIP(username) {
    let result = await this.model.findOneAndUpdate(
      { username },
      { isvip: true },
      { new: true }
    );
    console.log(`${result.username} become VIP`);
  }
  async query(username) {
    let result = await this.model.findOne({ username });
    console.log(`query all of ${result.username}:`);
    console.log(result);
    return result;
  }
  async setDiaryName(username, diaryname) {
    let result = await this.model.findOneAndUpdate(
      { username },
      { diaryname },
      { new: true }
    );
    console.log(`set ${result.username}'diaryname to ${result.diaryname}`);
  }
  async setAvatar(username, avatar) {
    let result = await this.model.findOneAndUpdate(
      { username },
      { avatar },
      { new: true }
    );
    console.log(`set ${result.username}'avatar to ${result.avatar}`);
  }
  async setFeeling(username, feeling) {
    let result = await this.model.findOneAndUpdate(
      { username },
      { feeling },
      { new: true }
    );
    console.log(`set ${result.username}'feeling to ${result.feeling}`);
  }
}

// (async () => {
//   var model = new UserModel();
//   await model.createAccount("zxj", "12345");
//   await model.setPassword("zxj", "2832203391");
//   await model.setToken("zxj", "sagdjagdefhsbzvcghxzchfsefs");
//   await model.getToken("zxj");
//   await model.isVIP("zxj");
//   await model.setVIP("zxj");
//   await model.isVIP("zxj");
//   await model.setDiaryName("zxj", "program diary");
//   await model.setAvatar("zxj", "monkey");
//   await model.setFeeling("zxj", "good day");
//   await model.queryAll("zxj");
//   db.close();
// })();

module.exports = UserModel;
