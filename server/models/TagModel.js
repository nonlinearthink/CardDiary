const mongoose = require("mongoose");
const db = require("../utils/db");

var TagSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  tag: {
    type: String,
    trim: true,
    required: true,
  },
});

class TagModel {
  constructor() {
    this.model = db.model("Tag", TagSchema);
  }
  async createTag(username, tag) {
    let result = null;
    try {
      if ((await this.model.findOne({ username, tag })) == null) {
        result = await new this.model({ username, tag }).save();
        console.log(`create a new tag ${result.tag} for ${result.username}`);
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

module.exports = TagModel;
