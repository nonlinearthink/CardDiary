const moment = require("moment");
module.exports = async function (ctx, next) {
  if (ctx.method != "OPTIONS")
    console.log(
      `${moment().format("MM/DD/YYYY HH:mm:ss")} ${ctx.method} ${
        ctx.url
      } from ${ctx.origin}`
    );
  await next();
};
