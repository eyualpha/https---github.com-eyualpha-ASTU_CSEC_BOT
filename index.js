const { Telegraf, session } = require("telegraf");
const mongoose = require("mongoose");
const Member = require("./Schmas/memberSchma");
const Event = require("./Schmas/eventSchma");
const startBot = require("./User/start");
const getSenderName = require("./User/getSenderName");
const startAdminstrator = require("./Admin/startAdministrator");
const startMemberManager = require("./Admin/startMemberManager");
const startEventManager = require("./Admin/startEventManager");
const adminBack = require("./Admin/adminBack");
const addUser = require("./Admin/addUser");
const startMember = require("./member/startMember");
const addMember = require("./member/addMember");
const deleteMember = require("./member/deleteMember");
const addEvent = require("./member/addEvent");
const deletEvent = require("./member/deleteEvent");

require("dotenv").config();

const bot = new Telegraf(process.env.token);
mongoose.connect(process.env.mongo_url);

bot.use(session());

////////////////////////////////////////////start of the bot

bot.start((ctx) => {
  getSenderName(ctx);
  startBot(ctx);
});

bot.help(async (ctx) => {
  await ctx.reply(`
    Help
    
    click /start to start the bot
    click /administrator to log as administrator
    click /member to log as member

    thanks for using our bot!
    for more info: https://t.me/CSEC_ASTU

    `);
});

bot.action("backToStart", (ctx) => {
  ctx.deleteMessage();
  startBot(ctx);
});

//////////////////////////////////////////start of adminstrator role
//calling to member manager function
bot.action("managememeber", (ctx) => {
  console.log("working");
  ctx.deleteMessage();
  startMemberManager(ctx);
});

bot.action("administrator", (ctx) => {
  ctx.deleteMessage();
  startAdminstrator(ctx);
});

bot.action("administratorApproved", (ctx) => {
  ctx.deleteMessage();
  adminBack(ctx);
});

//calling to add member function
bot.action("addMember", (ctx) => {
  ctx.reply(
    "🤖 Please Enter New Member Details In Format of name,email,phone:"
  );
  //   ctx.session.status = "addmember";
  ctx.session ??= { status: "addmember" };
  console.log(ctx.session);
});

bot.on("text", (ctx) => {
  console.log("heree .....");
  const session = ctx.session;
  if (session && session.status === "addmember") {
    addMember(ctx);
    startAdminstrator(ctx);
  } else if (session && session.status === "deletememeber") {
    deleteMember(ctx);
  } else if (session && session.status === "addevent") {
    addEvent(ctx);
  } else if (session && session.status === "deleteevent") {
    deletEvent(ctx);
  }
});

// a function that delete memebr using phone number
bot.action("deleteMember", async (ctx) => {
  try {
    const members = await Member.find();
    members.forEach((member) => {
      ctx.reply(
        `name: ${member.name}\nemail: ${member.email}\nphone: ${member.phone}`
      );
    });
  } catch (error) {
    console.log({ message: error.message });
  }

  ctx.reply(
    "🤖 Please Enter The Phone of The Person You Want To Delete From The Above: "
  );

  ctx.session ??= { status: "deletememeber" };
});

//calling for event manager function
bot.action("manageEvent", (ctx) => {
  ctx.deleteMessage();
  startEventManager(ctx);
});

bot.action("addEvent", async (ctx) => {
  ctx.reply("🤖 Please Enter events in format of topic,detail:");
  ctx.session ??= { status: "addevent" };
});

bot.action("deleteEvent", async (ctx) => {
  ctx.reply("the bot is deleting events");
  try {
    const events = await Event.find();
    events.forEach((event) => {
      ctx.reply(`Topic: ${event.topic}\nDetail: ${event.detail}`);
    });
  } catch (error) {
    console.log({ message: error.message });
  }

  ctx.reply(
    "🤖 Please Enter The Topic of The Event You Want To Delete From The Above: "
  );

  ctx.session ??= { status: "deleteevent" };
});

bot.action("ViewReport", async (ctx) => {
  ctx.reply("Official Members in CSEC_ASTU Are Listed Below:");
  try {
    const members = await Member.find();
    members.forEach((member) => {
      ctx.reply(
        `name: ${member.name}\nemail: ${member.email}\nphone: ${member.phone}`
      );
    });
  } catch (error) {
    console.log({ message: error.message });
  }
});
////////////////////////////////////////////end of adminstrator role
////////////////////////////////////////////start of members role

bot.action("member", (ctx) => {
  ctx.deleteMessage();
  startMember(ctx);
});

bot.action("updateProfile", (ctx) => {
  ctx.reply("the bot is updating your profile");
});

bot.action("viewEvent", async (ctx) => {
  ctx.reply("🤖 Available Events At CSEC_ASTU Are Listed Below:");
  try {
    const events = await Event.find();
    events.forEach((event) => {
      ctx.reply(`Topic:  ${event.topic}\nDetail:  ${event.detail}\n`);
    });
  } catch (error) {
    console.log({ message: error.message });
  }
  startMember(ctx);
});
///////////////////////////////////////////////////end of members role

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
