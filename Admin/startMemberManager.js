const startMemberManager = (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "🤖 Member Manager", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "➕ Add Members", callback_data: "addMember" }],
        [{ text: "❌ Delete Member", callback_data: "deleteMember" }],
        [{ text: "⬅️ Back", callback_data: "administratorApproved" }],
      ],
    },
  });
};

module.exports = startMemberManager;
