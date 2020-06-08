const mongoose = require("mongoose");
const db = require("../utils/db");

var DiarySchema = mongoose.Schema({
  title: { type: String, default: "", trim: true },
  author: { type: String, default: "", required: true },
  mood: { type: String, default: "" },
  weather: { type: String, default: "" },
  tag: { type: String, default: "" },
  body: { type: String, default: "" },
  date: {
    year: { type: Number, default: "", required: true },
    month: { type: Number, default: "", required: true },
    day: { type: Number, default: "", required: true },
  },
  favor: { type: Boolean, default: false },
});

DiarySchema.virtual("dateString")
  .get(function () {
    return `${this.date.year}-${this.date.month + 1}-${this.date.day}`;
  })
  .set(function (v) {
    this.date.year = v.getFullYear();
    this.date.month = v.getMonth();
    this.date.day = v.getDate();
  });

class DiaryModel {
  constructor() {
    this.model = db.model("Diary", DiarySchema);
  }
  async createDiary(author, dateString) {
    let createDate = new Date(dateString);
    let result = await new this.model({
      author,
      date: {
        year: createDate.getFullYear(),
        month: createDate.getMonth(),
        day: createDate.getDate(),
      },
    }).save();
    console.log("create a new diary:");
    console.log(result);
    return result;
  }
  async setTitle(title, { author, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        author,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
      },
      { title },
      { new: true }
    );
    console.log(
      `set title:${result.title} to the diary which create by ${result.author} on ${result.dateString}`
    );
  }
  async setMood(mood, { author, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        author,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
      },
      { mood },
      { new: true }
    );
    console.log(
      `set mood:${result.mood} to the diary which create by ${result.author} on ${result.dateString}`
    );
  }
  async setWeather(weather, { author, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        author,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
      },
      { weather },
      { new: true }
    );
    console.log(
      `set weather:${result.weather} to the diary which create by ${result.author} on ${result.dateString}`
    );
  }
  async setTag(tag, { author, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        author,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
      },
      { tag },
      { new: true }
    );
    console.log(
      `set tag:${result.tag} to the diary which create by ${result.author} on ${result.dateString}`
    );
  }
  async setBody(body, { author, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        author,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
      },
      { body },
      { new: true }
    );
    console.log(
      `set body:${result.body} to the diary which create by ${result.author} on ${result.dateString}`
    );
  }
  async setFavor(author, dateString) {
    let date = new Date(dateString);
    let result = await this.model.findOneAndUpdate(
      {
        author,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
      },
      { favor: true },
      { new: true }
    );
    console.log(
      `mark favor to the diary which create by ${result.author} on ${result.dateString}`
    );
  }
  async queryAll({ author, dateString }) {
    let date = new Date(dateString);
    let result = await this.model.findOne({
      author,
      date: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      },
    });
    console.log(
      `query all of the diary which create by ${result.author} on ${result.dateString}:`
    );
    console.log(result);
    return result;
  }
}

// (async () => {
//   let model = new DiaryModel();
//   await model.createDiary("zxj", "2020-6-8");
//   await model.setTitle("python", { author: "zxj", dateString: "2020-6-8" });
//   await model.setTag("py", { author: "zxj", dateString: "2020-6-8" });
//   await model.setMood("happy", { author: "zxj", dateString: "2020-6-8" });
//   await model.setWeather("sunny", { author: "zxj", dateString: "2020-6-8" });
//   await model.setBody("python is so good", {
//     author: "zxj",
//     dateString: "2020-6-8",
//   });
//   await model.setFavor("zxj", "2020-6-8");
//   await model.queryAll({ author: "zxj", dateString: "2020-6-8" });
//   db.close();
// })();

module.exports = DiaryModel;
