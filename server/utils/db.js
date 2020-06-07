var mongoose = require("mongoose");

//连接 mongodb 数据库
var uri = `mongodb://localhost:27017/carddaily`;
var options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(uri, options);

var db = mongoose.connection;
db.on("error", () => console.error("Database fail to connect"));
db.on("open", () => console.log("Database connected"));
db.on("disconnected", () => console.error("Database disconnected"));

module.exports = db;
