const mongoose = require("mongoose");
const db = require("../utils/db");

var ColorSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  date: {
    year: { type: Number, default: "", required: true },
    month: { type: Number, default: "", required: true },
  },
  color: {
    type: String,
    enum: [
      "DeepSkyBlue",
      "DodgerBlue",
      "RoyalBlue",
      "MediumSlateBlue",
      "Orchid",
      "Tomato",
      "GoldenRod",
      "Gold",
      "YellowGreen",
      "LightGreen",
      "MediumAquaMarine",
      "DarkTurquoise",
      "LightSteelBlue",
      "LightSlateGray",
      "Gray",
      "black",
      "#00ccff",
    ],
    default: "#00ccff",
  },
});

class ColorModel {
  constructor() {
    this.model = db.model("Color", ColorSchema);
  }
  async initByYearInterval(username, startYear, endYear) {
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        await new this.model({ username, date: { year, month } }).save();
      }
    }
    console.log("init card color");
  }
  async setColor(color, { username, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        username,
        date: { year: date.getFullYear(), month: date.getMonth() + 1 },
      },
      { color },
      { new: true }
    );
    console.log(
      `set color of ${result.username}:${result.date.year}-${result.date.month} to ${result.color}`
    );
  }
}

module.exports = ColorModel;
