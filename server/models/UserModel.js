var mongoose = require("mongoose");
var db = require("../utils/db");

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  userType: {
    type: String,
    enum: ["user", "vip"],
    default: "user",
  },
});

class UserModel {
  constructor() {
    this.model = db.model("User", UserSchema);
  }
  async insert(toBeCreate) {
    let success = false;
    try {
      await new this.model(toBeCreate).save();
      success = true;
    } catch (err) {
      console.error(err);
    }
    return success;
  }
  del(selector) {
    return this.model.deleteOne(selector);
  }
  updatePassword(selector, toBeUpdate) {
    return this.model.findOneAndUpdate(selector, toBeUpdate, { new: true });
  }
  async select(selector) {
    let success = false;
    try {
      var user = await this.model.findOne(selector);
      if (user != null) success = true;
    } catch (err) {
      console.error(err);
    }
    return success;
  }
}

module.exports = UserModel;
