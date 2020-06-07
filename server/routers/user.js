const Router = require("koa-router");
const signup = require("../controllers/signup");
const login = require("../controllers/login");

const router = new Router();

router.prefix("/users");

router.post("/", signup);

router.get("/", login);

module.exports = router;
