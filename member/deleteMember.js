const Member = require("../Schmas/memberSchma");

const deleteMember = async (ctx) => {
  const idPhone = ctx.message.text;
  try {
    const result = await Member.findOneAndDelete({ phone: idPhone });

    if (result) {
      console.log({ message: "Member deleted successfully" });
      ctx.reply("Member deleted successfully");
    } else {
      console.log({ message: "Member not found" });
      ctx.reply("Member not found");
    }
  } catch (error) {
    console.error({ message: "Error deleting member:" });
    ctx.reply("An error occurred while deleting the member.");
  }
};

module.exports = deleteMember;
