const startEventManager = (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "🤖 Event Manager", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "➕ Add Event", callback_data: "addEvent" }],
        [{ text: "❌ Delete Event", callback_data: "deleteEvent" }],
        [{ text: "⬅️ Back", callback_data: "administratorApproved" }],
      ],
    },
  });

  ctx.session = null;
};

module.exports = startEventManager;
