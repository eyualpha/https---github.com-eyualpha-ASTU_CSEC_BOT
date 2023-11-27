const getSenderName = (ctx) => {
  const sender = ctx.message.from;
  const senderName = sender.first_name;
  ctx.reply(`👋 Hello ${senderName}!`);
};

module.exports = getSenderName;
