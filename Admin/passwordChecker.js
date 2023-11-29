const startAdminstrator = require("./startAdministrator");

const passwordCheker = (ctx) => {
  const password = "password";
  const input = ctx.message.text;

  if (input === password) {
    // ctx.deleteMessage();
    startAdminstrator(ctx);
    ctx.session = null;
  } else {
    ctx.reply("Password Incorrect\nplease try again:");
  }
};

module.exports = passwordCheker;
