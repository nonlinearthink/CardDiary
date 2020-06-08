const Router = require("koa-router");
const signup = require("../controllers/signup");
const login = require("../controllers/login");
const basicSetting = require("../controllers/basicSetting");
const createTag = require("../controllers/createTag");
const createDiary = require("../controllers/createDiary");

const router = new Router();

router.prefix("/users");

//注册
router.post("/", signup);

//登录
router.get("/", login);

//提交基本设置
router.post("/:id/basic", basicSetting);

//创建标签
router.post("/:id/tags", createTag);

//创建日记
router.post("/:id/diaries", createDiary);

module.exports = router;
