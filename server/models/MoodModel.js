const mongoose = require("mongoose");
const db = require("../utils/db");

var MoodSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  mood: {
    type: String,
    trim: true,
    required: true,
    enum: ["开心", "着迷", "调皮", "无语", "生气", "难过", "伤心", "惊讶"],
  },
});

class MoodModel {
  constructor() {
    this.model = db.model("Mood", MoodSchema);
  }
  async createMood(username, mood) {
    let result = null;
    try {
      if ((await this.model.findOne({ username, mood })) == null) {
        result = await new this.model({ username, mood }).save();
        console.log(`create a new mood ${result.mood} for ${result.username}`);
      }
    } catch (err) {
      console.error(err.toString());
    }
  }
  async query(username) {
    let resultSet = await this.model.find({ username });
    return resultSet;
  }
}

module.exports = MoodModel;
