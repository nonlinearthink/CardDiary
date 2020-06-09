const mongoose = require("mongoose");
const db = require("../utils/db");

var WeatherSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  weather: {
    type: String,
    trim: true,
    required: true,
    enum:['晴天','多云','小雨','小雪','雷雨','台风','暴雨','无']
  },
});

class WeatherModel {
  constructor() {
    this.model = db.model("Weather", WeatherSchema);
  }
  async createMood(username, weather) {
    let result = null;
    try {
      if ((await this.model.findOne({ username, weather })) == null) {
        result = await new this.model({ username, weather }).save();
        console.log(
          `create a new weather ${result.weather} for ${result.username}`
        );
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

module.exports = WeatherModel;
