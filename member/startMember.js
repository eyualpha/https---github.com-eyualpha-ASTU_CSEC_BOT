const startMember = (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "🤖 What You Want To Do?", {
    reply_markup: {
      inline_keyboard: [
        //[{ text: "⬆️ Update Profile", callback_data: "updateProfile" }],
        [{ text: "📊 View Events", callback_data: "viewEvent" }],
        [{ text: "⬅️ Back", callback_data: "backToStart" }],
      ],
    },
  });
};

module.exports = startMember;
