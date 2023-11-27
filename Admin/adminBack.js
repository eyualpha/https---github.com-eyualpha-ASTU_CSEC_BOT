const adminBack = (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "🤖 What You Want To Do?", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "⚙️ Manage Members", callback_data: "manageMember" }],
        [{ text: "🎇 Manage Events", callback_data: "manageEvent" }],
        [{ text: "📈 View Members Report", callback_data: "ViewReport" }],
        [{ text: "🔳 Log Out", callback_data: "backToStart" }],
      ],
    },
  });
};

module.exports = adminBack;
