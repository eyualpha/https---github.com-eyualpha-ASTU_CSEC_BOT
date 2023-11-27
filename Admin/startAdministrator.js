const startAdminstrator = (ctx) => {
  
  
  ctx.telegram.sendMessage(ctx.chat.id, "🤖 What You Want To Do?", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "⚙️ Manage Members", callback_data: "managememeber" }],
        [{ text: "🎇 Manage Events", callback_data: "manageEvent" }],
        [{ text: "📈 View Report", callback_data: "ViewReport" }],
        [{ text: "🔳 Log Out", callback_data: "backToStart" }],
      ],
    },
  });
};

module.exports = startAdminstrator;
