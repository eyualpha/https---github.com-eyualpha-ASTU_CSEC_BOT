const startBot = (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `✨✨Welcome To CSEC_ASTU_Bot✨✨\n\n 👨‍💻 Please Login As:`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Member", callback_data: "member" }],
          [{ text: "Administrator", callback_data: "administrator" }],
        ],
      },
    }
  );
};

module.exports = startBot;
