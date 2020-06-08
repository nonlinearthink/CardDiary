const DiaryModel = require("./DiaryModel")
const UserModel = require("./UserModel")

class FavorView{
  constructor(){
    this.diary = new DiaryModel();
    this.user = new UserModel();
  }
}